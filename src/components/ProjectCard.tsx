"use client";

import { motion } from "framer-motion";
import { projectPageHeading } from "@/lib/projectNarrative";
import type { Project } from "@/lib/types";

const FALLBACK_PANEL = "#1E3A8A";

type ProjectCardProps = {
  project: Project;
  href: string;
  /** Couleur du bandeau — alignée sur `panelBgHex` de la catégorie (DA home). */
  panelBgHex: string;
  index?: number;
};

export function ProjectCard({ project, href, panelBgHex, index = 0 }: ProjectCardProps) {
  const bg = panelBgHex?.trim() || FALLBACK_PANEL;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.42, delay: index * 0.05 }}
      className="h-full min-h-0"
    >
      <a
        href={href}
        className="group flex h-[20rem] min-h-[20rem] max-h-[20rem] w-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
      >
        {/* Bandeau titre — même logique que les encarts d’accueil */}
        <div
          className="flex min-h-[6.75rem] shrink-0 flex-col justify-end gap-1.5 px-3 pb-2.5 pt-4 text-start sm:min-h-[7rem] sm:px-4 sm:pb-3"
          style={{ backgroundColor: bg }}
        >
          <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/75 sm:text-[10px]">
            {project.typeLabel}
          </p>
          <h3 className="line-clamp-3 text-balance text-lg font-extrabold uppercase leading-[1.15] tracking-tight text-white sm:text-xl sm:leading-tight">
            {projectPageHeading(project)}
          </h3>
        </div>

        {/* Aperçu visuel */}
        <div className="relative min-h-0 flex-1 border-t border-white/25 bg-muted/80">
          {project.coverUrl ? (
            <img
              src={project.coverUrl}
              alt=""
              width={640}
              height={400}
              className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex h-full min-h-[6.5rem] items-center justify-center bg-gradient-to-b from-line/20 to-muted">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/30">Aperçu</span>
            </div>
          )}
        </div>

        <div className="flex h-10 shrink-0 items-center border-t border-line bg-surface px-3 sm:px-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent transition group-hover:text-primary sm:text-[11px]">
            Ouvrir le dossier →
          </span>
        </div>
      </a>
    </motion.div>
  );
}
