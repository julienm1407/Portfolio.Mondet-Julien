import { skillCategories, skillsSectionMeta } from "@/content/site";
import type { SkillCategory } from "@/content/site";
import { FadeIn } from "./FadeIn";
import { SkillToolRows } from "./SkillToolRows";

function SkillPillarCard({ cat }: { cat: SkillCategory }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-card border border-line bg-surface p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-card-hover sm:p-6">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary/50 via-accent/60 to-primary/30" aria-hidden />
      <p className="pr-1 text-xs font-semibold leading-snug text-accent">{cat.differentiator}</p>
      <h3 className="mt-3 border-b border-line pb-3 text-sm font-extrabold uppercase tracking-wide text-primary">
        {cat.title}
      </h3>
      <ul className="mt-4 flex-1 space-y-2.5">
        {cat.items.map((item) => (
          <li key={item} className="flex gap-2 text-sm font-normal leading-relaxed text-ink/85">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="min-w-0 text-pretty break-words">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SkillsSection() {
  const pillarCategories = skillCategories.filter((c) => !c.toolRows?.length);
  const toolCategories = skillCategories.filter((c) => c.toolRows?.length);

  return (
    <section className="border-b border-line bg-muted" id="competences" aria-labelledby="competences-heading">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        <FadeIn>
          <div className="mb-9 flex flex-col gap-2 border-l-4 border-accent pl-4 text-start sm:mb-11">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/50">{skillsSectionMeta.eyebrow}</p>
            <h2
              id="competences-heading"
              className="text-balance text-2xl font-extrabold uppercase tracking-wide text-primary sm:text-3xl"
            >
              Compétences
            </h2>
            <p className="max-w-prose text-pretty text-sm font-semibold leading-relaxed text-primary/90 sm:text-[0.9375rem]">
              {skillsSectionMeta.signature}
            </p>
          </div>
        </FadeIn>

        {/* 4 domaines — grille 2×2 puis 4 colonnes : hauteur homogène visuelle */}
        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-6">
          {pillarCategories.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 0.05}>
              <SkillPillarCard cat={cat} />
            </FadeIn>
          ))}
        </div>

        {/* Stack logicielle — bloc séparé, pleine largeur */}
        {toolCategories.map((tools, ti) =>
          tools.toolRows?.length ? (
            <FadeIn key={tools.title} delay={0.22 + ti * 0.06}>
              <div className="mt-10 lg:mt-12">
                <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card ring-1 ring-black/[0.03] dark:ring-white/5">
                  <div
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent via-primary/70 to-primary/30"
                    aria-hidden
                  />
                  <div className="relative px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
                    <div className="flex flex-col gap-3 border-b border-line/60 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pb-6">
                      <div className="min-w-0">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/45">En pratique</p>
                        <h3 className="mt-2 text-balance text-lg font-extrabold uppercase tracking-wide text-primary sm:text-xl">
                          {tools.title}
                        </h3>
                      </div>
                      <p className="max-w-md text-pretty text-xs font-medium leading-relaxed text-ink/65 sm:text-right sm:text-sm">
                        {tools.differentiator}
                      </p>
                    </div>
                    <SkillToolRows rows={tools.toolRows} variant="panel" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ) : null,
        )}
      </div>
    </section>
  );
}
