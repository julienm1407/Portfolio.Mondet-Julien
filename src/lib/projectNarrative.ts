import type { CategoryDef, Project } from "./types";

/** Libellés communs aux trois blocs de prose des pages projet (contenu = par JSON). */
export const projectArticleSectionTitles = {
  context: "Contexte",
  process: "Mise en œuvre",
  results: "Résultats",
} as const;

/** Titre affiché (court si `shortTitle` renseigné dans le JSON). */
export function projectPageHeading(project: Project): string {
  return project.content.shortTitle?.trim() || project.title;
}

function hintFromSlug(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes("linkedin")) {
    return "Contenus pensés pour un lectorat professionnel : accroches, carrousels et messages alignés avec la ligne éditoriale.";
  }
  if (s.includes("campagne") || s.includes("multi")) {
    return "Campagne déclinée sur plusieurs leviers avec une cohérence visuelle et éditoriale entre les plateformes.";
  }
  if (s.includes("motion")) {
    return "Travail sur des formats courts et dynamiques adaptés aux usages du scroll et de la lecture mobile.";
  }
  if (s.includes("reportage") || s.includes("video")) {
    return "Mise en forme de contenus vidéo / reportage pour renforcer la preuve et la narration du projet.";
  }
  if (s.includes("web_serie") || s.includes("web-serie")) {
    return "Web-série narrative : co-réalisation, cadrage, jeu d’acteur et storytelling pensé sur plusieurs épisodes.";
  }
  if (s.includes("creation_graphique") || s.includes("graphique_perso")) {
    return "Pratique personnelle : design, image et expérimentation visuelle en dehors des missions encadrées.";
  }
  if (s.includes("email") || s.includes("mailing")) {
    return "Analyse et optimisation des campagnes d’emailing (délivrabilité, contenus, parcours).";
  }
  if (s.includes("dashboard")) {
    return "Tableau de bord de pilotage : structuration des données, indicateurs clés et visualisations pour l’aide à la décision.";
  }
  if (s.includes("analyse") || s.includes("rs")) {
    return "Lecture des données et des indicateurs pour prioriser les actions et documenter les constats.";
  }
  if (s.includes("maquette") || s.includes("site")) {
    return "Supports de conception et de validation pour structurer l’information et l’expérience utilisateur.";
  }
  if (s.includes("redaction") || s.includes("contenu")) {
    return "Rédaction et adaptation des messages selon le canal (email, web, réseaux sociaux).";
  }
  if (s.includes("print")) {
    return "Supports print : dépliants et communication papier, lisibilité et hiérarchie de l’information.";
  }
  if (s.includes("gestion_projet")) {
    return "Planning éditorial, outils collaboratifs (Trello) et coordination des actions de communication.";
  }
  if (s.includes("reaco")) {
    return "Projets type Réaco : problématique, offre, positionnement et supports de communication en logique entrepreneuriale.";
  }
  if (s.includes("appel_offre") || s.includes("reponse_appel")) {
    return "Mémoire technique et stratégie de communication pour répondre à un appel d’offre institutionnel ou territorial.";
  }
  if (s.includes("organisation_evenement")) {
    return "Organisation et valorisation d’événements : coordination terrain, contenus et communication auprès des publics.";
  }
  if (s.includes("evenement") || s.includes("organisation")) {
    return "Coordination opérationnelle et supports de communication autour d’un événement ou d’un dispositif terrain.";
  }
  return "Sélection de visuels représentatifs du périmètre et des livrables produits.";
}

/** Phrase courte si le JSON ne fournit pas de contexte dédié. */
export function articleContext(project: Project, category: CategoryDef): string {
  const c = project.content;
  if (c.context?.trim()) return c.context.trim();
  const bits: string[] = [];
  if (c.client?.trim()) bits.push(`Intervention pour ${c.client.trim()}`);
  if (c.year?.trim()) bits.push(c.year.trim());
  bits.push(`${category.shortTitle} — ${hintFromSlug(project.slug)}`);
  return bits.join(" — ");
}

export function articleLead(project: Project, category: CategoryDef): string {
  const c = project.content;
  if (c.summary?.trim()) return c.summary.trim();
  if (c.description?.trim()) {
    const d = c.description.trim();
    if (d.length <= 420) return d;
    return `${d.slice(0, 417).trim()}…`;
  }
  if (c.objective?.trim()) {
    return `${c.objective.trim()} Ce volet « ${category.shortTitle.toLowerCase()} » illustre concrètement la mission et les formats utilisés.`;
  }
  return `Ce cas illustre « ${project.title} » (${category.shortTitle.toLowerCase()}). ${hintFromSlug(project.slug)}`;
}

export function visuelsSectionIntro(project: Project): string {
  const c = project.content;
  if (c.visuelsIntro?.trim()) return c.visuelsIntro.trim();
  return "Visuels au format d’origine — captures, exports ou maquettes, sans recadrage imposé.";
}

