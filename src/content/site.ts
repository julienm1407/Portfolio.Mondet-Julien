import profilePhotoAsset from "../assets/profile.jpg?url";
import motivationsPhotoAsset from "../assets/motivations.jpg?url";
import playImpactLogoUrl from "../assets/play-impact-logo.png?url";
import talkFootLogoUrl from "../assets/talk-foot-logo.png?url";
import winwinsportsLogoUrl from "../assets/winwinsports-logo.png?url";
import lnaSanteLogoUrl from "../assets/lna-sante-logo.png?url";

export const site = {
  name: "MONDET JULIEN",
  title: "Communication digitale et management de projet",
  location: "Marseille",
  /** Portraits : fichiers dans src/assets/ (import Vite = URL correcte en dev et en build). */
  profilePhoto: profilePhotoAsset,
  /** Encart « motivations » — laissez vide en retirant l’import + une chaîne vide si besoin. */
  motivationsPhoto: motivationsPhotoAsset,
  /** Accroche en tête de la colonne expérience — objectif professionnel lisible immédiatement. */
  experienceHeadline: "PRÊT À M'INVESTIR SUR UN PROJET COM' !",
  /** Court résumé sous l’accroche (un paragraphe par entrée du tableau). */
  experienceSummary: [
    "Après une expérience en communication institutionnelle et une alternance en communication digitale, j’ai consolidé mes compétences à travers des projets en freelance.",
    "Aujourd’hui, je souhaite intégrer une structure pour contribuer à des projets ambitieux et évoluer dans un cadre professionnel.",
  ],
  contact: {
    email: "mondetju1407@gmail.com",
    /** Affichage libre ; le lien tel: est dérivé (0… → +33…). */
    phone: "06 76 27 94 79",
    linkedin: "https://www.linkedin.com/in/julien-mondet-93532a235/",
    /** Objet prérempli quand on ouvre un lien mailto: (page Contact, pied de page). */
    mailSubject: "Proposition d'entretien professionnel",
  },
};

/** Avis type « fiche Google » — note /5 + phrase. À adapter avec de vrais retours si publication autorisée. */
export type EmployerReview = {
  company: string;
  /** Note sur 5 (affichage étoiles ; demi-étoiles si valeur .5). */
  rating: number;
  /** Court témoignage ou synthèse du retour. */
  quote: string;
  /** Ex. rôle de la personne ou « Équipe RH ». */
  attribution?: string;
  /** Logo entreprise (import `?url` depuis `src/assets`). */
  logoUrl?: string;
  /** Zoom CSS sur le logo dans le cercle (ex. 1.35 si le visuel paraît petit). */
  logoScale?: number;
};

export const employerReviews: EmployerReview[] = [
  {
    company: "Play Impact",
    rating: 4.5,
    logoUrl: playImpactLogoUrl,
    quote:
      "Dans le cadre de ses missions en tant que prestataire pour Play Impact, Julien a piloté la réalisation de vidéos en motion design, de la conception à la production finale, avec une vraie maîtrise du projet. Très professionnel, il se distingue par sa capacité à gérer en autonomie des sujets complets. Il a su s’adapter rapidement et apporter des propositions pertinentes, même sur des missions élargies par rapport à son périmètre initial.",
    attribution: "Allain Alexandre — directeur du développement · prestataire",
  },
  {
    company: "Talk Foot",
    rating: 5,
    logoUrl: talkFootLogoUrl,
    quote:
      "Julien a fait preuve d’un réel sens de l’initiative et d’une grande créativité dans ses missions. Son implication et sa capacité à proposer des idées pertinentes ont été très appréciées tout au long de sa collaboration.",
    attribution: "Monsieur Fouquet — directeur général, Talk Foot",
  },
  {
    company: "WinWinSports",
    rating: 4,
    logoUrl: winwinsportsLogoUrl,
    logoScale: 1.42,
    quote:
      "J’ai eu l’occasion d’accompagner Julien lors de son alternance chez WinWinSports. Il s’est rapidement démarqué par son professionnalisme, sa capacité à être force de proposition et son envie constante de progresser. Curieux et engagé, il n’hésite pas à sortir de son périmètre pour apporter de la valeur et relever de nouveaux défis. Une très belle évolution tout au long de son parcours.",
    attribution: "Olivier Alquié — directeur général · alternance",
  },
  {
    company: "LNA Santé — Mar Vivo",
    rating: 5,
    logoUrl: lnaSanteLogoUrl,
    quote:
      "Rigoureux sur le terrain comme sur les supports print et vidéo. À l’écoute des équipes soignantes et force de proposition pour nos contenus institutionnels.",
    attribution: "Stage — communication institutionnelle",
  },
];

