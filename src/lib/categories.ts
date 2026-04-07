import type { CategoryDef } from "./types";

export const CATEGORIES: CategoryDef[] = [
  {
    id: "01_social_media",
    slug: "social-media",
    title: "Social Media",
    shortTitle: "Social Media",
    description: "Campagnes, contenus éditoriaux et formats social ads.",
    panelBgHex: "#1E3A8A",
  },
  {
    id: "02_data_analyse",
    slug: "data-analyse",
    title: "Data & Analyse",
    shortTitle: "Data & Analyse",
    description: "Tableaux de bord, analyses emailing et réseaux sociaux.",
    panelBgHex: "#1E40AF",
  },
  {
    id: "03_communication_supports",
    slug: "supports",
    title: "Supports de communication",
    shortTitle: "Supports",
    description: "Maquettes, rédaction et supports digitaux.",
    panelBgHex: "#1D4ED8",
  },
  {
    id: "04_gestion_projet_event",
    slug: "gestion-projet",
    title: "Gestion de projet & événementiel",
    shortTitle: "Gestion de projet",
    description: "Coordination, événements et mise en œuvre opérationnelle.",
    panelBgHex: "#C2410C",
  },
  {
    id: "05_projets_creatifs",
    slug: "projets-creatifs",
    title: "Projets créatifs",
    shortTitle: "Projets créatifs",
    description: "Expérimentations graphiques et formats originaux.",
    panelBgHex: "#F97316",
  },
];

export function getCategoryBySlug(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
