export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  year: string;
  type: "Agency" | "Personal Project" | "Freelance";
  techStack: string[];
  featured?: boolean;
  github?: string;
}

export const agencyProjects: Project[] = [
  {
    id: "munireg",
    title: "MuniReg",
    description:
      "MuniReg is a modern platform supporting municipal registration and compliance programs for vacant and foreclosed properties. I designed and developed a user-friendly website for easy access to essential services.",
    image: "/images/projects/munireg.webp",
    href: "https://munireg.com/",
    year: "2025",
    type: "Agency",
    techStack: ["WordPress", "CSS", "JavaScript"],
  },
  {
    id: "mediview",
    title: "MediView",
    description:
      "MediView is a pioneering medical technology company advancing augmented-reality solutions for surgical navigation. I designed and developed a sleek, modern website to reflect their innovation.",
    image: "/images/projects/mediview.webp",
    href: "https://mediview.com/",
    year: "2024",
    type: "Agency",
    techStack: ["WordPress", "CSS", "JavaScript"],
    featured: true,
  },
  {
    id: "esquiretek",
    title: "EsquireTek",
    description:
      "EsquireTek is an AI software product that helps attorneys and law firms automate legal tasks. I helped design and build their website to highlight the product's sophistication.",
    image: "/images/projects/esquiretek.webp",
    href: "https://esquiretek.com/alpha",
    year: "2023",
    type: "Agency",
    techStack: ["WordPress", "CSS", "JavaScript"],
  },
  {
    id: "daniels-amish",
    title: "Daniel's Amish",
    description:
      "Daniel's Amish is an Amish furniture manufacturer in Ohio. I contributed to their new website design, enhancing their marketing and online presence.",
    image: "/images/projects/daniels-amish.webp",
    href: "https://www.danielsamish.com/",
    year: "2022",
    type: "Agency",
    techStack: ["WordPress", "WooCommerce", "CSS"],
  },
  {
    id: "datafon",
    title: "Datafon",
    description:
      "Datafon helps organizations engage audiences and streamline interactions. I designed and built their website to showcase their innovative approach and make complex services feel approachable.",
    image: "/images/projects/datafon.webp",
    href: "https://datafon.co.uk/",
    year: "2024",
    type: "Agency",
    techStack: ["WordPress", "CSS", "JavaScript"],
  },
  {
    id: "acordis",
    title: "Acordis",
    description:
      "Acordis is an IT solutions company in Miami, Florida. I worked on a design refresh and modernized their web aesthetic.",
    image: "/images/projects/acordis.webp",
    href: "https://acordiscorp.com/",
    year: "2022",
    type: "Agency",
    techStack: ["WordPress", "CSS"],
  },
  {
    id: "knk",
    title: "knk Publishing Software",
    description:
      "The knkPublishing Group, originally from Germany, expanded to North America. I contributed to a website redesign that gave their brand a fresh, modern look.",
    image: "/images/projects/knk.webp",
    href: "https://knkpublishingsoftware.com/",
    year: "2021",
    type: "Agency",
    techStack: ["WordPress", "CSS", "JavaScript"],
  },
  {
    id: "shenanigans",
    title: "Shenanigans Stables",
    description:
      "Shenanigans Stables is an equestrian facility in Ohio. I worked on their website to improve online visibility and integrate appointment scheduling.",
    image: "/images/projects/shenanigans.webp",
    href: "https://shenanigansstables.com/",
    year: "2022",
    type: "Agency",
    techStack: ["WordPress", "CSS"],
  },
];

export const personalProjects: Project[] = [
  {
    id: "netflix-clone",
    title: "Netflix Clone",
    description:
      "A full-stack Netflix clone with user authentication, real-time updates, Stripe payments, and a responsive UI. Built with modern React patterns and best practices.",
    image: "/images/projects/netflix.webp",
    href: "https://netflix-clone-omega-lac.vercel.app/", // Update with actual URL
    year: "2026",
    type: "Personal Project",
    techStack: ["React", "TypeScript", "Next.js", "Tailwind", "Stripe", "Prisma"],
    featured: true,
  },
  {
    id: "slack-clone",
    title: "Slack Clone",
    description:
      "A real-time messaging application with workspaces, channels, direct messages, and rich text editing. Features real-time updates and modern UI/UX.",
    image: "/images/projects/slack.webp",
    href: "https://slack-clone-622bd.web.app/login", // Update with actual URL
    year: "2026",
    type: "Personal Project",
    techStack: ["React", "TypeScript", "Next.js", "Convex", "Tailwind"],
    featured: true,
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description:
      "A React analytics dashboard with interactive charts and tables, visualizing key metrics and trends in real time.",
    image: "/images/projects/dashboard.webp",
    href: "https://analytics-dashboard-jade-six.vercel.app/",
    year: "2025",
    type: "Personal Project",
    techStack: ["React", "TypeScript", "Recharts", "Tailwind"],
    featured: true,
  },
  {
    id: "pa-realestate",
    title: "PA Premium Real Estate",
    description:
      "A React real estate mockup with multiple agents, properties, and interactive filtering for exploring and comparing listings.",
    image: "/images/projects/realestate.webp",
    href: "https://react-realestate.vercel.app/",
    year: "2021",
    type: "Personal Project",
    techStack: ["React", "CSS", "JavaScript"],
  },
  {
    id: "supreme-contracting",
    title: "Supreme Contracting",
    description:
      "A roofing and exterior contractor website designed to showcase services including roof replacement, gutter systems, and home protection solutions.",
    image: "/images/projects/supreme.webp",
    href: "https://supremecontractingva.com/",
    year: "2024",
    type: "Freelance",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "avellinos",
    title: "Avellino's Italian Cuisine",
    description:
      "Italian themed restaurant website featuring a unique menu built with React.",
    image: "/images/projects/avellinos.webp",
    href: "https://restaurant-51fd0.web.app/",
    year: "2021",
    type: "Personal Project",
    techStack: ["React", "Firebase", "CSS"],
  },
  {
    id: "recipe-app",
    title: "Recipe Search App",
    description:
      "A simple recipe search application using JavaScript and the Edamam API service.",
    image: "/images/projects/recipe.webp",
    href: "https://qnistico.github.io/Recipe-Search-App/",
    year: "2022",
    type: "Personal Project",
    techStack: ["JavaScript", "API", "CSS"],
  },
  {
    id: "cgn-dui",
    title: "CGN DUI Attorney",
    description:
      "A personalized legal website for a Philadelphia area DUI Attorney named Charles G. Nistico.",
    image: "/images/projects/cgn.webp",
    href: "https://duiattorney.net/",
    year: "2021",
    type: "Freelance",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
];

export const allProjects = [...personalProjects, ...agencyProjects];

export const featuredProjects = allProjects.filter((p) => p.featured);
