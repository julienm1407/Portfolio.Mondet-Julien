import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { BarChart3, FolderKanban, LayoutTemplate, Share2, Sparkles } from "lucide-react";

/**
 * Icônes [Lucide](https://lucide.dev) — licence ISC, usage libre (pas d’attribution obligatoire).
 * Une icône par slug de catégorie portfolio.
 */
const ICONS: Record<string, ComponentType<LucideProps>> = {
  "social-media": Share2,
  "data-analyse": BarChart3,
  "supports": LayoutTemplate,
  "gestion-projet": FolderKanban,
  "projets-creatifs": Sparkles,
};

type CategoryIconProps = {
  categorySlug: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
};

export function CategoryIcon({
  categorySlug,
  className = "",
  size = 22,
  strokeWidth = 2,
}: CategoryIconProps) {
  const Icon = ICONS[categorySlug] ?? LayoutTemplate;
  return <Icon className={className} size={size} strokeWidth={strokeWidth} aria-hidden focusable="false" />;
}