export function visuelsSectionOutro(project: Project): string {
  const c = project.content;
  if (c.visuelsOutro?.trim()) return c.visuelsOutro.trim();
  return "";
}

/** Une phrase d’accroche sous le titre (page case study). */
export function caseStudySubtitle(project: Project, category: CategoryDef): string {
  const s = project.content.summary?.trim();
  if (s) {
    const m = s.match(/^[^.!?]+[.!?]?/);
    const first = (m?.[0] ?? s).trim();
    if (first.length <= 200) return first.endsWith(".") || first.endsWith("!") || first.endsWith("?") ? first : `${first}.`;
    return s.length <= 200 ? s : `${s.slice(0, 197).trim()}…`;
  }
  const client = project.content.client?.trim();
  const year = project.content.year?.trim();
  const bits = [client ? `Mission pour ${client}` : null, project.typeLabel || category.shortTitle, year].filter(
    Boolean,
  ) as string[];
  if (bits.length === 0) return `${category.shortTitle} — livrables et mise en œuvre.`;
  return `${bits.join(" · ")}.`;
}

/** Contexte + problème + objectif : un seul bloc (5–6 lignes max côté contenu). */
export function caseStudyContextBlock(project: Project, category: CategoryDef): string {
  const c = project.content;
  const chunks: string[] = [];
  const ctx = (c.context?.trim() || articleContext(project, category)).trim();
  if (ctx) chunks.push(ctx);
  if (c.objective?.trim()) {
    chunks.push(`L’objectif : ${c.objective.trim()}`);
  }
  let text = chunks.join("\n\n");
  if (!text.trim()) {
    text = `Ce projet s’inscrit dans « ${category.shortTitle} ». ${hintFromSlug(project.slug)}`;
  }
  if (text.length > 720) text = `${text.slice(0, 717).trim()}…`;
  return text;
}

function weaveActionsAsProse(actions: string[]): string {
  const cleaned = actions.map((a) => a.trim().replace(/\.$/, ""));
  if (cleaned.length === 1) return `${cleaned[0]}.`;
  if (cleaned.length === 2) return `${cleaned[0]} ; ${cleaned[1]}.`;
  const last = cleaned.pop()!;
  return `${cleaned.join(", ")}, puis ${last}.`;
}

/** Récit principal : description + actions tissées en prose, sans puces. */
export function caseStudyProcessBlock(project: Project, category: CategoryDef): string {
  const c = project.content;
  const desc = c.description?.trim() ?? "";
  const actions = c.actions?.filter(Boolean) ?? [];
  const woven = actions.length > 0 ? weaveActionsAsProse(actions) : "";

  let text: string;
  if (desc && woven) {
    const d = desc.replace(/\s+$/, "");
    const joiner = /[.!?]$/.test(d) ? " " : ". ";
    text = `${d}${joiner}${woven}`;
  } else if (desc) {
    text = desc;
  } else if (woven) {
    text = woven;
  } else {
    text = `Sur « ${project.title} », la mission relevait de ${category.shortTitle.toLowerCase()}. ${hintFromSlug(project.slug)} L’accent a été mis sur une exécution soignée et des livrables alignés avec le contexte et les contraintes du terrain.`;
  }

  if (text.length > 1400) text = `${text.slice(0, 1397).trim()}…`;
  return text;
}

/** Résultat / impact : court. */
export function caseStudyResultsBlock(project: Project): string {
  const r = project.content.results?.trim();
  if (r) return r.length > 520 ? `${r.slice(0, 517).trim()}…` : r;
  return `Au final, les livrables posent une base claire — visuels, messages et supports — qu’on peut faire vivre ou faire évoluer selon la suite du dispositif.`;
}

export function recruiterHighlights(project: Project): string[] {
  const c = project.content;
  if (c.highlights && c.highlights.length > 0) return c.highlights.slice(0, 4);
  const out: string[] = [];
  if (c.objective?.trim()) {
    out.push(`Objectif : ${c.objective.trim().length > 140 ? `${c.objective.trim().slice(0, 137)}…` : c.objective.trim()}`);
  }
  if (c.actions?.length) {
    c.actions.slice(0, 3).forEach((a) => out.push(a));
  }
  if (c.results?.trim()) {
    out.push(`Résultat : ${c.results.trim().length > 120 ? `${c.results.trim().slice(0, 117)}…` : c.results.trim()}`);
  }
  if (out.length === 0) {
    out.push(`Mission : ${project.title}`);
    out.push(`Famille de compétences : ${project.typeLabel}`);
    if (project.imageUrls.length > 0) out.push(`${project.imageUrls.length} visuel(s) documenté(s) dans ce dossier.`);
  }
  return out.slice(0, 4);
}
