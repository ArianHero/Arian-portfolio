export type ProjectCategory =
  | "Websites"
  | "Web Applications"
  | "Digital Products"
  | "Experiments";

export type VisualType = "storefront" | "billiards" | "basketball" | "bottle";

export type PortfolioItem = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  status: "Prototype" | "In progress" | "Concept";
  visual: VisualType;
  tags: string[];
  year: string;
  featured?: boolean;
  liveUrl?: string;
  sourceUrl?: string;
  details: {
    overview: string;
    approach: string;
    features: string[];
    nextSteps: string[];
  };
};

export const projectFilters = [
  "All Projects",
  "Websites",
  "Web Applications",
  "Digital Products",
  "Experiments"
] as const;

export const projects: PortfolioItem[] = [
  {
    id: "mr-biliard",
    number: "01",
    title: "Mr. Biliard",
    subtitle: "A storefront for the game room",
    description:
      "A Persian, right-to-left Django storefront with a filterable product catalogue and an installation enquiry workflow managed through Django admin.",
    category: "Websites",
    status: "In progress",
    visual: "billiards",
    tags: ["Django", "RTL storefront", "Product catalogue", "Enquiry workflow"],
    year: "2026",
    featured: true,
    sourceUrl: "https://github.com/ArianHero/tehran-shop-preview",
    details: {
      overview:
        "A digital storefront for a billiards business. The repository describes a Persian RTL Django shop with a filterable catalogue and an installation-request inbox in Django admin.",
      approach:
        "The visual direction uses a deep billiard-green identity, clear product discovery, and direct enquiry paths so visitors can understand the offer and take the next step without clutter.",
      features: [
        "Persian right-to-left Django storefront",
        "Filterable product catalogue",
        "Installation enquiries managed in Django admin"
      ],
      nextSteps: [
        "Add the business's actual product inventory and photographs",
        "Configure persistent production storage, domain, and HTTPS",
        "Verify the public deployment and enquiry delivery end to end"
      ]
    }
  },
  {
    id: "nba-knowledge-game",
    number: "02",
    title: "NBA Knowledge Game",
    subtitle: "Basketball knowledge, made playable",
    description:
      "An interactive basketball trivia experience built around question flows, score tracking, and the fun of knowing the game.",
    category: "Experiments",
    status: "Prototype",
    visual: "basketball",
    tags: ["Basketball trivia", "Interactive UI", "Scoring"],
    year: "2026",
    featured: true,
    details: {
      overview:
        "A game concept that turns basketball knowledge into a short, interactive challenge. The current showcase is limited to the implemented prototype experience.",
      approach:
        "Keep the core loop simple: present a question, let the player make a choice, and make progress visible through scoring and feedback.",
      features: [
        "Interactive basketball questions",
        "Question-and-answer flow",
        "Score tracking"
      ],
      nextSteps: [
        "Expand and validate the question bank",
        "Polish feedback, replay, and progression states",
        "Explore leaderboards or multiplayer only as future features"
      ]
    }
  },
  {
    id: "smart-hydration-bottle",
    number: "03",
    title: "Smart Hydration Bottle",
    subtitle: "A small interaction with a useful signal",
    description:
      "A product concept exploring a simple way to measure water consumed, using a digital display integrated into the lid and a two-press interaction.",
    category: "Digital Products",
    status: "Concept",
    visual: "bottle",
    tags: ["Product concept", "Industrial design", "Hydration"],
    year: "2026",
    details: {
      overview:
        "A smart bottle concept designed to make hydration tracking feel practical and low-friction, without turning a basic daily habit into a complicated workflow.",
      approach:
        "The current concept uses a 1,000 ml Tritan body in a smoke finish, a screw lid with an integrated display, and a fixed weighing base. The intended interaction is simple: press before drinking and press again afterward to estimate the consumed amount from the change in bottle weight.",
      features: [
        "Digital display integrated into the lid",
        "Weight-based consumed-water measurement concept",
        "Simple two-press interaction",
        "Hydration tracking direction"
      ],
      nextSteps: [
        "Prototype and calibrate the weighing mechanism",
        "Validate measurement accuracy across different drinking angles",
        "Test battery life, sealing, cleaning, and manufacturing cost"
      ]
    }
  }
];

export const products = [
  projects.find((project) => project.id === "smart-hydration-bottle")!,
  projects.find((project) => project.id === "nba-knowledge-game")!
];

export const services = [
  {
    number: "01",
    title: "Custom Website Development",
    description:
      "Distinctive, responsive websites designed around your brand, audience, and business goals."
  },
  {
    number: "02",
    title: "Interactive Web Applications",
    description:
      "Useful browser-based products with thoughtful flows, clear feedback, and maintainable foundations."
  },
  {
    number: "03",
    title: "UI / UX Design",
    description:
      "Interfaces that make complex ideas easier to understand and everyday tasks easier to complete."
  },
  {
    number: "04",
    title: "Business Websites",
    description:
      "Professional digital storefronts that explain what you offer and make it easy to get in touch."
  },
  {
    number: "05",
    title: "Web Tools & Calculators",
    description:
      "Focused utilities that turn repetitive work, calculations, or decisions into simple workflows."
  },
  {
    number: "06",
    title: "Product Prototyping",
    description:
      "Early product experiences that help test an idea, communicate its value, and plan what comes next."
  },
  {
    number: "07",
    title: "Custom Software Solutions",
    description:
      "Purpose-built software for specific problems, from the first useful version to a scalable foundation."
  }
];

export const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Python",
  "Django",
  "Three.js",
  "Figma"
];
