import fs from "fs";
import path from "path";
import { CATEGORIES } from "./categories";
import { humanizeSlug } from "./strings";
import type {
  Project,
  ProjectContent,
  ProjectExport,
  ProjectVideo,
} from "./types";

const ROOT = process.cwd();
const PUBLIC_PROJECTS = path.join(ROOT, "public", "projects");
const ALLOWED_CATEGORY_IDS = new Set(CATEGORIES.map((c) => c.id));

/**
 * Dossier d’une catégorie sur disque : d’abord la racine du repo (01_social_media, etc.), puis public/projects.
 * La racine en premier évite les dossiers vides ou copies partielles sous public/ qui masquaient les vrais médias.
 */
export function getCategoryBasePath(categoryId: string): string | null {
  if (!ALLOWED_CATEGORY_IDS.has(categoryId)) return null;
  const atRoot = path.join(ROOT, categoryId);
  try {
    if (fs.existsSync(atRoot) && fs.statSync(atRoot).isDirectory()) {
      return path.resolve(atRoot);
    }
  } catch {
    /* */
  }
  const pub = path.join(PUBLIC_PROJECTS, categoryId);
  try {
    if (fs.existsSync(pub) && fs.statSync(pub).isDirectory()) {
      return path.resolve(pub);
    }
  } catch {
    /* */
  }
  return null;
}

/**
 * Segments d’URL alignés sur les noms stockés dans Git / servis par GitHub Pages (UTF-8, souvent NFC).
 * Sans ça, macOS peut donner des noms en NFD via readdir → encodage URL différent → 404 en production.
 */
function segmentForProjectUrl(segment: string): string {
  return segment.normalize("NFC");
}

/** Fichiers servis en statique via public/projects/* (symlinks → dossiers 01_* à la racine). */
function projectMediaUrl(categoryId: string, projectSlug: string, relative: string): string {
  const fileParts = relative.split(/[/\\]/).filter((p) => p && p !== "." && p !== "..");
  const segs = [categoryId, projectSlug, ...fileParts].map(segmentForProjectUrl);
  const pathSegs = segs.map((s) => encodeURIComponent(s)).join("/");
  const base = typeof import.meta.env.BASE_URL === "string" ? import.meta.env.BASE_URL : "/";
  const norm = base.endsWith("/") ? base : `${base}/`;
  return `${norm}projects/${pathSegs}`;
}

const IMAGE_RE = /\.(jpe?g|png|webp|gif)$/i;
const VIDEO_RE = /\.(mp4|webm|mov)$/i;
const EXPORT_RE = /\.(pdf|pptx?|key|zip|docx?|xlsx?|csv)$/i;

function walkImageFiles(dir: string, baseDir: string, acc: string[] = []): string[] {
  try {
    if (!fs.existsSync(dir)) return acc;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith(".")) continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walkImageFiles(full, baseDir, acc);
      } else if (IMAGE_RE.test(e.name)) {
        acc.push(path.relative(baseDir, full).split(path.sep).join("/"));
      }
    }
  } catch {
    /* lien symbolique cassé, droits, etc. */
  }
  return acc;
}

function collectImageRelatives(projectPath: string): string[] {
  const all = walkImageFiles(projectPath, projectPath);
  const filtered = all.filter((r) => {
    const norm = r.replace(/\\/g, "/");
    const lower = norm.toLowerCase();
    if (lower.includes("/exports/")) return false;
    if (lower.includes("/videos/")) return false;
    if (lower === "cover.jpg" || lower === "cover.jpeg" || lower === "cover.png") return false;
    return true;
  });

  const inVisuels: string[] = [];
  const other: string[] = [];
  for (const r of filtered) {
    const norm = r.replace(/\\/g, "/");
    if (norm.startsWith("visuels/")) inVisuels.push(r);
    else other.push(r);
  }
  inVisuels.sort();
  other.sort();
  return [...inVisuels, ...other];
}

function readContent(projectPath: string): ProjectContent {
  const contentPath = path.join(projectPath, "content.json");
  if (!fs.existsSync(contentPath)) return {};
  try {
    const raw = fs.readFileSync(contentPath, "utf-8");
    return JSON.parse(raw) as ProjectContent;
  } catch {
    return {};
  }
}

function listVideos(projectPath: string, categoryId: string, projectSlug: string): ProjectVideo[] {
  const videosDir = path.join(projectPath, "videos");
  if (!fs.existsSync(videosDir)) return [];
  return fs
    .readdirSync(videosDir, { withFileTypes: true })
    .filter((e) => e.isFile() && VIDEO_RE.test(e.name))
    .map((e) => {
      const rel = `videos/${e.name}`;
      return { relativePath: rel, url: projectMediaUrl(categoryId, projectSlug, rel) };
    });
}

function listExports(projectPath: string, categoryId: string, projectSlug: string): ProjectExport[] {
  const exportsDir = path.join(projectPath, "exports");
  if (!fs.existsSync(exportsDir)) return [];
  return fs
    .readdirSync(exportsDir, { withFileTypes: true })
    .filter((e) => e.isFile() && !e.name.startsWith(".") && EXPORT_RE.test(e.name))
    .map((e) => ({
      name: e.name,
      url: projectMediaUrl(categoryId, projectSlug, `exports/${e.name}`),
    }));
}

