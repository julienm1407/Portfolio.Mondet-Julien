"use client";

import { motion } from "framer-motion";
import type { CategoryDef } from "@/lib/types";
import { CategoryIcon } from "./CategoryIcon";
import { CategoryPreviewTrio } from "./CategoryPreviewTrio";

type PortfolioCategoriesProps = {
  categories: CategoryDef[];
  carouselImages: Record<string, string[]>;
};

export function PortfolioCategories({ categories, carouselImages }: PortfolioCategoriesProps) {
  return (
    <section className="bg-surface" id="portfolio">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
        <div className="mb-8 flex flex-col gap-2 border-l-4 border-accent pl-4 text-start sm:mb-9">
          <h2 className="text-balance text-2xl font-extrabold uppercase tracking-wide text-primary sm:text-3xl">
            Portfolio
          </h2>
          <p className="max-w-prose text-pretty text-sm font-medium leading-relaxed text-ink/60">
            Une sélection de projets, entre création, stratégie et analyse.
          </p>
        </div>
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const strip = carouselImages[cat.id] ?? [];
            return (
              <motion.div
                key={cat.id}
                className="h-full min-h-0"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-32px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <a
                  href={`/portfolio/${cat.slug}`}
                  className="group flex h-[19rem] min-h-[19rem] max-h-[19rem] w-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div
                    className="flex h-[8.125rem] shrink-0 flex-col justify-start gap-1.5 px-3 pb-2 pt-3 text-start sm:px-4 sm:pt-3.5"
                    style={{ backgroundColor: cat.panelBgHex }}
                  >
                    <div className="flex items-start gap-2 sm:gap-2.5">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/20 text-white ring-1 ring-white/30 sm:h-9 sm:w-9"
                        aria-hidden
                      >
                        <CategoryIcon categorySlug={cat.slug} size={18} className="text-white" strokeWidth={2.25} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-balance text-lg font-extrabold uppercase leading-tight tracking-tight text-white sm:text-xl">
                          {cat.shortTitle}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-pretty text-[11px] font-medium leading-snug text-white/90 sm:line-clamp-3 sm:text-xs">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex h-[8.375rem] shrink-0 flex-col justify-start border-t border-line bg-muted/70 px-3 pb-1.5 pt-1.5 sm:px-3.5">
                    <p className="mb-0.5 text-[8px] font-extrabold uppercase tracking-[0.14em] text-ink/45">
                      Sélection visuelle
                    </p>
                    <CategoryPreviewTrio images={strip} categoryLabel={cat.shortTitle} />
                  </div>

                  <div className="flex h-10 shrink-0 items-center border-t border-line bg-surface px-3 sm:px-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent transition group-hover:text-primary sm:text-[11px]">
                      Voir les projets →
                    </span>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
