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

  return (
    <>
      <div className={gridClass}>
        {images.map((image, index) => (
          <button className={`gallery-item${image.variant ? ` ${image.variant}` : ""}`} type="button" onClick={() => open(index)} key={image.src}>
            <figure><Image src={image.src} width={image.width} height={image.height} loading="lazy" alt={image.alt} /><figcaption>{image.caption}</figcaption></figure>
          </button>
        ))}
      </div>
      <dialog className="gallery-lightbox" ref={dialogRef} aria-label="Gallery image viewer" onClose={() => document.documentElement.classList.remove("modal-open")} onClick={(event) => { if (event.target === dialogRef.current) close(); }}>
        <div className="gallery-lightbox__shell">
          <button className="gallery-lightbox__close" type="button" onClick={close} aria-label="Close image viewer">×</button>
          {images.length > 1 && <button className="gallery-lightbox__nav gallery-lightbox__nav--previous" type="button" onClick={() => move(-1)} aria-label="Previous image">←</button>}
          <figure className="gallery-lightbox__figure">
            <div className="gallery-lightbox__image-wrap"><Image src={current.src} width={current.width} height={current.height} alt={current.alt} /></div>
            <figcaption><span>{current.caption}</span><span className="gallery-lightbox__count">{active + 1} / {images.length}</span></figcaption>
          </figure>
          {images.length > 1 && <button className="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" onClick={() => move(1)} aria-label="Next image">→</button>}
        </div>
      </dialog>
    </>
  );
}
