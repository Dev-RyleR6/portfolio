import { siteConfig } from "@/lib/site";
import {
  getGitHubContributions,
  type GitHubContributionDay,
} from "@/lib/server/github-contributions";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const numberFormatter = new Intl.NumberFormat("en-US");

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatDayLabel(day: GitHubContributionDay) {
  const contributionLabel = day.count === 1 ? "contribution" : "contributions";
  return `${day.count} ${contributionLabel} on ${dateFormatter.format(new Date(`${day.date}T00:00:00Z`))}`;
}

export async function GitHubActivity() {
  const username = new URL(siteConfig.github).pathname.split("/").filter(Boolean)[0];
  const activity = username ? await getGitHubContributions(username) : null;

  return (
    <section className="content-section" id="activity" aria-labelledby="activity-title">
      <div className="section-heading--split profile-section-heading">
        <h2 id="activity-title">GitHub activity</h2>
        <p>A rolling year of commits, pull requests, issues, and reviews recorded across my GitHub work.</p>
      </div>

      <div className={`github-activity${activity ? "" : " github-activity--unavailable"}`}>
        <div className="github-activity__summary">
          <p>
            {activity
              ? <><strong>{numberFormatter.format(activity.total)}</strong> contributions in the last 12 months</>
              : "Recent contribution activity is available on GitHub."}
          </p>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
            View GitHub profile
            <ArrowIcon />
          </a>
        </div>

        {activity ? (
          <>
            <div
              className="github-activity__calendar"
              role="img"
              aria-label={`${numberFormatter.format(activity.total)} GitHub contributions in the last 12 months`}
            >
              {activity.weeks.map((week) => {
                const daysByWeekday = new Map(week.days.map((day) => [day.weekday, day]));
                return (
                  <div className="github-activity__week" key={week.firstDay} aria-hidden="true">
                    {Array.from({ length: 7 }, (_, weekday) => {
                      const day = daysByWeekday.get(weekday);
                      return day ? (
                        <span
                          className="github-activity__day"
                          data-level={day.level}
                          title={formatDayLabel(day)}
                          key={day.date}
                        />
                      ) : <span className="github-activity__day github-activity__day--empty" key={weekday} />;
                    })}
                  </div>
                );
              })}
            </div>
            <div className="github-activity__range" aria-hidden="true">
              <span>12 months ago</span>
              <span>Today</span>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
