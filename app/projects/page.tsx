import type { Metadata } from "next";
import { NextStep } from "@/components/NextStep";
import { ProjectArchive } from "@/components/ProjectArchive";
import { projects } from "@/lib/projects";
import { getSiteUrl, pageMetadata, siteConfig } from "@/lib/site";

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
    "@id": `${siteUrl}/projects#project-list`,
    name: "Software Projects by Ryle Anthony Gabotero",
    url: `${siteUrl}/projects`,
    itemListElement: projects.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: p.title,
        description: p.description,
        about: p.technologies,
        programmingLanguage: p.technologies.filter((technology) =>
          ["TypeScript", "Python", "Kotlin"].includes(technology),
        ),
        codeRepository: p.links.find((l) => l.href.includes("github.com"))?.href,
        image: `${siteUrl}${p.image}`,
        author: { "@id": `${siteUrl}/#person` },
        url: `${siteUrl}/projects/${p.id}`,
        mainEntityOfPage: `${siteUrl}/projects/${p.id}`,
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
            Systems I’ve built and explored
          </h1>
          <p className="section-text">
            A selection of things I’ve built across software systems, cybersecurity, applied AI, and mobile AR. Each project includes the architecture, tools I used, and source code when available.
          </p>
        </header>
        <ProjectArchive />
      </section>
      <NextStep
        title="Want the full technical picture?"
        description="Start a conversation about a role or project, or open my résumé for the complete record."
        links={[
          { href: "/contact", label: "Discuss a role or project" },
          { href: siteConfig.resume, label: "Open résumé", external: true },
        ]}
      />
    </>
  );
}

