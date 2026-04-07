type BackLinkProps = {
  href: string;
  label: string;
  /** Liens sur fond sombre (pages éditoriales). */
  variant?: "default" | "inverse";
  className?: string;
};

export function BackLink({ href, label, variant = "default", className = "" }: BackLinkProps) {
  const cls =
    variant === "inverse"
      ? "text-white/80 hover:text-white"
      : "text-primary hover:text-accent";
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${cls} ${className}`.trim()}
    >
      <span aria-hidden>←</span>
      {label}
    </a>
  );
}
