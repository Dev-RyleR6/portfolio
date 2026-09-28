import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NextStep } from "@/components/NextStep";
import { projects } from "@/lib/projects";
import { getSiteUrl, pageMetadata } from "@/lib/site";
import "@/css/section/project-detail.css";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) return {};

  return pageMetadata(
    project.caseStudy ? `${project.title} Case Study` : `${project.title} Project`,
    project.description,
    `/projects/${project.id}`,
  );
}

function ArrowIcon({ external = false }: { external?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      {external ? (
        <path d="M5 3h8v8M12.5 3.5l-9 9" />
      ) : (
        <path d="M2.5 8h11M9.5 4l4 4-4 4" />
      )}
    </svg>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) notFound();

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/projects/${project.id}`;
  const repositories = project.links
    .filter((link) => link.href.includes("github.com"))
    .map((link) => link.href);
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${pageUrl}#software`,
    name: project.title,
    description: project.description,
    url: pageUrl,
    image: `${siteUrl}${project.image}`,
    applicationCategory: project.categoryLabel,
    programmingLanguage: project.technologies,
    codeRepository: repositories,
    author: { "@id": `${siteUrl}/#person` },
    mainEntityOfPage: pageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c"),
        }}
      />
      <article className="project-detail">
        <nav className="project-detail__breadcrumb" aria-label="Breadcrumb">
          <Link href="/projects">Projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <header className="project-detail__hero">
          <div className="project-detail__intro">
            <div className="project-detail__meta">
              <span>{project.categoryLabel}</span>
              {project.status ? <span>{project.status.label}</span> : null}
            </div>
            <h1>{project.title}</h1>
            <p className="project-detail__subtitle">{project.subtitle}</p>
            <p className="project-detail__description">{project.description}</p>
          </div>

          <figure className={`project-detail__media project-detail__media--${project.mediaTone ?? "dark"}${project.mediaOrientation === "portrait" ? " project-detail__media--portrait" : ""}`}>
            <Image
              src={project.image}
              width={1200}
              height={750}
              sizes="(max-width: 800px) calc(100vw - 2rem), 48rem"
              alt={project.imageAlt}
              priority
            />
          </figure>
        </header>

        <div className="project-detail__body">
          <div className="project-detail__main">
            {project.caseStudy ? (
              <section aria-labelledby="engineering-decisions">
                <h2 id="engineering-decisions">Engineering decisions</h2>
                <dl className="project-detail__decisions">
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
              </section>
            ) : (
              <section aria-labelledby="project-overview">
                <h2 id="project-overview">Project overview</h2>
                <p>{project.description}</p>
              </section>
            )}

            {project.status ? (
              <section className="project-detail__status" aria-labelledby="project-status">
                <h2 id="project-status">Current status</h2>
                <p>{project.status.reason}</p>
              </section>
            ) : null}
          </div>

          <aside className="project-detail__aside" aria-label="Project details">
            <section>
              <h2>Technology</h2>
              <ul className="project-detail__technology">
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </section>

            <section>
              <h2>Project links</h2>
              <ul className="project-detail__links">
                {project.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}<ArrowIcon external />
                      </a>
                    ) : (
                      <Link href={link.href}>
                        {link.label}<ArrowIcon />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </article>

      <NextStep
        title="Explore the rest of the work."
        description="Return to the project archive or start a conversation about the engineering behind this project."
        links={[
          { href: "/projects", label: "View all projects" },
          { href: "/contact", label: "Discuss this work" },
        ]}
      />
    </>
  );
}
