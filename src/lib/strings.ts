export function humanizeSlug(slug: string): string {
  const spaced = slug.replace(/_/g, " ").trim();
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase());
}
