"use client";

import { useState } from "react";
import { BackLink } from "./BackLink";
import { ImageLightbox } from "./ImageLightbox";
import { sitePath } from "@/lib/homeHref";
import { CategoryIcon } from "./CategoryIcon";
import { SiteFooter } from "./SiteFooter";
import type { CategoryDef, Project, ProjectVideo } from "@/lib/types";
import { youTubeEmbedSrc } from "@/lib/youtubeEmbed";
import {
  caseStudyContextBlock,
  caseStudyProcessBlock,
  caseStudyResultsBlock,
  caseStudySubtitle,
  projectArticleSectionTitles,
  projectPageHeading,
} from "@/lib/projectNarrative";

function ProjectVideoPlayer({ v, title }: { v: ProjectVideo; title: string }) {
  const embed = youTubeEmbedSrc(v.url);
  if (embed) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-black/10">
        <iframe
          title={title}
          src={embed}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <video className="aspect-video w-full" controls playsInline preload="metadata">
      <source src={v.url} />
    </video>
  );
}

type ProjectArticleProps = {
  project: Project;
  category: CategoryDef;
};

const PAGE_SHELL =
  "mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:max-w-[1300px] lg:px-8 xl:px-10";

function allProjectImageUrls(project: Project): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  if (project.coverUrl) {
    out.push(project.coverUrl);
    seen.add(project.coverUrl);
  }
  for (const u of project.imageUrls) {
    if (!seen.has(u)) {
      seen.add(u);
      out.push(u);
    }
  }
  return out;
}

const proseIntro =
  "text-pretty text-[1.05rem] font-normal leading-[1.78] text-ink/88 sm:text-lg sm:leading-[1.82]";
/** Partie 2 : pleine largeur du conteneur, mesure confortable pour lignes longues. */
const proseMainWide =
  "w-full max-w-none text-left text-pretty text-[1.0625rem] font-normal leading-[1.92] text-ink/92 sm:text-[1.125rem] sm:leading-[1.95]";
const proseImpact =
  "text-pretty text-[1.05rem] font-normal leading-[1.78] text-ink/85 sm:text-lg sm:leading-[1.82]";

const sectionHeadingClass =
  "mb-3 border-b border-line/70 pb-2 text-[10px] font-extrabold uppercase leading-snug tracking-[0.14em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.16em]";

/** Partie 1 — cadre type portrait : ratio vertical, image entière (object-contain). */
function IntroPortraitMedia({
  imageSrc,
  video,
  title,
  onOpenImage,
}: {
  imageSrc?: string;
  video?: ProjectVideo | null;
  title: string;
  onOpenImage?: (src: string) => void;
}) {
  if (imageSrc) {
    return (
      <figure className="mx-auto w-full max-w-[min(100%,400px)] lg:mx-0">
        <button
          type="button"
          className="group flex w-full min-h-[min(52vh,520px)] cursor-zoom-in items-center justify-center rounded-2xl border border-line/60 bg-muted/40 p-3 text-left shadow-sm ring-1 ring-black/[0.04] transition hover:border-primary/35 hover:ring-primary/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-4"
          onClick={() => onOpenImage?.(imageSrc)}
          aria-label={`Agrandir l’aperçu — ${title}`}
        >
          <img
            src={imageSrc}
            alt={`Aperçu — ${title}`}
            className="h-auto max-h-[min(68vh,600px)] w-full max-w-full object-contain transition group-hover:opacity-[0.97]"
            width={800}
            height={1200}
            loading="eager"
            decoding="async"
          />
        </button>
      </figure>
    );
  }

  if (video) {
    const yt = youTubeEmbedSrc(video.url);
    return (
      <figure className="mx-auto w-full max-w-[min(100%,560px)] lg:mx-0">
        <div className="overflow-hidden rounded-2xl border border-line/60 bg-black shadow-md ring-1 ring-black/10">
          <ProjectVideoPlayer v={video} title={`Vidéo — ${title}`} />
        </div>
        <figcaption className="mt-2 text-center text-xs font-medium text-ink/45">
          {yt ? "YouTube — format 16:9" : "Format 16:9 — lecture intégrée"}
        </figcaption>
      </figure>
    );
  }

  return null;
}

