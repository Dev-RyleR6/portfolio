"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  variant?: string;
};

function ExpandIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 3.5h-4v4M12.5 3.5h4v4M7.5 16.5h-4v-4M12.5 16.5h4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d={direction === "left" ? "m12 5-5 5 5 5" : "m8 5 5 5-5 5"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GalleryGrid({ images, columns = "default" }: { images: GalleryImage[]; columns?: "default" | "three" | "evidence" }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const current = images[active];

  function open(index: number) {
    setActive(index);
    dialogRef.current?.showModal();
    document.documentElement.classList.add("modal-open");
  }

  function close() {
    dialogRef.current?.close();
    document.documentElement.classList.remove("modal-open");
  }

  function move(direction: number) {
    setActive((index) => (index + direction + images.length) % images.length);
  }

  useEffect(() => () => document.documentElement.classList.remove("modal-open"), []);

  const gridClass = columns === "three" ? "activity-gallery activity-gallery--three" : columns === "evidence" ? "activity-gallery activity-gallery--evidence" : "activity-gallery";
  const orientation = current.width / current.height > 1.2 ? "landscape" : current.width / current.height < 0.85 ? "portrait" : "square";

  return (
    <>
      <div className={gridClass}>
        {images.map((image, index) => (
          <button
            className={`gallery-item${image.variant ? ` ${image.variant}` : ""}`}
            type="button"
            onClick={() => open(index)}
            aria-label={`Open image: ${image.caption}`}
            aria-haspopup="dialog"
            key={image.src}
          >
            <figure>
              <span className="gallery-item__media">
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  sizes={columns === "three" ? "(max-width: 800px) 100vw, 33vw" : image.variant === "gallery-item--wide" ? "(max-width: 800px) 100vw, 64rem" : "(max-width: 800px) 100vw, 50vw"}
                  alt={image.alt}
                />
                <span className="gallery-item__expand"><ExpandIcon /></span>
              </span>
              <figcaption>
                <span className="gallery-item__caption">{image.caption}</span>
                <span className="gallery-item__position" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          </button>
        ))}
      </div>
      <dialog
        className={`gallery-lightbox is-${orientation}`}
        ref={dialogRef}
        aria-label="Gallery image viewer"
        onClose={() => document.documentElement.classList.remove("modal-open")}
        onClick={(event) => { if (event.target === dialogRef.current) close(); }}
        onKeyDown={(event) => {
          if (images.length < 2) return;
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }}
      >
        <div className="gallery-lightbox__shell">
          <button className="gallery-lightbox__close" type="button" onClick={close} aria-label="Close image viewer"><CloseIcon /></button>
          {images.length > 1 && <button className="gallery-lightbox__nav gallery-lightbox__nav--previous" type="button" onClick={() => move(-1)} aria-label="Previous image"><ChevronIcon direction="left" /></button>}
          <figure className="gallery-lightbox__figure">
            <div className="gallery-lightbox__image-wrap"><Image src={current.src} width={current.width} height={current.height} sizes="(max-width: 800px) 100vw, 1120px" alt={current.alt} /></div>
            <figcaption aria-live="polite"><span>{current.caption}</span><span className="gallery-lightbox__count">{active + 1} / {images.length}</span></figcaption>
          </figure>
          {images.length > 1 && <button className="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" onClick={() => move(1)} aria-label="Next image"><ChevronIcon direction="right" /></button>}
        </div>
      </dialog>
    </>
  );
}
