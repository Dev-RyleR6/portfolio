import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | Software Engineer`,
    short_name: "Ryle Gabotero",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/assets/icons/tech.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
