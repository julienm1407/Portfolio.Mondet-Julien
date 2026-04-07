"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ExperienceItem } from "@/content/site";
import { experience, site } from "@/content/site";
import { FadeIn } from "./FadeIn";
import { sitePath } from "@/lib/homeHref";
import { ProfilePhoto } from "./ProfilePhoto";

function ExperienceArticle({
  item,
  articleClassName = "",
  compact = false,
}: {
  item: ExperienceItem;
  articleClassName?: string;
  /** Moins de marge verticale (carrousel). */
  compact?: boolean;
}) {
  return (
    <article className={`relative min-w-0 pl-9 text-start sm:pl-12 ${articleClassName}`}>
      <div className="absolute left-0 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-accent shadow sm:left-0.5 sm:top-1.5 sm:h-4 sm:w-4" />

      <p className="text-[10px] font-bold uppercase tracking-wider text-accent sm:text-xs">{item.period}</p>

      <div className="mt-2 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-base font-extrabold leading-snug tracking-tight sm:flex-nowrap sm:text-lg">
        <span className="min-w-0 text-pretty text-ink sm:shrink">{item.role}</span>
        <span className="text-ink/35 sm:shrink-0" aria-hidden>
          ·
        </span>
        <span className="min-w-0 font-semibold text-primary sm:shrink-0">{item.company}</span>
      </div>

      <p
        className={
          compact
            ? "mt-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink/45 sm:mt-5"
            : "mt-6 text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink/45 sm:mt-7"
        }
      >
        Compétences sollicitées
      </p>
      <ul
        className={
          compact
            ? "mt-2 space-y-2 border-t border-line pt-3 sm:space-y-2.5 sm:pt-3.5"
            : "mt-3 space-y-3 border-t border-line pt-4 sm:space-y-3.5 sm:pt-5"
        }
      >
        {item.details.map((line) => (
          <li
            key={line}
            className={`flex gap-2 text-xs font-normal text-ink/80 sm:text-sm ${
              compact ? "leading-snug" : "leading-[1.65] sm:leading-[1.7]"
            }`}
          >
            <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent ${compact ? "mt-1" : "mt-2"}`} />
            <span className="min-w-0 text-pretty break-words">{line}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ExperienceCarousel({ items }: { items: ExperienceItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = items.length;

  const updateActiveFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || n <= 1) return;
    const w = el.clientWidth || 1;
    const i = Math.round(el.scrollLeft / w);
    setActive(Math.max(0, Math.min(n - 1, i)));
  }, [n]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateActiveFromScroll();
    el.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateActiveFromScroll);
  }, [updateActiveFromScroll]);

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const i = Math.max(0, Math.min(n - 1, index));
    el.scrollTo({ left: i * w, behavior: "smooth" });
    setActive(i);
  };

  if (n === 0) return null;

  if (n === 1) {
    return (
      <div className="relative mt-7 max-h-[min(58vh,520px)] overflow-y-auto rounded-lg pr-1 sm:mt-9 sm:pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-line">
        <div className="relative pb-2 before:absolute before:bottom-2 before:left-[6px] before:top-2 before:w-px before:bg-line sm:before:left-[10px]">
          <ExperienceArticle item={items[0]!} compact />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-7 sm:mt-9">
      <div className="relative rounded-xl border border-line/60 bg-muted/20 shadow-inner ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carrousel"
          aria-label="Parcours professionnel — faire défiler pour voir chaque expérience"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              goTo(active + 1);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              goTo(active - 1);
            }
          }}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div
              key={`${item.period}-${item.company}`}
              className="w-full min-w-full shrink-0 snap-center snap-always px-1 sm:px-2"
            >
              <div className="max-h-[min(52vh,480px)] overflow-y-auto py-3 pr-1 [-webkit-overflow-scrolling:touch] sm:py-4 sm:pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-line">
                <div className="relative before:absolute before:bottom-2 before:left-[6px] before:top-2 before:w-px before:bg-line sm:before:left-[10px]">
                  <ExperienceArticle item={item} compact />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center sm:mt-5">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.05] px-2 py-1.5 dark:border-primary/35 dark:bg-primary/[0.08]"
          role="toolbar"
          aria-label="Navigation entre les expériences"
        >
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-base font-bold leading-none text-primary shadow-sm transition hover:border-primary/40 hover:bg-muted/50 disabled:pointer-events-none disabled:opacity-35 dark:border-line"
            aria-label="Expérience précédente"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
          >
            ‹
          </button>
          <div className="flex items-center gap-1.5 px-0.5">
            {items.map((item, i) => (
              <button
                key={`exp-dot-${i}`}
                type="button"
                className={`rounded-full transition-all ${
                  i === active ? "h-2 w-5 bg-primary" : "h-2 w-2 bg-line hover:bg-primary/45"
                }`}
                aria-label={`Afficher l’expérience ${i + 1} sur ${n}`}
                aria-pressed={i === active}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-base font-bold leading-none text-primary shadow-sm transition hover:border-primary/40 hover:bg-muted/50 disabled:pointer-events-none disabled:opacity-35 dark:border-line"
            aria-label="Expérience suivante"
            disabled={active === n - 1}
            onClick={() => goTo(active + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export function HomeTop() {
  return (
    <header className="border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="site-header-cap" aria-hidden>
        <div className="site-header-cap__main" />
        <div className="site-header-cap__accent" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-0">
          <div className="order-1 flex min-w-0 flex-col gap-5 lg:col-span-4 lg:border-r lg:border-line lg:pr-8">
            <div className="mx-auto w-full max-w-[240px] lg:mx-0 lg:max-w-none">
              <ProfilePhoto />
            </div>
            <div className="min-w-0 space-y-3 text-center lg:text-left">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">{site.location}</p>
              <h1 className="text-balance text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl lg:text-[1.6rem] xl:text-3xl lg:leading-tight">
                {site.name}
              </h1>
              <p className="mx-auto max-w-prose text-pretty text-sm font-medium leading-relaxed text-ink/80 sm:text-base lg:mx-0 lg:max-w-none lg:text-sm xl:text-base">
                {site.title}
              </p>
            </div>

            <nav
              className="mt-6 grid w-full grid-cols-2 gap-2 border-t border-line pt-6 sm:gap-3"
              aria-label="Navigation principale"
            >
              <a
                href={sitePath("/#portfolio")}
                className="flex min-h-[44px] w-full items-center justify-center rounded-card border-2 border-line bg-surface px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-primary shadow-card transition hover:border-primary/40 hover:shadow-card-hover sm:text-sm"
              >
                Portfolio
              </a>
              <a
                href={sitePath("/#motivations")}
                className="flex min-h-[44px] w-full items-center justify-center rounded-card border-2 border-line bg-surface px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-primary shadow-card transition hover:border-primary/40 hover:shadow-card-hover sm:text-sm"
              >
                Motivations
              </a>
              <a
                href={sitePath("/contact")}
                className="col-span-2 flex min-h-[44px] w-full items-center justify-center rounded-card border-2 border-primary bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-card transition hover:bg-primary/95 sm:text-sm"
              >
                Contact
              </a>
            </nav>
          </div>

          <div
            className="order-2 min-w-0 border-t border-line pt-6 lg:col-span-8 lg:border-t-0 lg:pt-0 lg:pl-2"
            id="experience"
          >
            <FadeIn>
              <div className="mb-6 flex flex-col gap-5 text-start sm:mb-8 sm:gap-6">
                <h2 className="text-balance text-2xl font-extrabold uppercase leading-[1.1] tracking-tight text-primary sm:text-3xl sm:leading-tight lg:text-[1.65rem] xl:text-4xl xl:leading-[1.08]">
                  {site.experienceHeadline}
                </h2>
                <div className="max-w-prose space-y-2">
                  {site.experienceSummary.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-pretty text-xs font-medium leading-relaxed text-ink/70 sm:text-sm"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-2 border-l-4 border-accent pl-3 pt-1 sm:mt-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/45">Parcours</p>
                  <h3 className="mt-2 text-balance text-lg font-extrabold uppercase tracking-wide text-primary sm:text-xl">
                    Expérience
                  </h3>
                </div>
              </div>
            </FadeIn>

            <ExperienceCarousel items={experience} />
          </div>
        </div>
      </div>
    </header>
  );
}
