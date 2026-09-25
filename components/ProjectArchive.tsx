"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { projects } from "@/lib/projects";

const filters = [
  ["all", "All (5)"],
  ["backend", "Backend & Systems"],
  ["security-ai", "Security & AI"],
  ["mobile", "Mobile AR"],
] as const;

export function ProjectArchive() {
  const [filter, setFilter] = useState<(typeof filters)[number][0]>("all");
  return (
    <>
      <div className="archive-filters" aria-label="Filter case studies">
        {filters.map(([value, label]) => (
          <button className={`filter-btn${filter === value ? " active" : ""}`} aria-pressed={filter === value} onClick={() => setFilter(value)} key={value}>{label}</button>
        ))}
      </div>
      <div className="portfolio-grid">
        {projects.map((project) => {
          const isVisible = filter === "all" || project.category === filter;
          return (
          <article className={`portfolio-item${isVisible ? "" : " project-hidden"}`} id={project.id} data-category={project.category} hidden={!isVisible} key={project.id}>
            <Image src={project.image} width={800} height={200} loading="lazy" alt={project.imageAlt} className="portfolio-image" />
            <div className="portfolio-card-content">
              <div className="project-heading-row"><h2 className="portfolio-title">{project.title} · {project.subtitle}</h2><span className="project-tag">{project.categoryLabel}</span></div>
              <p className="portfolio-description">{project.description}</p>
              <div className="project-tech" aria-label="Technologies used">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
              <div className="project-links">
                {project.links.map((link) => link.external ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-link" key={link.href}>{link.label} <span aria-hidden="true">↗</span></a>
                ) : (
                  <Link href={link.href} className="text-link" key={link.href}>{link.label} <span aria-hidden="true">→</span></Link>
                ))}
              </div>
            </div>
          </article>
        )})}
      </div>
    </>
  );
}
