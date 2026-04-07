/** Numéro affiché type « 06 76 27 94 79 » → `tel:+33676279479` pour les liens. */
export function phoneDisplayToTelHref(display: string | undefined | null): string | null {
  const raw = display?.trim() ?? "";
  if (!raw) return null;
  const digits = raw.replace(/\s/g, "");
  if (digits.length === 10 && digits.startsWith("0")) return `tel:+33${digits.slice(1)}`;
  if (/^\d{6,}$/.test(digits)) return `tel:+${digits}`;
  return null;
}
