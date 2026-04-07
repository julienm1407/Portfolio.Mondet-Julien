type ArticleFigureProps = {
  src: string;
  index: number;
  caption?: string;
  priority?: boolean;
  figureId?: string;
  accentHex?: string;
  className?: string;
  /** Vignette d’illustration (couverture discrète). */
  variant?: "standard" | "thumb";
  /** Image en recouvrement type portrait (collage). */
  imageClassName?: string;
  /** Masquer la bande couleur (incrustations serrées). */
  hideAccent?: boolean;
  fit?: "contain" | "cover";
  /** Moins de padding — suite d’images dans le même esprit, pas des « cartes » isolées. */
  dense?: boolean;
};

export function ArticleFigure({
  src,
  index,
  caption,
  priority,
  figureId,
  accentHex,
  className = "",
  variant = "standard",
  imageClassName = "",
  hideAccent = false,
  fit = "contain",
  dense = false,
}: ArticleFigureProps) {
  const anchor = figureId ?? `visuel-${index + 1}`;
  const isThumb = variant === "thumb";

  return (
    <figure id={anchor} className={`scroll-mt-28 ${className}`}>
      <div
        className={
          isThumb
            ? "overflow-hidden rounded-lg border border-line bg-surface shadow-card ring-1 ring-black/[0.04] dark:ring-white/10"
            : "overflow-hidden rounded-card border border-line bg-surface shadow-card ring-1 ring-black/[0.04] dark:ring-white/10"
        }
      >
        {accentHex && !hideAccent ? (
          <div className="h-1 w-full shrink-0" style={{ backgroundColor: accentHex }} aria-hidden />
        ) : null}
        <div className={isThumb ? "p-1.5" : dense ? "p-1 sm:p-1.5" : "p-2 sm:p-3"}>
          <img
            src={src}
            alt={caption ? `Illustration — ${caption}` : `Illustration ${index + 1}`}
            className={
              isThumb
                ? `mx-auto block aspect-[4/3] h-auto w-full rounded-md bg-muted/30 object-cover object-center ${imageClassName}`
                : `mx-auto block h-auto w-full rounded-md bg-muted/30 ${fit === "cover" ? "object-cover object-center" : "object-contain"} max-h-[min(72vh,720px)] ${imageClassName}`
            }
            decoding="async"
            loading={priority ? "eager" : "lazy"}
          />
        </div>
      </div>
      {caption ? (
        <figcaption
          className={
            isThumb
              ? "mt-1.5 text-center text-[10px] font-medium text-ink/45"
              : "mt-2.5 text-pretty text-center text-[11px] font-medium leading-snug text-ink/50 sm:text-xs"
          }
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
