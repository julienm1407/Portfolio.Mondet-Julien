function baseWithSlash(): string {
  const b = import.meta.env.BASE_URL;
  if (typeof b === "string" && b.length > 0) {
    return b.endsWith("/") ? b : `${b}/`;
  }
  return "/";
}

/**
 * Chemin sur ce site avec préfixe `import.meta.env.BASE_URL` (ex. `/Portfolio.Mondet-Julien/…` sur GitHub Pages).
 */
export function sitePath(pathFromRoot: string): string {
  const base = baseWithSlash();
  const raw = pathFromRoot.startsWith("/") ? pathFromRoot.slice(1) : pathFromRoot;
  return `${base}${raw}`;
}

/** Racine du site pour les liens « accueil » (compatible `base` Astro / sous-dossier). */
export function getHomeHref(explicit?: string): string {
  if (typeof explicit === "string" && explicit.trim() !== "") return explicit.trim();
  return baseWithSlash();
}
