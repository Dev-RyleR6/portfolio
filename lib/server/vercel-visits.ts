import "server-only";

const ANALYTICS_ENDPOINT = "https://api.vercel.com/v1/query/web-analytics/visits/count";
const CACHE_TTL_MS = 5 * 60_000;

type VisitsResponse = {
  data?: {
    pageviews?: number;
  };
};

let cachedResult: { expiresAt: number; value: number | undefined } | undefined;
let inFlightRequest: Promise<number | undefined> | undefined;

async function requestVisitCount(): Promise<number | undefined> {
  const token = process.env.VERCEL_API_TOKEN ?? process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) return undefined;

  const url = new URL(ANALYTICS_ENDPOINT);
  url.searchParams.set("projectId", projectId);

  const teamId = process.env.VERCEL_TEAM_ID
    ?? (process.env.VERCEL_ORG_ID?.startsWith("team_") ? process.env.VERCEL_ORG_ID : undefined);
  if (teamId) url.searchParams.set("teamId", teamId);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(4_000),
    });

    if (!response.ok) return undefined;

    const payload = (await response.json()) as VisitsResponse;
    const pageviews = payload.data?.pageviews;
    return typeof pageviews === "number" && Number.isSafeInteger(pageviews) && pageviews >= 0
      ? pageviews
      : undefined;
  } catch {
    return undefined;
  }
}

export async function getVisitCount(): Promise<number | undefined> {
  const now = Date.now();
  if (cachedResult && cachedResult.expiresAt > now) return cachedResult.value;

  if (!inFlightRequest) {
    inFlightRequest = requestVisitCount()
      .then((value) => {
        cachedResult = { value, expiresAt: Date.now() + CACHE_TTL_MS };
        return value;
      })
      .finally(() => {
        inFlightRequest = undefined;
      });
  }

  return inFlightRequest;
}