/** Partie 3 — deux visuels décalés, style « souvenirs », sans recadrage. */
function SouvenirImagePair({
  srcA,
  srcB,
  title,
  onOpenImage,
}: {
  srcA?: string;
  srcB?: string;
  title: string;
  onOpenImage?: (src: string) => void;
}) {
  const frame =
    "overflow-hidden rounded-lg border border-line/70 bg-surface p-1.5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06]";
  const clickable =
    "cursor-zoom-in transition hover:border-primary/40 hover:ring-primary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  if (srcA && !srcB) {
    return (
      <div className="mx-auto w-full max-w-[300px] lg:mx-0">
        <button
          type="button"
          className={`${frame} -rotate-2 block w-full ${clickable}`}
          onClick={() => onOpenImage?.(srcA)}
          aria-label={`Agrandir le visuel — ${title}`}
        >
          <img
            src={srcA}
            alt={`Visuel — ${title}`}
            className="pointer-events-none block h-auto w-full object-contain"
            style={{ maxHeight: "min(42vh, 360px)" }}
            width={600}
            height={800}
            loading="lazy"
            decoding="async"
          />
        </button>
      </div>
    );
  }

  if (!srcA && srcB) {
    return (
      <div className="mx-auto w-full max-w-[300px] lg:mx-0">
        <button
          type="button"
          className={`${frame} rotate-2 block w-full ${clickable}`}
          onClick={() => onOpenImage?.(srcB)}
          aria-label={`Agrandir le visuel — ${title}`}
        >
          <img
            src={srcB}
            alt=""
            className="pointer-events-none block h-auto w-full object-contain"
            style={{ maxHeight: "min(42vh, 360px)" }}
            width={600}
            height={800}
            loading="lazy"
            decoding="async"
          />
        </button>
      </div>
    );
  }

  if (!srcA && !srcB) return null;

  return (
    <div className="relative mx-auto h-[min(48vh,400px)] w-full max-w-[min(100%,400px)] sm:h-[min(50vh,440px)] lg:mx-0 lg:max-w-[420px]">
      <button
        type="button"
        className={`absolute left-0 top-1 w-[76%] ${frame} -rotate-[5deg] sm:-rotate-[4deg] ${clickable}`}
        style={{ transformOrigin: "center center" }}
        onClick={() => onOpenImage?.(srcA!)}
        aria-label={`Agrandir le visuel — ${title}`}
      >
        <img
          src={srcA}
          alt={`Visuel — ${title}`}
          className="pointer-events-none block h-auto w-full object-contain"
          style={{ maxHeight: "min(38vh, 300px)" }}
          width={560}
          height={720}
          loading="lazy"
          decoding="async"
        />
      </button>
      <button
        type="button"
        className={`absolute bottom-2 right-0 w-[70%] ${frame} translate-x-1 rotate-[6deg] sm:translate-x-2 sm:rotate-[5deg] ${clickable}`}
        style={{ transformOrigin: "center center" }}
        onClick={() => onOpenImage?.(srcB!)}
        aria-label="Agrandir le second visuel"
      >
        <img
          src={srcB!}
          alt=""
          className="pointer-events-none block h-auto w-full object-contain"
          style={{ maxHeight: "min(36vh, 280px)" }}
          width={520}
          height={680}
          loading="lazy"
          decoding="async"
        />
      </button>
    </div>
  );
}

