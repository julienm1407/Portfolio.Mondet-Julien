type Item = { href: string; label: string };

type ProjectOnThisPageProps = {
  items: Item[];
  /** Libellés plus doux, moins « manuel technique » (ex. page article). */
  tone?: "default" | "welcoming";
};

export function ProjectOnThisPage({ items, tone = "default" }: ProjectOnThisPageProps) {
  if (items.length === 0) return null;

  if (tone === "welcoming") {
    return (
      <nav
        aria-label="Repères sur la page"
        className="rounded-xl border border-line/80 bg-muted/40 px-4 py-4 sm:px-5 sm:py-4"
      >
        <p className="text-sm font-medium text-ink/70">Vous cherchez quelque chose en particulier ?</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {items.map((it) => (
            <li key={it.href}>
              <a
                className="inline-flex items-center rounded-lg bg-surface px-3 py-2 text-sm font-medium text-primary shadow-sm ring-1 ring-line/80 transition hover:bg-primary/5 hover:ring-primary/25"
                href={it.href}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Sur cette page" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="shrink-0 text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink/40">Sur cette page</p>
      <ul className="flex flex-wrap gap-2">
        {items.map((it) => (
          <li key={it.href}>
            <a
              className="inline-flex items-center rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-primary shadow-sm transition hover:border-primary/40 hover:bg-muted/80 hover:text-accent"
              href={it.href}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
