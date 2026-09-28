import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();
  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/experience`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/gallery`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
