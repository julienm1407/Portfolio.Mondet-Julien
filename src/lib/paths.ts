/**
 * Build a URL-safe path for static files under /public.
 * Each segment after the first is encodeURIComponent'd.
 */
export function publicUrl(...segments: string[]): string {
  if (segments.length === 0) return "/";
  const [first, ...rest] = segments;
  const head = first.startsWith("/") ? first.slice(1) : first;
  const encoded = rest.map((s) => encodeURIComponent(s));
  return "/" + [head, ...encoded].join("/");
}
