import type { Metadata } from "next";
import { ProjectArchive } from "@/components/ProjectArchive";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("Projects & Case Studies", "Engineering case studies spanning streaming proxies, desktop security, computer vision, mobile AR, and real-time booking systems.", "/projects");

export default function ProjectsPage() {
  return (
    <>
        <section className="section portfolio" id="overview" aria-labelledby="projects-title">
          <header className="archive-header">
            <h1 className="archive-title" id="projects-title">Projects built around real systems problems.</h1>
            <p className="section-text">A selected archive of software systems, security tooling, applied AI, and mobile AR—each documented through its architecture, stack, and available source.</p>
          </header>
          <ProjectArchive />
        </section>
    </>
  );
}
