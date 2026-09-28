export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: "backend" | "security-ai" | "mobile";
  categoryLabel: string;
  image: string;
  imageAlt: string;
  description: string;
  status?: { label: "Discontinued"; reason: string };
  technologies: string[];
  links: { label: string; href: string; external?: boolean }[];
};

export const projects: Project[] = [
  {
    id: "myanime", title: "myAnime", subtitle: "Reverse Proxy & Streaming Engine", category: "backend", categoryLabel: "Web Application", image: "/assets/images/myanimelogo.svg", imageAlt: "myAnime streaming platform preview",
    description: "An ad-free streaming architecture using a custom Node.js reverse proxy for byte-range video streaming, automated scraping workers, Redis caching, and a relational PostgreSQL schema.",
    status: { label: "Discontinued", reason: "Retired because its scraper depended on unlicensed third-party media sources." },
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Redis"],
    links: [{ label: "GitHub repo", href: "https://github.com/Dev-RyleR6/myAnime", external: true }],
  },
  {
    id: "proxy-server", title: "HLS Proxy Server", subtitle: "Streaming Relay & Cache Layer", category: "backend", categoryLabel: "Backend Infrastructure", image: "/assets/images/projects/proxyserver.png", imageAlt: "HLS proxy request, relay, and CDN architecture",
    description: "A Node.js and Express HLS relay that rewrites manifest URLs, forwards byte-range requests, streams binary segments with backpressure, combines memory and disk caching, and rejects basic private-network targets.",
    status: { label: "Discontinued", reason: "Retired with myAnime because it supported delivery from unlicensed third-party media sources." },
    technologies: ["Node.js", "Express", "HLS", "LRU Cache", "HTTP Range Requests"],
    links: [{ label: "Explore repository", href: "https://github.com/Dev-RyleR6/proxy-server", external: true }],
  },
  {
    id: "safeview", title: "SafeView", subtitle: "Real-Time Visual Phishing Detection", category: "security-ai", categoryLabel: "Security Software", image: "/assets/images/projects/safeview.png", imageAlt: "SafeView OCR and transformer detection architecture",
    description: "A Windows security agent that scans active screen buffers using Tesseract OCR and semantic embeddings to detect visual phishing with local, sub-50ms inference and no cloud data transmission.",
    technologies: ["Python", "Sentence-Transformers", "Tesseract OCR", "Tkinter", "Windows API"],
    links: [{ label: "View live project", href: "https://safe-view.vercel.app/", external: true }, { label: "View documentation", href: "https://github.com/Dev-RyleR6/SafeView/blob/main/README.md", external: true }, { label: "Explore repository", href: "https://github.com/Dev-RyleR6/SafeView", external: true }],
  },
  {
    id: "ovalens", title: "OvaLens Ecosystem", subtitle: "YOLOv8 Computer Vision & IoT", category: "security-ai", categoryLabel: "Computer Vision & IoT", image: "/assets/images/projects/ovalens.png", imageAlt: "OvaLens computer vision and conveyor architecture",
    description: "Automated duck egg candling and fertility sorting powered by a custom YOLOv8 model, camera exposure controls, a Python edge client, and ESP32 conveyor actuation.",
    technologies: ["Python", "YOLOv8", "OpenCV", "ESP32", "Hardware IoT"],
    links: [{ label: "Model repository", href: "https://github.com/Dev-RyleR6/OvaLens-Ecosystem", external: true }, { label: "Edge client", href: "https://github.com/Dev-RyleR6/OvaLens---Edge-App", external: true }],
  },
  {
    id: "archronicle", title: "AR Chronicle", subtitle: "Geospatial SLAM Navigation", category: "mobile", categoryLabel: "Mobile AR", image: "/assets/images/archronicle.svg", imageAlt: "AR Chronicle mobile project preview",
    description: "A native Android AR exploration app combining ARCore SLAM plane detection, Unity, OpenStreetMap geofencing, and gyro-assisted heading calibration for landmark discovery.",
    technologies: ["Kotlin", "Unity", "ARCore", "OpenStreetMap", "GPS"],
    links: [{ label: "GitHub repo", href: "https://github.com/Dev-RyleR6/ARChroniclesmainAPP", external: true }, { label: "Watch project demo", href: "https://www.facebook.com/share/v/1BcHgnFtZG/", external: true }],
  },
  {
    id: "pickleworld", title: "Pickle World", subtitle: "Real-Time Venue Booking Engine", category: "backend", categoryLabel: "Full-Stack System", image: "/assets/images/projects/pickleworld.png", imageAlt: "Pickle World project preview",
    description: "A multi-court reservation engine with WebSocket slot locks, webhook-driven payment reconciliation, and strict MySQL transaction isolation to prevent double-booking under concurrency.",
    status: { label: "Discontinued", reason: "The hosted deployment was retired after its domain and hosting were not renewed." },
    technologies: ["React", "TypeScript", "Node.js", "MySQL", "WebSockets"],
    links: [{ label: "GitHub repo", href: "https://github.com/Dev-RyleR6/pickleball_reservation_system", external: true }],
  },
];