export function listProjectSlugs(categoryId: string): string[] {
  const dir = getCategoryBasePath(categoryId);
  if (!dir) return [];
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith("."))
      .map((d) => d.name)
      .sort();
  } catch {
    return [];
  }
}

export function loadProject(categoryId: string, projectSlug: string): Project | null {
  const base = getCategoryBasePath(categoryId);
  if (!base) return null;
  const projectPath = path.join(base, projectSlug);
  if (!fs.existsSync(projectPath) || !fs.statSync(projectPath).isDirectory()) {
    return null;
  }

  const content = readContent(projectPath);
  const imageRelatives = collectImageRelatives(projectPath);

  let coverRelative: string | null = null;
  const coverFromJson = content.cover?.trim();
  if (coverFromJson) {
    const absCover = path.join(projectPath, coverFromJson);
    try {
      if (fs.existsSync(absCover) && fs.statSync(absCover).isFile()) {
        coverRelative = coverFromJson;
      }
    } catch {
      /* chemin cover invalide ou inaccessible */
    }
  }
  if (!coverRelative && fs.existsSync(path.join(projectPath, "cover.jpg"))) {
    coverRelative = "cover.jpg";
  } else if (!coverRelative && fs.existsSync(path.join(projectPath, "cover.jpeg"))) {
    coverRelative = "cover.jpeg";
  } else if (!coverRelative && fs.existsSync(path.join(projectPath, "cover.png"))) {
    coverRelative = "cover.png";
  } else if (!coverRelative && imageRelatives.length > 0) {
    coverRelative = imageRelatives[0];
  }

  const coverUrl = coverRelative ? projectMediaUrl(categoryId, projectSlug, coverRelative) : null;

  const galleryRelatives = imageRelatives.filter((r) => r !== coverRelative);
  const imageUrls = galleryRelatives.map((r) => projectMediaUrl(categoryId, projectSlug, r));

  const title = content.title ?? humanizeSlug(projectSlug);
  const typeLabel = content.type ?? "Projet";

  const diskVideos = listVideos(projectPath, categoryId, projectSlug);
  const embedRaw = Array.isArray(content.videoEmbedUrls) ? content.videoEmbedUrls : [];
  const embedVideos: ProjectVideo[] = embedRaw
    .filter((u): u is string => typeof u === "string" && u.trim().length > 0)
    .map((u, i) => ({
      relativePath: `embed/external-${i}`,
      url: u.trim(),
    }));

  return {
    slug: projectSlug,
    categoryId,
    content,
    title,
    typeLabel,
    coverUrl,
    imageUrls,
    videos: [...embedVideos, ...diskVideos],
    exports: listExports(projectPath, categoryId, projectSlug),
  };
}

function gestionProjetEventRank(slug: string): number {
  if (slug === "organisation_evenement") return 0;
  if (slug === "gestion_projet") return 1;
  return 100;
}

function sortProjectsForCategory(categoryId: string, projects: Project[]): Project[] {
  if (categoryId !== "04_gestion_projet_event") return projects;
  return [...projects].sort(
    (a, b) => gestionProjetEventRank(a.slug) - gestionProjetEventRank(b.slug) || a.slug.localeCompare(b.slug),
  );
}

export function getProjectsForCategory(categoryId: string): Project[] {
  const projects = listProjectSlugs(categoryId)
    .map((slug) => loadProject(categoryId, slug))
    .filter((p): p is Project => p !== null);
  return sortProjectsForCategory(categoryId, projects);
}

export function getCategoryPreviewImage(categoryId: string): string | null {
  const projects = getProjectsForCategory(categoryId);
  for (const p of projects) {
    if (p.coverUrl) return p.coverUrl;
  }
  return null;
}

/** Miniatures pour le carrousel d’aperçu sur la page d’accueil (couvertures puis extraits). */
export function getCategoryCarouselImages(categoryId: string, max = 8): string[] {
  const projects = getProjectsForCategory(categoryId);
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (u: string | null | undefined) => {
    if (!u || seen.has(u)) return;
    seen.add(u);
    out.push(u);
  };

  for (const p of projects) {
    push(p.coverUrl);
    if (out.length >= max) return out;
  }
  for (const p of projects) {
    for (const u of p.imageUrls) {
      push(u);
      if (out.length >= max) return out;
    }
  }
  return out;
}

export function getAllProjectRoutes(): { categorySlug: string; projectSlug: string }[] {
  const out: { categorySlug: string; projectSlug: string }[] = [];
  for (const c of CATEGORIES) {
    for (const slug of listProjectSlugs(c.id)) {
      out.push({ categorySlug: c.slug, projectSlug: slug });
    }
  }
  return out;
}

export function getProjectBySlugs(
  categorySlug: string,
  projectSlug: string,
): Project | null {
  const cat = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!cat) return null;
  return loadProject(cat.id, projectSlug);
}
