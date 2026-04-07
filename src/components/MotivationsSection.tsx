"use client";

import { useState } from "react";
import { motivationsContent, site } from "@/content/site";
import { FadeIn } from "./FadeIn";

function MotivationsPhoto() {
  const [failed, setFailed] = useState(false);
  const src = site.motivationsPhoto?.trim();

  if (!src || failed) {
    return (
      <div
        className="flex aspect-[4/5] w-full max-w-[280px] flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-line bg-surface/80 px-4 py-8 text-center shadow-card sm:max-w-[320px] lg:w-[300px] lg:max-w-none lg:shrink-0 xl:w-[320px]"
        aria-hidden={!!src}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/45">Photo motivations</p>
        <p className="text-pretty text-[10px] leading-snug text-ink/50">
          Placez le fichier dans <code className="rounded bg-muted px-1 py-0.5 text-ink/70">src/assets/motivations.jpg</code> (import dans{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-ink/70">site.ts</code>).
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-card border-2 border-line bg-muted shadow-card sm:max-w-[320px] lg:w-[300px] lg:max-w-none lg:shrink-0 xl:w-[320px]">
      <img
        src={src}
        alt={`${site.name} — motivations et projet professionnel`}
        className="absolute inset-0 h-full w-full origin-[68%_88%] scale-[1.12] object-cover object-[68%_82%]"
        width={640}
        height={800}
        loading="eager"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function MotivationsPhotoAside({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  if (!title.trim() || paragraphs.length === 0) return null;

  return (
    <aside
      className="w-full max-w-[280px] rounded-card border border-primary/20 bg-surface/95 p-4 shadow-card ring-1 ring-primary/[0.06] sm:max-w-[320px] lg:max-w-none lg:w-[300px] xl:w-[320px]"
      aria-labelledby="motivations-photo-aside-title"
    >
      <p
        id="motivations-photo-aside-title"
        className="border-b border-line pb-2 text-[10px] font-extrabold uppercase leading-snug tracking-[0.12em] text-primary"
      >
        {title}
      </p>
      <div className="mt-3 space-y-3 text-pretty text-xs font-normal leading-relaxed text-ink/80 sm:text-[0.8125rem] sm:leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </aside>
  );
}

export function MotivationsSection() {
  const { eyebrow, title, lead, body, objectives, photoAside } = motivationsContent;
  const showPhotoAside = photoAside.title.trim().length > 0 && photoAside.paragraphs.length > 0;

  return (
    <section className="border-t border-line bg-muted" id="motivations" aria-labelledby="motivations-heading">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-14">
          {/* Mobile : photo + encart en haut ; desktop : texte à gauche, colonne photo + encart à droite. */}
          <div className="order-1 flex w-full flex-col items-center gap-6 lg:order-2 lg:w-auto lg:max-w-[320px] lg:shrink-0 lg:items-stretch xl:max-w-[340px]">
            <div className="flex w-full justify-center lg:justify-end">
              <MotivationsPhoto />
            </div>
            {showPhotoAside ? <MotivationsPhotoAside title={photoAside.title} paragraphs={photoAside.paragraphs} /> : null}
          </div>

          <div className="order-2 min-w-0 flex-1 text-start lg:order-1">
            <FadeIn>
              <div className="mb-8 flex flex-col gap-2 border-l-4 border-accent pl-4 sm:mb-9">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/50">{eyebrow}</p>
                <h2
                  id="motivations-heading"
                  className="text-balance text-2xl font-extrabold uppercase tracking-wide text-primary sm:text-3xl"
                >
                  {title}
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.06}>
              <p className="max-w-prose text-pretty text-sm font-medium leading-relaxed text-ink/90 sm:text-base">
                {lead}
              </p>
            </FadeIn>

            {body.map((paragraph, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.05}>
                <p className="mt-4 max-w-prose text-pretty text-sm font-normal leading-relaxed text-ink/80 sm:text-[0.9375rem]">
                  {paragraph}
                </p>
              </FadeIn>
            ))}

            {objectives.length > 0 ? (
              <FadeIn delay={0.14}>
                <p className="mt-8 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary">Objectifs & pistes</p>
                <ul className="mt-3 max-w-prose space-y-3 border-t border-line pt-4">
                  {objectives.map((line) => (
                    <li key={line} className="flex gap-3 text-sm font-normal leading-relaxed text-ink/85 sm:text-[0.9375rem]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span className="min-w-0 text-pretty">{line}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
