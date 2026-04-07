import { skillCategories, skillsSectionMeta } from "@/content/site";
import { FadeIn } from "./FadeIn";

export function SkillsSection() {
  return (
    <section className="border-b border-line bg-muted" id="competences" aria-labelledby="competences-heading">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        <FadeIn>
          <div className="mb-10 flex flex-col gap-2 border-l-4 border-accent pl-4 text-start sm:mb-12">
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
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 0.06}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-card-hover">
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary/50 via-accent/60 to-primary/30" aria-hidden />
                <p className="pr-1 text-xs font-semibold leading-snug text-accent">{cat.differentiator}</p>
                <h3 className="mt-3 border-b border-line pb-3 text-sm font-extrabold uppercase tracking-wide text-primary">
                  {cat.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm font-normal leading-relaxed text-ink/85"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="min-w-0 text-pretty break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
