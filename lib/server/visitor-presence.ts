import "server-only";

import { Redis } from "@upstash/redis";

const PRESENCE_KEY = "portfolio:visitor-presence:v1";
const PRESENCE_TTL_MS = 60_000;
const KEY_EXPIRY_SECONDS = 180;

let redisClient: Redis | null | undefined;

function getRedisClient(): Redis | null {
  if (redisClient !== undefined) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  redisClient = url && token ? new Redis({ url, token }) : null;
  return redisClient;
}

export async function refreshPresence(visitorId: string): Promise<number | undefined> {
  const redis = getRedisClient();
  if (!redis) return undefined;

  const now = Date.now();

  try {
    const results = await redis
      .multi()
      .zremrangebyscore(PRESENCE_KEY, 0, now - PRESENCE_TTL_MS)
      .zadd(PRESENCE_KEY, { score: now, member: visitorId })
      .zcard(PRESENCE_KEY)
      .expire(PRESENCE_KEY, KEY_EXPIRY_SECONDS)
      .exec();

    const online = Number(results[2]);
    return Number.isSafeInteger(online) && online >= 0 ? online : undefined;
  } catch {
    return undefined;
  }
}
