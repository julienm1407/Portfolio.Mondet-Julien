"use client";

import { useEffect, useId, useRef } from "react";

type ImageLightboxProps = {
  urls: string[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
  /** Libellé pour le titre accessible du dialogue. */
  label: string;
};

export function ImageLightbox({ urls, index, onClose, onNavigate, label }: ImageLightboxProps) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const safeIndex = urls.length > 0 ? Math.min(Math.max(0, index), urls.length - 1) : 0;
  const url = urls[safeIndex] ?? "";
  const hasNav = urls.length > 1;

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (hasNav && e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate((safeIndex - 1 + urls.length) % urls.length);
      }
      if (hasNav && e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate((safeIndex + 1) % urls.length);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNavigate, hasNav, safeIndex, urls.length]);

  if (!url) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
      onClick={onClose}
    >
      <p id={titleId} className="sr-only">
        {label} — image {safeIndex + 1} sur {urls.length}
      </p>
      <button
        ref={closeBtnRef}
        type="button"
        className="absolute right-3 top-3 z-[102] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl font-light text-white ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-5 sm:top-5"
        aria-label="Fermer"
        onClick={onClose}
      >
        ×
      </button>
      {hasNav ? (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-[102] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-4"
            aria-label="Image précédente"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((safeIndex - 1 + urls.length) % urls.length);
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 z-[102] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-16"
            aria-label="Image suivante"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((safeIndex + 1) % urls.length);
            }}
          >
            ›
          </button>
        </>
      ) : null}
      <img
        src={url}
        alt=""
        className="max-h-[min(92vh,900px)] max-w-full cursor-default object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {hasNav ? (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white/90">
          {safeIndex + 1} / {urls.length}
        </p>
      ) : null}
    </div>
  );
}
