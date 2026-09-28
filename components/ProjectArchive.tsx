"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/lib/projects";

export const projectFilters = [
  ["all", `All (${projects.length})`, "All"],
  ["backend", "Backend & Systems", "Backend"],
  ["security-ai", "Security & AI", "Security"],
  ["mobile", "Mobile AR", "Mobile"],
] as const;

type ProjectFilter = (typeof projectFilters)[number][0];
type ProjectView = "grid" | "list";

function GridIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="2.5" y="2.5" width="6" height="6" rx="1" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1" />
      <rect x="11.5" y="11.5" width="6" height="6" rx="1" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 5h2M8 5h9M3 10h2M8 10h9M3 15h2M8 15h9" />
    </svg>
  );
}

function ArrowIcon({ external = false }: { external?: boolean }) {
  return external ? (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5 3h8v8M12.5 3.5l-9 9" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}

export function ProjectArchive() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [view, setView] = useState<ProjectView>("grid");
  const visibleProjects = projects
    .filter((project) => filter === "all" || project.category === filter)
    .sort((a, b) => Number(Boolean(b.caseStudy)) - Number(Boolean(a.caseStudy)));

  return (
    <>
      <div className="project-toolbar">
        <div className="archive-filters" aria-label="Filter projects" role="group">
          {projectFilters.map(([value, label, compactLabel]) => (
            <button
              className={`filter-btn${filter === value ? " active" : ""}`}
              aria-controls="project-archive-results"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              type="button"
              key={value}
            >
              <span className="filter-label--full">{label}</span>
              <span className="filter-label--compact">{compactLabel}</span>
            </button>
          ))}
        </div>

        <div className="project-view-switch" aria-label="Choose project layout" role="group">
          <button
            className={`project-view-btn${view === "grid" ? " active" : ""}`}
            aria-controls="project-archive-results"
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
            title="Grid view"
            type="button"
          >
            <GridIcon />
          </button>
          <button
            className={`project-view-btn${view === "list" ? " active" : ""}`}
            aria-controls="project-archive-results"
            aria-label="List view"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
            title="List view"
            type="button"
          >
            <ListIcon />
          </button>
        </div>

        <p className="project-result-count" aria-live="polite">
          Showing {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className={`portfolio-grid portfolio-grid--${view}`} id="project-archive-results">
        {visibleProjects.map((project, index) => (
          <article className={`portfolio-item${project.caseStudy ? " portfolio-item--case-study" : ""}${project.mediaOrientation === "portrait" ? " portfolio-item--portrait" : ""}`} id={project.id} data-category={project.category} key={project.id}>
            <div className={`portfolio-image-frame portfolio-image-frame--${project.mediaTone ?? "dark"}${project.mediaOrientation === "portrait" ? " portfolio-image-frame--portrait" : ""}`}>
              <Image
                src={project.image}
                width={800}
                height={500}
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes={view === "list"
                  ? "(max-width: 800px) 34vw, 18rem"
                  : project.caseStudy && project.mediaOrientation !== "portrait"
                    ? "(max-width: 800px) calc(100vw - 2rem), 52rem"
                    : project.mediaOrientation === "portrait"
                      ? "(max-width: 720px) calc(100vw - 2rem), 18rem"
                      : "(max-width: 800px) calc(100vw - 2rem), 25rem"}
                alt={project.imageAlt}
                className="portfolio-image"
              />
            </div>

            <div className="portfolio-card-content">
              <div className="project-card-meta">
                <span className="project-tag">{project.categoryLabel}</span>
                {project.status ? <span className="status status-offline">{project.status.label}</span> : null}
              </div>

              <div className="project-heading-row">
                <h2 className="portfolio-title">{project.title}</h2>
                <p className="project-subtitle">{project.subtitle}</p>
              </div>

              {project.status ? <p className="project-status-note">{project.status.reason}</p> : null}
              <p className="portfolio-description">{project.description}</p>

              {project.caseStudy ? (
                <dl className="project-proof" aria-label={`${project.title} engineering decisions`}>
                  <div>
                    <dt>Problem</dt>
                    <dd>{project.caseStudy.problem}</dd>
                  </div>
                  <div>
                    <dt>Decision</dt>
                    <dd>{project.caseStudy.decision}</dd>
                  </div>
                  <div>
                    <dt>Outcome</dt>
                    <dd>{project.caseStudy.outcome}</dd>
                  </div>
                </dl>
              ) : null}

              <ul className="project-tech" aria-label="Technologies used">
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>

              <div className="project-links">
                {project.links.map((link) => link.external ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-link" key={link.href}>
                    {link.label}<ArrowIcon external />
                  </a>
                ) : (
                  <Link href={link.href} className="text-link" key={link.href}>
                    {link.label}<ArrowIcon />
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

    </>
  );
}
