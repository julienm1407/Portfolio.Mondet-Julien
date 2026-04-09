import profilePhotoAsset from "../assets/profile.jpg?url";
import motivationsPhotoAsset from "../assets/motivations.jpg?url";
import playImpactLogoUrl from "../assets/play-impact-logo.png?url";
import talkFootLogoUrl from "../assets/talk-foot-logo.png?url";
import winwinsportsLogoUrl from "../assets/winwinsports-logo.png?url";

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
    "Après un passage en communication institutionnelle puis une alternance côté digital, j’ai consolidé mes compétences sur des missions en freelance.",
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
      "Motion design : vidéos éducatives et de formation pour Play Impact.",
      "Formats courts viraux et charte graphique pour faire grandir TalkFoot.",
      "UX/UI : wireframes et maquettes pour l’app et le site.",
      "Pilotage en startup : planning, livrables et coordination avec les équipes.",
    ],
  },
  {
    period: "Sept. 2024 — Sept. 2025",
    role: "Alternance — chargé de communication",
    company: "WinWinSports",
    details: [
      "Calendrier éditorial multi-plateformes, ligne éditoriale et cohérence de marque.",
      "Posts et vidéos réseaux sociaux, animation de communautés.",
      "Brand content : supports alignés sur l’identité visuelle et le discours de marque.",
      "Suivi des KPI et ajustements des campagnes et contenus.",
      "Animation quotidienne des canaux : réseaux sociaux, emailings et site vitrine.",
    ],
  },
  {
    period: "Mars — Août 2024",
    role: "Stage — chargé de communication",
    company: "LNA Santé — Mar Vivo (institut médicalisé)",
    details: [
      "Captation photo et vidéo, montage de formats engageants pour les canaux internes et externes.",
      "Print et digital : dépliants, dossiers et visuels institutionnels.",
      "Événements : création de contenus, logistique et coordination sur le terrain.",
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

/** Icône marque via paquet npm `simple-icons` (SVG jsDelivr) — slugs : https://simpleicons.org/ */
export type SkillBrandIcon = {
  kind: "simpleIcon";
  slug: string;
  /** Couleur marque (référence), non utilisée dans l’URL. */
  hex: string;
  label: string;
};

/** Icône Lucide quand la marque n’est pas dans Simple Icons. */
export type SkillLucideIcon = {
  kind: "lucide";
  /** Lucide : Film (montage), Terminal (dev), Sparkles (IA). */
  icon: "film" | "terminal" | "sparkles";
  label: string;
};

export type SkillToolEntry = SkillBrandIcon | SkillLucideIcon;

export type SkillCategory = {
  title: string;
  /** Ce qui distingue ce bloc par rapport aux autres (une ligne). */
  differentiator: string;
  /** Liste à puces (ignorée si `toolRows` est défini). */
  items: string[];
  /** Lignes d’outils avec logos (remplace `items` pour cette carte). */
  toolRows?: SkillToolEntry[][];
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
  {
    title: "Outils & logiciels",
    differentiator: "Logiciels sur lesquels je suis à l’aise au quotidien.",
    items: [],
    toolRows: [
      [
        { kind: "simpleIcon", slug: "adobephotoshop", hex: "31A8FF", label: "Photoshop" },
        { kind: "simpleIcon", slug: "adobeillustrator", hex: "FF9A00", label: "Illustrator" },
        { kind: "simpleIcon", slug: "canva", hex: "00C4CC", label: "Canva" },
      ],
      [
        { kind: "lucide", icon: "film", label: "CapCut" },
        { kind: "simpleIcon", slug: "adobepremierepro", hex: "9999FF", label: "Premiere Pro" },
      ],
      [
        { kind: "simpleIcon", slug: "wordpress", hex: "21759B", label: "WordPress" },
        { kind: "lucide", icon: "terminal", label: "Cursor" },
        { kind: "simpleIcon", slug: "figma", hex: "F24E1E", label: "Figma" },
        { kind: "simpleIcon", slug: "wix", hex: "0C6EFC", label: "Wix" },
      ],
      [
        { kind: "simpleIcon", slug: "notion", hex: "000000", label: "Notion" },
        { kind: "lucide", icon: "sparkles", label: "IA" },
      ],
      [{ kind: "simpleIcon", slug: "google", hex: "4285F4", label: "Google Workspace" }],
    ],
  },
];
