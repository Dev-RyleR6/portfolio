export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: "backend" | "security-ai" | "mobile";
  categoryLabel: string;
  image: string;
  imageAlt: string;
  description: string;
  technologies: string[];
  links: { label: string; href: string; external?: boolean }[];
};

export const projects: Project[] = [
  {
    id: "myanime", title: "myAnime", subtitle: "Reverse Proxy & Streaming Engine", category: "backend", categoryLabel: "Web Application", image: "/assets/images/myanimelogo.svg", imageAlt: "myAnime streaming platform preview",
    description: "An ad-free streaming architecture using a custom Node.js reverse proxy for byte-range video streaming, automated scraping workers, Redis caching, and a relational PostgreSQL schema.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Redis"],
    links: [{ label: "View live project", href: "https://myanime-frontend.vercel.app/", external: true }, { label: "GitHub repo", href: "https://github.com/Dev-RyleR6/myAnime", external: true }],
  },
  {
    id: "safeview", title: "SafeView", subtitle: "Real-Time Visual Phishing Detection", category: "security-ai", categoryLabel: "Security Software", image: "/assets/images/safeview.svg", imageAlt: "SafeView OCR and transformer detection architecture",
    description: "A Windows security agent that scans active screen buffers using Tesseract OCR and semantic embeddings to detect visual phishing with local, sub-50ms inference and no cloud data transmission.",
    technologies: ["Python", "Sentence-Transformers", "Tesseract OCR", "Tkinter", "Windows API"],
    links: [{ label: "Explore repository", href: "https://github.com/Dev-RyleR6/SafeView", external: true }, { label: "Competition context", href: "/gallery#worldskills-national" }],
  },
  {
    id: "ovalens", title: "OvaLens Ecosystem", subtitle: "YOLOv8 Computer Vision & IoT", category: "security-ai", categoryLabel: "Computer Vision & IoT", image: "/assets/images/ovalens.svg", imageAlt: "OvaLens computer vision and conveyor architecture",
    description: "Automated duck egg candling and fertility sorting powered by a custom YOLOv8 model, camera exposure controls, a Python edge client, and ESP32 conveyor actuation.",
    technologies: ["Python", "YOLOv8", "OpenCV", "ESP32", "Hardware IoT"],
    links: [{ label: "Model repository", href: "https://github.com/Dev-RyleR6/OvaLens", external: true }, { label: "Edge client", href: "https://github.com/Dev-RyleR6/OvaLens---Edge-App", external: true }],
  },
  {
    id: "archronicle", title: "AR Chronicle", subtitle: "Geospatial SLAM Navigation", category: "mobile", categoryLabel: "Mobile AR", image: "/assets/images/archronicle.svg", imageAlt: "AR Chronicle mobile project preview",
    description: "A native Android AR exploration app combining ARCore SLAM plane detection, Unity, OpenStreetMap geofencing, and gyro-assisted heading calibration for landmark discovery.",
    technologies: ["Kotlin", "Unity", "ARCore", "OpenStreetMap", "GPS"],
    links: [{ label: "GitHub repo", href: "https://github.com/Dev-RyleR6/ARChroniclesmainAPP", external: true }, { label: "Watch project demo", href: "https://www.facebook.com/share/v/1BcHgnFtZG/", external: true }],
  },
  {
    id: "pickleworld", title: "Pickle World", subtitle: "Real-Time Venue Booking Engine", category: "backend", categoryLabel: "Full-Stack System", image: "/assets/images/pickleworld.svg", imageAlt: "Pickle World project preview",
    description: "A multi-court reservation engine with WebSocket slot locks, webhook-driven payment reconciliation, and strict MySQL transaction isolation to prevent double-booking under concurrency.",
    technologies: ["React", "TypeScript", "Node.js", "MySQL", "WebSockets"],
    links: [{ label: "View live preview", href: "https://pickleworld-frontend.vercel.app/", external: true }, { label: "GitHub repo", href: "https://github.com/Dev-RyleR6/pickleball_reservation_system", external: true }],
  },
];