export type ExperienceItem = {
  period: string;
  /**
   * Toujours affiché : `{mission} · {entreprise}`.
   * Forme des missions : `Freelance — …`, `Alternance — …`, `Stage — …` puis l’intitulé.
   */
  role: string;
  company: string;
  details: string[];
};

/** Parcours pro — modifiez ici ou demandez une reformulation. */
export const experience: ExperienceItem[] = [
  {
    period: "Nov. 2025 — Mars 2026",
    role: "Freelance — chef de projet & motion designer",
    company: "Play Impact & Talk Foot",
    details: [
      "Production motion design — réalisation de vidéos éducatives et de formation pour Play Impact.",
      "Création de contenus viraux & visuels — vidéos et visuels engageants pour le développement de TalkFoot.",
      "UX/UI & maquettage digital — maquettes abouties pour l’application et le site web.",
      "Gestion de projet startup — pilotage et développement de projet.",
    ],
  },
  {
    period: "Sept. 2024 — Sept. 2025",
    role: "Alternance — chargé de communication",
    company: "WinWinSports",
    details: [
      "Stratégie de contenu & planning éditorial — pilotage d’un calendrier multi-plateformes, vision stratégique et cohérence de marque.",
      "Création de contenus & engagement — posts et vidéos social media, animation de communautés.",
      "Brand content & identité visuelle — visuels et supports pour une image de marque cohérente.",
      "Analyse & optimisation — suivi des KPIs et ajustement des actions.",
      "Gestion d’écosystème digital — réseaux sociaux, emailings et site web.",
    ],
  },
  {
    period: "Mars — Août 2024",
    role: "Stage — chargé de communication",
    company: "LNA Santé — Mar Vivo (institut médicalisé)",
    details: [
      "Production audiovisuelle — captation photo/vidéo et montage de contenus engageants.",
      "Conception de supports de communication — print et digitaux (dépliants, dossiers, visuels).",
      "Production événementielle — création de contenus, aide à l’organisation (logistique, coordination).",
    ],
  },
];

/** Texte de l’encart entre portfolio et compétences — à personnaliser. */
export type MotivationsContent = {
  eyebrow: string;
  title: string;
  lead: string;
  /** Paragraphes de contexte (optionnels, affichés sous le lead). */
  body: string[];
  /** Objectifs ou pistes futures — listes à puces. */
  objectives: string[];
  /**
   * Bloc sous la photo (colonne visuelle) — ex. expériences hors communication.
   * Laisser title vide pour masquer l’encart.
   */
  photoAside: {
    title: string;
    paragraphs: string[];
  };
};

