import type { Metadata } from "next";
import { ProjectArchive } from "@/components/ProjectArchive";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("Projects & Case Studies", "Engineering case studies spanning streaming proxies, desktop security, computer vision, mobile AR, and real-time booking systems.", "/projects");

export default function ProjectsPage() {
  return (
    <>
        <section className="section portfolio" id="overview" aria-labelledby="projects-title">
          <header className="archive-header">
            <p className="eyebrow">Case studies & projects</p>
            <h1 className="archive-title" id="projects-title">Engineered systems across web, security, and AI</h1>
            <p className="section-text">Detailed technical architectures spanning high-throughput streaming proxies, real-time desktop security agents, computer vision pipelines, and mobile SLAM AR.</p>
          </header>
          <ProjectArchive />
        </section>
    </>
  );
}
