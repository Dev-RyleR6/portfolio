import type { Metadata } from "next";
import { ProjectArchive } from "@/components/ProjectArchive";
import { projects } from "@/lib/projects";
import { getSiteUrl, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Projects & Case Studies",
  "Engineering case studies spanning streaming proxies, desktop security, computer vision, mobile AR, and real-time booking systems.",
  "/projects"
);

export default function ProjectsPage() {
  const siteUrl = getSiteUrl();
  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Software Projects by Ryle Anthony Gabotero",
    itemListElement: projects.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: p.title,
        description: p.description,
        programmingLanguage: p.technologies,
        codeRepository: p.links.find((l) => l.href.includes("github.com"))?.href,
        url: `${siteUrl}/projects#${p.id}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsSchema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="section portfolio" id="overview" aria-labelledby="projects-title">
        <header className="archive-header">
          <h1 className="archive-title" id="projects-title">
            Projects built around real systems problems.
          </h1>
          <p className="section-text">
            A selected archive of software systems, security tooling, applied AI, and mobile AR—each documented through its architecture, stack, and available source.
          </p>
        </header>
        <ProjectArchive />
      </section>
    </>
  );
}

