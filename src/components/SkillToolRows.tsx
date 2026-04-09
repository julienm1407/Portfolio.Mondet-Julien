import type { SkillLucideIcon, SkillToolEntry } from "@/content/site";
import type { LucideIcon } from "lucide-react";
import { Film, Sparkles, Terminal } from "lucide-react";

const LUCIDE_MAP: Record<SkillLucideIcon["icon"], LucideIcon> = {
  film: Film,
  sparkles: Sparkles,
  terminal: Terminal,
};

/** Version figée du paquet `simple-icons` (SVG sur jsDelivr). `cdn.simpleicons.org` renvoie souvent 404. */
const SIMPLE_ICONS_PKG = "11.6.0";

function SkillToolPill({ entry }: { entry: SkillToolEntry }) {
  if (entry.kind === "simpleIcon") {
    const src = `https://cdn.jsdelivr.net/npm/simple-icons@${SIMPLE_ICONS_PKG}/icons/${entry.slug}.svg`;
    return (
      <div className="flex flex-col items-center gap-1.5" title={entry.label}>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-2 shadow-sm ring-1 ring-line/50 dark:bg-white">
          <img
            src={src}
            alt=""
            width={28}
            height={28}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="max-h-7 max-w-[7rem] object-contain"
          />
        </span>
        <span className="max-w-[6rem] text-center text-[10px] font-semibold leading-tight text-ink/80">
          {entry.label}
        </span>
      </div>
    );
  }

  const Icon = LUCIDE_MAP[entry.icon];

  return (
    <div className="flex flex-col items-center gap-1.5" title={entry.label}>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 p-2 text-primary ring-1 ring-primary/25">
        <Icon className="h-6 w-6" strokeWidth={2} aria-hidden focusable="false" />
      </span>
      <span className="max-w-[6rem] text-center text-[10px] font-semibold leading-tight text-ink/80">
        {entry.label}
      </span>
    </div>
  );
}

type SkillToolRowsProps = {
  rows: SkillToolEntry[][];
  /** `panel` : espacements pour le bandeau sous les 4 cartes métier. */
  variant?: "default" | "panel";
};

export function SkillToolRows({ rows, variant = "default" }: SkillToolRowsProps) {
  const isPanel = variant === "panel";
  return (
    <div
      className={isPanel ? "mt-6 sm:mt-7" : "mt-4 space-y-0"}
      aria-label="Logiciels maîtrisés"
    >
      {rows.map((row, i) => (
        <div
          key={i}
          className={
            isPanel
              ? "flex flex-wrap items-end gap-x-6 gap-y-5 border-t border-line/35 py-5 first:border-t-0 first:pt-0 sm:gap-x-10 sm:py-6"
              : "flex flex-wrap gap-x-5 gap-y-5 border-b border-line/40 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:gap-x-7"
          }
        >
          {row.map((entry, j) => (
            <SkillToolPill key={`${entry.kind}-${entry.label}-${j}`} entry={entry} />
          ))}
        </div>
      ))}
    </div>
  );
}