export function ProjectArticle({ project, category }: ProjectArticleProps) {
  const { content } = project;
  const allImages = allProjectImageUrls(project);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (src: string) => {
    const i = allImages.indexOf(src);
    if (i >= 0) setLightboxIndex(i);
  };

  /** La 1re vidéo remplace la 1re image dans l’intro (gauche) ; les images sont décalées pour partie 3 + galerie. */
  const firstVideo = project.videos[0] ?? null;
  const videoReplacesIntroImage = Boolean(firstVideo);
  const introVideo = videoReplacesIntroImage ? firstVideo : null;
  const introImage = videoReplacesIntroImage ? undefined : allImages[0];
  const pairA = allImages[videoReplacesIntroImage ? 0 : 1];
  const pairB = allImages[videoReplacesIntroImage ? 1 : 2];
  const galleryImages = allImages.slice(videoReplacesIntroImage ? 2 : 3);

  const footerVideos = firstVideo ? project.videos.slice(1) : project.videos;

  const subtitle = caseStudySubtitle(project, category);
  const contextBlock = caseStudyContextBlock(project, category);
  const processBlock = caseStudyProcessBlock(project, category);
  const resultsBlock = caseStudyResultsBlock(project);

  const metaLine = [content.client?.trim(), content.year?.trim(), project.typeLabel].filter(Boolean).join(" · ");

  const hasIntroMedia = Boolean(introImage || introVideo);
  const hasPair = Boolean(pairA || pairB);
  const hasMediaFooter = footerVideos.length > 0 || project.exports.length > 0;

  return (
    <>
      {lightboxIndex !== null && allImages.length > 0 ? (
        <ImageLightbox
          urls={allImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          label={`Visuels — ${project.title}`}
        />
      ) : null}
      <article className="bg-surface">
        {/* En-tête : identité forte, sans image */}
        <header className="relative overflow-hidden border-b border-line/70 bg-gradient-to-br from-muted/90 via-surface to-primary/[0.07]">
          <div className="site-header-cap relative z-[1]" aria-hidden>
            <div className="site-header-cap__main" />
            <div className="site-header-cap__accent" />
          </div>
          <div
            className="absolute bottom-0 left-0 top-1 w-[3px] sm:w-1"
            style={{ backgroundColor: category.panelBgHex }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
            <div className="absolute -right-16 top-0 h-72 w-72 rounded-full bg-primary/[0.09] blur-3xl" />
            <div className="absolute bottom-0 left-[28%] h-48 w-48 rounded-full bg-accent/[0.08] blur-3xl" />
            <div
              className="absolute right-[12%] top-10 hidden h-px w-32 bg-gradient-to-r from-transparent via-line/50 to-transparent lg:block"
              aria-hidden
            />
            <div className="absolute right-10 top-16 hidden h-36 w-px bg-line/35 lg:block" aria-hidden />
            <div
              className="absolute bottom-12 right-24 hidden h-2 w-2 rotate-45 border border-primary/25 bg-primary/10 lg:block"
              aria-hidden
            />
          </div>

          <div className={`relative ${PAGE_SHELL} pb-12 pt-9 sm:pb-14 sm:pt-11 lg:pb-16 lg:pt-14`}>
            <BackLink href={sitePath(`/portfolio/${category.slug}`)} label={`Retour — ${category.shortTitle}`} />

            <div className="mt-8 w-full text-start">
              <div className="flex flex-wrap items-center gap-3 gap-y-2">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-surface/90 shadow-sm ring-1 ring-line/60"
                  style={{ color: category.panelBgHex }}
                >
                  <CategoryIcon categorySlug={category.slug} size={18} strokeWidth={2.25} className="block" />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-ink/40">
                  Projet · {category.shortTitle}
                </span>
              </div>

              <h1 className="mt-6 max-w-none text-balance text-[clamp(2rem,5vw,3.25rem)] font-black uppercase leading-[1.02] tracking-[0.06em] text-ink sm:tracking-[0.08em]">
                {projectPageHeading(project)}
              </h1>
              <div className="mt-5 h-px w-full max-w-[min(100%,20rem)] bg-gradient-to-r from-primary/55 via-accent/35 to-transparent" aria-hidden />
              <p className="mt-6 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-ink/72 sm:text-xl">
                {subtitle}
              </p>
              {metaLine ? (
                <p className="mt-4 text-sm font-semibold tracking-wide text-ink/48">{metaLine}</p>
              ) : null}
            </div>
          </div>
        </header>

        <div className={`${PAGE_SHELL} py-12 sm:py-14 lg:py-16`}>
          {/* ——— Partie 1 — Intro : visuel gauche / texte droite ——— */}
          <section
            className={`grid gap-10 lg:items-start ${hasIntroMedia ? "lg:grid-cols-12 lg:gap-12 xl:gap-14" : ""}`}
          >
            {hasIntroMedia ? (
              <>
                <div className="order-1 lg:order-1 lg:col-span-5 xl:col-span-5">
                  <IntroPortraitMedia
                    imageSrc={introImage}
                    video={introVideo}
                    title={project.title}
                    onOpenImage={openLightbox}
                  />
                </div>
                <div className="order-2 lg:order-2 lg:col-span-7 xl:col-span-7">
                  <h2 className={sectionHeadingClass}>{projectArticleSectionTitles.context}</h2>
                  <p className={`${proseIntro} whitespace-pre-line`}>{contextBlock}</p>
                </div>
              </>
            ) : (
              <div className="lg:col-span-12 lg:max-w-[min(100%,42rem)]">
                <h2 className={sectionHeadingClass}>{projectArticleSectionTitles.context}</h2>
                <p className={`${proseIntro} whitespace-pre-line`}>{contextBlock}</p>
              </div>
            )}
          </section>

          {/* ——— Partie 2 — Récit principal, texte seul ——— */}
          <section className="mt-14 border-t border-line/45 pt-12 sm:mt-16 sm:pt-14 lg:mt-20 lg:pt-16">
            <h2 className={sectionHeadingClass}>{projectArticleSectionTitles.process}</h2>
            <p className={`${proseMainWide} whitespace-pre-wrap`}>{processBlock}</p>
          </section>

          {/* ——— Partie 3 — Visuels groupe gauche / impact droite ——— */}
          <section className="mt-14 border-t border-line/45 pt-12 sm:mt-16 sm:pt-14 lg:mt-20 lg:pt-16">
            {hasPair ? (
              <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-14">
                <div className="order-1 lg:col-span-5">
                  <SouvenirImagePair
                    srcA={pairA}
                    srcB={pairB}
                    title={project.title}
                    onOpenImage={openLightbox}
                  />
                </div>
                <div className="order-2 flex flex-col items-start lg:col-span-7">
                  <h2 className={`${sectionHeadingClass} w-full max-w-[min(100%,40rem)]`}>
                    {projectArticleSectionTitles.results}
                  </h2>
                  <p className={`${proseImpact} max-w-[min(100%,40rem)]`}>{resultsBlock}</p>
                </div>
              </div>
            ) : (
              <div className="max-w-[min(100%,42rem)]">
                <h2 className={sectionHeadingClass}>{projectArticleSectionTitles.results}</h2>
                <p className={proseImpact}>{resultsBlock}</p>
              </div>
            )}
          </section>
        </div>

        {galleryImages.length > 0 ? (
          <div className="border-t border-line/60 bg-muted/20">
            <div className={`${PAGE_SHELL} py-11 sm:py-12`}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                Autres visuels
              </p>
              <div
                className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 pt-1 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch] sm:gap-4"
                role="region"
                aria-label="Galerie de miniatures — faire défiler horizontalement"
              >
                {galleryImages.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className="shrink-0 cursor-zoom-in rounded-lg border border-line/80 bg-surface p-1 shadow-sm ring-1 ring-black/[0.03] transition hover:border-primary/30 hover:ring-primary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    onClick={() => openLightbox(src)}
                    aria-label={`Agrandir la miniature ${i + 1} — ${project.title}`}
                  >
                    <img
                      src={src}
                      alt={i === 0 ? `Miniature — ${project.title}` : ""}
                      className="pointer-events-none block h-24 w-auto max-w-[180px] rounded-md object-contain sm:h-28 sm:max-w-[220px]"
                      width={220}
                      height={112}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {hasMediaFooter ? (
          <div className="border-t border-line/60 bg-muted/25">
            <div className={`${PAGE_SHELL} space-y-10 py-14`}>
              {footerVideos.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/40">Vidéo</p>
                  <div className={footerVideos.length > 1 ? "mt-4 grid gap-6 sm:grid-cols-2" : "mt-4 max-w-4xl"}>
                    {footerVideos.map((v) => (
                      <div
                        key={v.url}
                        className="overflow-hidden rounded-xl border border-line bg-black shadow-lg ring-1 ring-black/10"
                      >
                        <ProjectVideoPlayer v={v} title={`Vidéo — ${project.title}`} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {project.exports.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/40">À télécharger</p>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {project.exports.map((f) => (
                      <li key={f.url}>
                        <a
                          href={f.url}
                          className="inline-flex items-center rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition hover:border-primary/40 hover:bg-muted/50"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {f.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </article>

      <SiteFooter />
    </>
  );
}