export const motivationsContent: MotivationsContent = {
  eyebrow: "Ma démarche",
  title: "Mes motivations",
  lead:
    "Diplômé d’un Master Communication, Management et Data (Ingémédia – Université de Toulon), je souhaite aujourd’hui mettre mes compétences au service de projets concrets, créatifs et ambitieux.",
  body: [
    "Au cours de mon alternance, puis à travers mes premières expériences en freelance, j’ai développé une approche complète de la communication. J’ai eu l’opportunité de gérer des projets de manière autonome, de la création de contenus (vidéos, visuels, storytelling) à la mise en place de stratégies social media, en passant par la rédaction de campagnes emailing et l’analyse des performances.",
    "Cette expérience en freelance m’a permis de gagner en autonomie, en prise d’initiative et en capacité d’adaptation, en étant directement impliqué dans les choix créatifs et stratégiques.",
    "Aujourd’hui, je souhaite m’inscrire dans une dynamique collective en rejoignant une structure professionnelle, afin de collaborer sur des projets d’envergure, confronter mes idées et continuer à progresser dans un environnement stimulant.",
    "Curieux, impliqué et force de proposition, j’apporte une énergie positive et une réelle envie de contribuer à des projets qui ont du sens. J’aime comprendre les enjeux, proposer des idées et faire évoluer les contenus en continu.",
    "Je serais ravi d’échanger avec vous afin de vous présenter plus en détail mon parcours et ma vision de la communication.",
  ],
  objectives: [],
  photoAside: {
    title: "Un autre terrain professionnel",
    paragraphs: [
      "Pour financer mes études, j’ai travaillé plusieurs étés en tant que plagiste, puis une année chez Carrefour Market.",
      "Ces expériences m’ont permis de développer le sens du service, la rigueur et la capacité d’adaptation dans des environnements exigeants.",
      "Elles complètent aujourd’hui mon profil en apportant une vraie maturité, que j’applique dans mes projets en communication.",
    ],
  },
};

export type SkillCategory = {
  title: string;
  /** Ce qui distingue ce bloc par rapport aux autres (une ligne). */
  differentiator: string;
  items: string[];
};

/** En-tête de la section Compétences (page d’accueil). */
export const skillsSectionMeta = {
  eyebrow: "Savoir-faire",
  /** Phrase d’ensemble — votre angle unique sur l’offre de compétences. */
  signature: "De l’idée à l’exécution, avec une approche à la fois créative et structurée.",
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Stratégie de contenu & écosystème digital",
    differentiator: "Vue d’ensemble : calendrier, tonalité et cohérence sur tous les canaux.",
    items: [
      "Planification éditoriale et calendriers multi-plateformes (LinkedIn, Instagram, Facebook).",
      "Campagnes social media, dispositifs Meta / social ads et animation de communautés.",
      "Emailings, newsletters et notifications — rédaction, mise en forme et déploiement.",
      "Brand content et formats type « reportage » / storytelling (partenaires, terrains métiers).",
      "Site vitrine et écosystème web — structuration des contenus (y compris no-code).",
    ],
  },
  {
    title: "Motion design, vidéo & conception",
    differentiator: "Du storyboard au fichier final — image, mouvement et expérience utilisateur.",
    items: [
      "Motion design — vidéos de formation, pédagogie et formats courts engageants.",
      "Vidéo : reportages, captation, montage et narration des actions sur le terrain.",
      "UX/UI et maquettage — application mobile et sites web.",
      "Supports print et digitaux institutionnels ou événementiels (dépliants, dossiers, visuels).",
      "Création graphique et cohérence visuelle avec l’image de marque.",
    ],
  },
  {
    title: "Data, analyse & optimisation",
    differentiator: "Les chiffres pour décider : KPI, tableaux de bord et ajustements concrets.",
    items: [
      "Suivi des KPI (réseaux sociaux, campagnes emailing) et lecture des performances.",
      "Tableaux de bord et synthèses pour piloter les actions de communication.",
      "Ajustement des contenus, formats et canaux selon les résultats mesurés.",
      "Approche data issue du Master Communication, Management et Data — décisions appuyées sur les indicateurs.",
    ],
  },
  {
    title: "Gestion de projet, événementiel & appels d’offres",
    differentiator: "Priorités, planning et terrain — y compris dossiers et temps forts à valoriser.",
    items: [
      "Pilotage de projets (startup, équipe réduite) — priorités, planning et livrables.",
      "Organisation et valorisation d’événements (sport amateur, santé, institutions).",
      "Coordination terrain, logistique et production de contenus lors des temps forts.",
      "Montage de dossiers et réponses à des appels d’offres (structure, argumentaire, conformité).",
    ],
  },
];
