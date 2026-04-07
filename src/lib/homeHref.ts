/** Racine du site pour les liens « accueil » (compatible `base` Astro / sous-dossier). */
export function getHomeHref(explicit?: string): string {
  if (typeof explicit === "string" && explicit.trim() !== "") return explicit.trim();
  const b = import.meta.env.BASE_URL;
  if (typeof b === "string" && b !== "") return b;
  return "/";
}
