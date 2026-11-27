export type ProjectCategory =
  | "Websites"
  | "Web Applications"
  | "Digital Products"
  | "Research"
  | "Experiments";

export type VisualType =
  | "storefront"
  | "billiards"
  | "basketball"
  | "bottle"
  | "time"
  | "trading"
  | "traffic-study"
  | "water-study"
  | "incident-report";

export type PortfolioItem = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  status: "Live" | "Prototype" | "In progress" | "Concept";
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
  "Research",
  "Experiments"
] as const;

export const projects: PortfolioItem[] = [
  {
    id: "nowastedtime",
    number: "01",
    title: "Nowastedtime.ir",
    subtitle: "A planner for time, habits, and training",
    description:
      "A bilingual planner that brings tasks, habits, and gym workouts together so you can see how you spend your time.",
    category: "Websites",
    status: "Live",
    visual: "time",
    tags: ["Time management", "Habits", "Workout planning"],
    year: "2026",
    featured: true,
    liveUrl: "https://nowastedtime.ir/",
    details: {
      overview:
        "NOWastedTime brings your day into one view, with upcoming tasks, habits, and workout plans. Life Areas let you see how much time goes to study, work, health, and personal activities.",
      approach:
        "Connect what you plan each day with what you want to understand over time, such as habit streaks, time spent in a Life Area, and progress at the gym.",
      features: [
        "Recurring tasks, calendar, and focus sessions",
        "Life Area summaries and habit history",
        "Workout plans and progress tracking",
        "English and Farsi interfaces"
      ],
      nextSteps: [
        "Document the project's goals and intended audience",
        "Add selected screenshots and implementation details",
        "Include measurable outcomes if reliable data becomes available"
      ]
    }
  },
  {
    id: "tehran-online-shop",
    number: "02",
    title: "Tehran Online Shop",
    subtitle: "An online storefront project",
    description:
      "An online storefront project focused on making products easy to browse and compare.",
    category: "Websites",
    status: "In progress",
    visual: "storefront",
    tags: ["E-commerce", "Online shop", "Web design"],
    year: "2026",
    featured: true,
    details: {
      overview:
        "Tehran Online Shop is an e-commerce project in progress. The storefront preview illustrates its product browsing layout.",
      approach:
        "The storefront direction emphasizes clear product presentation, easy browsing, and a straightforward path from discovery to enquiry or purchase.",
      features: [
        "Online shop page concept",
        "Storefront-focused visual presentation"
      ],
      nextSteps: [
        "Add the confirmed public page URL",
        "Document the final page structure and implemented features",
        "Add real screenshots of the finished page"
      ]
    }
  },
  {
    id: "mr-biliard",
    number: "03",
    title: "Mr. Biliard",
    subtitle: "A storefront for the game room",
    description:
      "A Persian-language billiards storefront with a filterable product catalogue and installation enquiries.",
    category: "Websites",
    status: "In progress",
    visual: "billiards",
    tags: ["Persian storefront", "Product catalogue", "Installation enquiries"],
    year: "2026",
    sourceUrl: "https://github.com/ArianHero/tehran-shop-preview",
    details: {
      overview:
        "A digital storefront for a billiards business, with a right-to-left catalogue and an inbox for installation requests.",
      approach:
        "The visual direction uses a deep billiard-green identity, clear product discovery, and direct enquiry paths so visitors can understand the offer and take the next step without clutter.",
      features: [
        "Persian right-to-left storefront",
        "Filterable product catalogue",
        "Inbox for installation enquiries"
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
    number: "04",
    title: "NBA Knowledge Game",
    subtitle: "Basketball knowledge, made playable",
    description:
      "Play a five-question NBA trivia round covering rules and league history. Get feedback after each answer and see your final score.",
    category: "Experiments",
    status: "Prototype",
    visual: "basketball",
    tags: ["Basketball trivia", "Interactive UI", "Scoring"],
    year: "2026",
    featured: true,
    details: {
      overview:
        "This playable prototype turns basketball knowledge into a short, interactive challenge.",
      approach:
        "Keep the core loop simple: present a question, let the player make a choice, and make progress visible through scoring and feedback.",
      features: [
        "Five multiple-choice NBA questions",
        "Answer explanations and a running score",
        "Final score and replay"
      ],
      nextSteps: [
        "Expand the question bank with more teams, players, and eras"
      ]
    }
  },
  {
    id: "smart-hydration-bottle",
    number: "05",
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
  },
  {
    id: "trading-formula",
    number: "06",
    title: "Trading Formula",
    subtitle: "A quantitative idea in development",
    description:
      "Personal research in progress on a mathematical formula for analyzing market behavior and structuring trading decisions.",
    category: "Experiments",
    status: "In progress",
    visual: "trading",
    tags: ["Quantitative research", "Market analysis", "Model development"],
    year: "2026",
    details: {
      overview:
        "I'm developing a mathematical formula to study market behavior and make the assumptions behind trading decisions explicit.",
      approach:
        "The work focuses on defining explicit inputs and assumptions, then testing the formula against historical data without confusing an attractive backtest with reliable out-of-sample evidence.",
      features: [
        "Formula and model development in progress",
        "Research into market inputs and signals"
      ],
      nextSteps: [
        "Define and document the formula's inputs and assumptions",
        "Test chronologically on data not used during development",
        "Evaluate transaction costs, slippage, liquidity, and robustness"
      ]
    }
  },
  {
    id: "everyday-traffic-violations",
    number: "07",
    title: "Everyday Traffic Violations in Tehran",
    subtitle: "A literature review on driver behavior",
    description: "A literature review in progress on common traffic violations in Tehran and the factors that shape drivers’ decisions.",
    category: "Research",
    status: "In progress",
    visual: "traffic-study",
    tags: ["Literature review", "Traffic behavior", "Tehran"],
    year: "2026",
    details: {
      overview: "I'm reviewing research on everyday violations such as failing to signal and double parking, with a focus on why drivers make those decisions.",
      approach: "Use the literature to guide questions for drivers soon after a violation, while the situation is still fresh in their minds.",
      features: ["Literature review on everyday traffic violations", "Planned questionnaire focused on why a violation occurred"],
      nextSteps: ["Complete the literature review", "Draft the questionnaire"]
    }
  },
  {
    id: "water-waste-in-tehran",
    number: "08",
    title: "Water Waste Across Tehran",
    subtitle: "Conference paper in preparation",
    description: "A conference paper in preparation that reviews the literature on water waste across different areas of Tehran.",
    category: "Research",
    status: "In progress",
    visual: "water-study",
    tags: ["Conference paper", "Water waste", "Tehran"],
    year: "2026",
    details: {
      overview: "I'm preparing a conference paper on how water waste is documented in different parts of Tehran.",
      approach: "Review available studies and compare what they cover across areas of the city.",
      features: ["Literature review on water waste", "Comparison of coverage across parts of Tehran"],
      nextSteps: ["Organize the sources by area", "Draft the conference paper"]
    }
  },
  {
    id: "traffic-violation-reporting-app",
    number: "09",
    title: "Traffic Violation Reporting App",
    subtitle: "Online reporting for eyewitnesses",
    description: "An app in progress that would let people report a traffic violation online after witnessing it.",
    category: "Web Applications",
    status: "In progress",
    visual: "incident-report",
    tags: ["Traffic reporting", "Public participation", "Web app"],
    year: "2026",
    details: {
      overview: "I'm working on an online way for people to report traffic violations they see firsthand.",
      approach: "Keep the reporting process short so a witness can describe what happened.",
      features: ["Online submission of eyewitness reports as the planned core feature"],
      nextSteps: ["Define what information the report needs", "Test the reporting flow"]
    }
  }
];

export const products = [
  projects.find((project) => project.id === "smart-hydration-bottle")!,
  projects.find((project) => project.id === "nba-knowledge-game")!
];

export const collaborationTopics = [
  {
    number: "01",
    title: "Digital product ideas",
    description:
      "Work through the problem, the audience, and what a first version could look like."
  },
  {
    number: "02",
    title: "Website and storefront planning",
    description:
      "Think through how visitors find products, compare options, and get in touch."
  },
  {
    number: "03",
    title: "Product prototyping",
    description:
      "Explore how an early concept could work and what to test first."
  }
];
