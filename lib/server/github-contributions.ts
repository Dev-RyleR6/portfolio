import "server-only";

import { unstable_cache } from "next/cache";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const CONTRIBUTION_LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

type ContributionLevel = keyof typeof CONTRIBUTION_LEVELS;

type GitHubResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions?: number;
          weeks?: Array<{
            firstDay?: string;
            contributionDays?: Array<{
              date?: string;
              contributionCount?: number;
              contributionLevel?: ContributionLevel;
              weekday?: number;
            }>;
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message?: string }>;
};

export type GitHubContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  weekday: number;
};

export type GitHubContributionWeek = {
  firstDay: string;
  days: GitHubContributionDay[];
};

export type GitHubContributionData = {
  total: number;
  weeks: GitHubContributionWeek[];
};

const query = `
  query ContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
            }
          }
        }
      }
    }
  }
`;

async function requestGitHubContributions(username: string): Promise<GitHubContributionData | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Dev-RyleR6-portfolio",
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as GitHubResponse;
    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
    if (payload.errors?.length || !calendar || !Array.isArray(calendar.weeks)) return null;

    const weeks = calendar.weeks.flatMap((week) => {
      if (!week.firstDay || !Array.isArray(week.contributionDays)) return [];

      const days = week.contributionDays.flatMap((day) => {
        const level = day.contributionLevel
          ? CONTRIBUTION_LEVELS[day.contributionLevel]
          : undefined;
        if (
          !day.date
          || !/^\d{4}-\d{2}-\d{2}$/.test(day.date)
          || typeof day.contributionCount !== "number"
          || !Number.isSafeInteger(day.contributionCount)
          || day.contributionCount < 0
          || typeof level !== "number"
          || typeof day.weekday !== "number"
          || !Number.isSafeInteger(day.weekday)
          || day.weekday < 0
          || day.weekday > 6
        ) {
          return [];
        }

        return [{
          date: day.date,
          count: day.contributionCount,
          level,
          weekday: day.weekday,
        } satisfies GitHubContributionDay];
      });

      return [{ firstDay: week.firstDay, days } satisfies GitHubContributionWeek];
    });

    const total = calendar.totalContributions;
    if (typeof total !== "number" || !Number.isSafeInteger(total) || total < 0 || !weeks.length) return null;

    return { total, weeks };
  } catch {
    return null;
  }
}

const getCachedGitHubContributions = unstable_cache(
  requestGitHubContributions,
  ["github-contribution-calendar-v1"],
  { revalidate: 3_600 },
);

export function getGitHubContributions(username: string) {
  return getCachedGitHubContributions(username);
}
