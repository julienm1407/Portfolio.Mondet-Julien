type CategoryPreviewTrioProps = {
  images: string[];
  categoryLabel: string;
};

const MAX = 3;

/**
 * Trois aperçus max, présentés en éventail (pile de cadres) — plus lisible qu’un carrousel,
 * donne envie d’ouvrir la catégorie. Pas de défilement auto.
 */
export function CategoryPreviewTrio({ images, categoryLabel }: CategoryPreviewTrioProps) {
  const trio = images.slice(0, MAX);

  if (trio.length === 0) {
    return (
      <div
        className="flex h-[4.5rem] items-center justify-center rounded-md border border-dashed border-line/80 bg-surface/90 px-2 text-center text-[8px] font-semibold uppercase tracking-wide text-ink/40"
        aria-label={`Aucun visuel pour ${categoryLabel}`}
      >
        Aperçus à venir
      </div>
    );
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[12.5rem]"
      aria-label={`Trois aperçus visuels : ${categoryLabel}`}
    >
      <div className="relative mx-auto h-[5rem] transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:drop-shadow-sm">
        {trio.length === 1 ? (
          <div className="absolute left-1/2 top-1/2 z-[2] w-[58%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border-2 border-surface bg-surface shadow-md ring-1 ring-black/5 dark:ring-white/10">
            <img
              src={trio[0]}
              alt=""
              width={120}
              height={90}
              className="aspect-[4/3] h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>
        ) : trio.length === 2 ? (
          <>
            <div className="absolute left-[6%] top-1/2 z-[1] w-[46%] -translate-y-1/2 -rotate-6 overflow-hidden rounded-lg border-2 border-surface bg-surface shadow-md ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-rotate-7">
              <img
                src={trio[0]}
                alt=""
                width={96}
                height={72}
                className="aspect-[4/3] h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
            <div className="absolute right-[6%] top-1/2 z-[2] w-[50%] -translate-y-1/2 rotate-6 overflow-hidden rounded-lg border-2 border-surface bg-surface shadow-md ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-7">
              <img
                src={trio[1]}
                alt=""
                width={104}
                height={78}
                className="aspect-[4/3] h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          </>
        ) : (
          <>
            <div className="absolute left-0 top-[52%] z-[1] w-[40%] -translate-y-1/2 -rotate-[10deg] overflow-hidden rounded-lg border-2 border-surface bg-surface shadow-md ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-rotate-[12deg]">
              <img
                src={trio[0]}
                alt=""
                width={88}
                height={66}
                className="aspect-[4/3] h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
            <div className="absolute left-1/2 top-1/2 z-[3] w-[46%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border-2 border-surface bg-surface shadow-lg ring-1 ring-black/8 dark:ring-white/10 transition-transform duration-300 group-hover:-translate-y-[52%]">
              <img
                src={trio[1]}
                alt=""
                width={100}
                height={75}
                className="aspect-[4/3] h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
            <div className="absolute right-0 top-[52%] z-[2] w-[40%] -translate-y-1/2 rotate-[10deg] overflow-hidden rounded-lg border-2 border-surface bg-surface shadow-md ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[12deg]">
              <img
                src={trio[2]}
                alt=""
                width={88}
                height={66}
                className="aspect-[4/3] h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          </>
        )}
      </div>
      <p className="mt-1 text-center text-[8px] font-semibold uppercase tracking-[0.1em] text-ink/35 transition-colors group-hover:text-accent">
        {(() => {
          const n = trio.length;
          const more = images.length - n;
          if (more > 0) return `3 extraits · +${more} dans la catégorie`;
          if (n === 3) return "3 extraits sélectionnés";
          if (n === 2) return "2 extraits";
          return "1 extrait";
        })()}
      </p>
    </div>
  );
}
