import "server-only";

import { getRedisClient } from "./redis";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

interface MemoryRateLimitEntry {
  timestamps: number[];
}

// In-memory fallback for local development or when Redis is unreachable
const memoryStore = new Map<string, MemoryRateLimitEntry>();
const MAX_MEMORY_KEYS = 1_000;

function cleanupMemoryStore(now: number, windowMs: number) {
  if (memoryStore.size < MAX_MEMORY_KEYS) return;
  for (const [key, entry] of memoryStore.entries()) {
    entry.timestamps = entry.timestamps.filter((ts) => now - ts < windowMs);
    if (entry.timestamps.length === 0) {
      memoryStore.delete(key);
    }
  }
}

function checkMemoryRateLimit(
  identifier: string,
  limit: number,
  windowSeconds: number
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  cleanupMemoryStore(now, windowMs);

  const entry = memoryStore.get(identifier) || { timestamps: [] };
  entry.timestamps = entry.timestamps.filter((ts) => now - ts < windowMs);

  if (entry.timestamps.length >= limit) {
    const oldestTimestamp = entry.timestamps[0] || now;
    const resetSeconds = Math.max(1, Math.ceil((oldestTimestamp + windowMs - now) / 1000));
    return {
      success: false,
      limit,
      remaining: 0,
      resetSeconds,
    };
  }

  entry.timestamps.push(now);
  memoryStore.set(identifier, entry);

  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - entry.timestamps.length),
    resetSeconds: windowSeconds,
  };
}

/**
 * Sliding-window rate limiter.
 * Uses Upstash Redis when configured, falling back gracefully to memory store.
 */
export async function checkRateLimit(
  prefix: string,
  identifier: string,
  {
    limit = 5,
    windowSeconds = 600,
  }: {
    limit?: number;
    windowSeconds?: number;
  } = {}
): Promise<RateLimitResult> {
  const redis = getRedisClient();

  if (!redis) {
    return checkMemoryRateLimit(`${prefix}:${identifier}`, limit, windowSeconds);
  }

  const key = `portfolio:ratelimit:${prefix}:${identifier}`;
  const now = Date.now();
  const windowStart = now - windowSeconds * 1000;

  try {
    const member = `${now}-${Math.random().toString(36).slice(2, 8)}`;
    const results = await redis
      .multi()
      .zremrangebyscore(key, 0, windowStart)
      .zadd(key, { score: now, member })
      .zcard(key)
      .expire(key, windowSeconds)
      .exec();

    const count = Number(results[2]);
    const safeCount = Number.isSafeInteger(count) && count > 0 ? count : 1;

    if (safeCount > limit) {
      return {
        success: false,
        limit,
        remaining: 0,
        resetSeconds: windowSeconds,
      };
    }

    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - safeCount),
      resetSeconds: windowSeconds,
    };
  } catch (error) {
    console.error("[RateLimit Redis Error - falling back to memory]:", error);
    return checkMemoryRateLimit(`${prefix}:${identifier}`, limit, windowSeconds);
  }
}
