import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    { url: base },
    { url: `${base}/projects` },
    ...projects.map((project) => ({ url: `${base}/projects/${project.id}` })),
    { url: `${base}/experience` },
    { url: `${base}/gallery` },
    { url: `${base}/contact` },
  ];
}
