export type ProjectContent = {
  title?: string;
  /** Titre court page projet / cartes (2–4 mots). Si absent, `title` est utilisé. */
  shortTitle?: string;
  type?: string;
  client?: string;
  year?: string;
  objective?: string;
  description?: string;
  actions?: string[];
  results?: string;
  /** Relative path from project folder (e.g. visuels/shot.png or cover.jpg) */
  cover?: string;
  /** Résumé accrocheur (recruteurs) — 2 à 4 phrases */
  summary?: string;
  /** Contexte, périmètre, contraintes */
  context?: string;
  /** Intro textuelle avant la galerie visuels */
  visuelsIntro?: string;
  /** Texte de clôture après les visuels */
  visuelsOutro?: string;
  /** Puces « en bref » (prioritaire si renseigné) */
  highlights?: string[];
  /** Vidéos externes (ex. YouTube), affichées comme embed sur la page projet */
  videoEmbedUrls?: string[];
};

export type ProjectMedia = {
  relativePath: string;
  url: string;
};

export type ProjectVideo = ProjectMedia;

export type ProjectExport = {
  name: string;
  url: string;
};

export type Project = {
  slug: string;
  categoryId: string;
  content: ProjectContent;
  title: string;
  typeLabel: string;
  coverUrl: string | null;
  imageUrls: string[];
  videos: ProjectVideo[];
  exports: ProjectExport[];
};

export type CategoryDef = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  /** Fond uni de l’encart (charte bleu / orange) */
  panelBgHex: string;
};
