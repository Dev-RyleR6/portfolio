import "server-only";

import { getRedisClient } from "./redis";

const PRESENCE_KEY = "portfolio:visitor-presence:v1";
const PRESENCE_TTL_MS = 60_000;
const KEY_EXPIRY_SECONDS = 180;

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
