"use client";

import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/types";

type PortfolioCategoryGridProps = {
  projects: Project[];
  categorySlug: string;
  /** Couleur charte de la catégorie (bandeaux titres). */
  panelBgHex: string;
};

export function PortfolioCategoryGrid({
  projects,
  categorySlug,
  panelBgHex,
}: PortfolioCategoryGridProps) {
  return (
    <div className="grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {projects.map((p, i) => (
        <ProjectCard
          key={p.slug}
          project={p}
          href={`/portfolio/${categorySlug}/${p.slug}`}
          panelBgHex={panelBgHex}
          index={i}
        />
      ))}
    </div>
  );
}
