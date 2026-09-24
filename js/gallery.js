document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.querySelector("#gallery-lightbox");
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item[data-full-src]"));

  if (!dialog || !galleryItems.length || typeof dialog.showModal !== "function") return;

  const image = dialog.querySelector("[data-lightbox-image]");
  const caption = dialog.querySelector("[data-lightbox-caption]");
  const count = dialog.querySelector("[data-lightbox-count]");
  const closeButton = dialog.querySelector("[data-lightbox-close]");
  const previousButton = dialog.querySelector("[data-lightbox-previous]");
  const nextButton = dialog.querySelector("[data-lightbox-next]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeItems = [];
  let activeIndex = 0;
  let returnFocus = null;
  let closeTimer = null;
  let pointerStartX = null;

  const updateNavigation = () => {
    const hasMultiple = activeItems.length > 1;
    previousButton.hidden = !hasMultiple;
    nextButton.hidden = !hasMultiple;
    count.textContent = hasMultiple ? `${activeIndex + 1} / ${activeItems.length}` : "";
  };

  const updateOrientation = (thumbnail) => {
    const width = thumbnail.naturalWidth || Number(thumbnail.getAttribute("width")) || 1;
    const height = thumbnail.naturalHeight || Number(thumbnail.getAttribute("height")) || 1;
    const ratio = width / height;

    dialog.classList.remove("is-portrait", "is-square", "is-landscape");
    dialog.classList.add(ratio < 0.88 ? "is-portrait" : ratio > 1.12 ? "is-landscape" : "is-square");
  };

  const renderImage = (index, animate = true) => {
    activeIndex = (index + activeItems.length) % activeItems.length;
    const item = activeItems[activeIndex];
    const thumbnail = item.querySelector("img");
    const itemCaption = item.querySelector("figcaption")?.textContent.trim() || thumbnail.alt;
    const source = item.dataset.fullSrc || thumbnail.currentSrc || thumbnail.src;

    const applyImage = () => {
      updateOrientation(thumbnail);
      image.src = source;
      image.alt = thumbnail.alt;
      caption.textContent = itemCaption;
      updateNavigation();
      requestAnimationFrame(() => image.classList.remove("is-changing"));
    };

    if (!animate || reducedMotion || !image.src) {
      applyImage();
      return;
    }

    image.classList.add("is-changing");
    window.setTimeout(applyImage, 120);
  };

  const openLightbox = (item) => {
    const gallery = item.closest(".activity-gallery");
    activeItems = Array.from(gallery.querySelectorAll(".gallery-item[data-full-src]"));
    activeIndex = activeItems.indexOf(item);
    returnFocus = item;
    renderImage(activeIndex, false);
    dialog.classList.remove("is-closing");
    dialog.showModal();
    document.documentElement.classList.add("modal-open");
    closeButton.focus({ preventScroll: true });
  };

  const finishClose = () => {
    if (closeTimer !== null) window.clearTimeout(closeTimer);
    closeTimer = null;
    if (dialog.open) dialog.close();
  };

  const closeLightbox = () => {
    if (!dialog.open) return;
    if (reducedMotion) {
      finishClose();
      return;
    }
    dialog.classList.add("is-closing");
    closeTimer = window.setTimeout(finishClose, 180);
  };

  galleryItems.forEach((item) => item.addEventListener("click", () => openLightbox(item)));
  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", () => renderImage(activeIndex - 1));
  nextButton.addEventListener("click", () => renderImage(activeIndex + 1));

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeLightbox();
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeLightbox();
  });

  dialog.addEventListener("close", () => {
    dialog.classList.remove("is-closing", "is-portrait", "is-square", "is-landscape");
    document.documentElement.classList.remove("modal-open");
    image.removeAttribute("src");
    if (returnFocus instanceof HTMLElement) returnFocus.focus({ preventScroll: true });
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      renderImage(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      renderImage(activeIndex + 1);
    }
  });

  dialog.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") pointerStartX = event.clientX;
  });

  dialog.addEventListener("pointerup", (event) => {
    if (pointerStartX === null || event.pointerType !== "touch") return;
    const distance = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(distance) < 55) return;
    renderImage(activeIndex + (distance < 0 ? 1 : -1));
  });
});
