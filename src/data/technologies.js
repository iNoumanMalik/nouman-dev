import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiThreedotjs,
  SiFramer,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPython,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiFlutter,
  SiDart,
  SiGit,
  SiGithub,
  SiPostman,
  SiFirebase,
  SiVercel,
  SiJavascript,
  SiCplusplus,
  SiC,
  SiZapier,
  SiHubspot,
  SiRedux, // Added Redux icon
  SiDocker, // Added Docker icon
  // SiJava, // Added Java icon
} from "react-icons/si";
import { FaDatabase, FaTools, FaCalendar } from "react-icons/fa"; 

export const technologies = {
  frontend: [
    {
      name: "React",
      icon: SiReact,
      description: "Library for building interactive user interfaces",
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      description: "Typed superset of JavaScript",
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      description: "Utility-first CSS framework",
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      description: "React framework with SSR and static generation",
    },
    {
      name: "Three.js",
      icon: SiThreedotjs,
      description: "3D library for computer graphics",
    },
    {
      name: "Framer Motion",
      icon: SiFramer,
      description: "Motion library for React animations",
    },
    {
      name: "Material UI",
      icon: SiReact, // Placeholder
      description: "React component library",
    },
    {
      name: "Zustand",
      icon: SiReact, // Placeholder
      description: "State management for React",
    },
    {
      name: "Redux",
      icon: SiRedux,
      description: "State container for JS apps",
    },
  ],
  backend: [
    {
      name: "Node.js",
      icon: SiNodedotjs,
      description: "JavaScript runtime for server-side apps",
    },
    {
      name: "Express.js",
      icon: SiExpress,
      description: "Minimal Node.js web framework",
    },
    {
      name: "NestJS",
      icon: SiNestjs,
      description: "Enterprise Node.js framework",
    },
    {
      name: "Rest API",
      icon: FaTools,
      description: "API architecture for web services",
    },
  ],
  database: [
    {
      name: "MySQL",
      icon: SiMysql,
      description: "Relational database management system",
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      description: "Document-oriented NoSQL database",
    },
    {
      name: "Prisma ORM",
      icon: SiPrisma,
      description: "ORM for Node.js and TypeScript",
    },
  ],
  mobile: [
    {
      name: "Flutter",
      icon: SiFlutter,
      description: "Google UI toolkit for cross-platform apps",
    },
    {
      name: "Dart",
      icon: SiDart,
      description: "Language for Flutter development",
    },
    {
      name: "Firebase",
      icon: SiFirebase,
      description: "Backend services for mobile and web",
    },
  ],
  tools: [
    {
      name: "Git",
      icon: SiGit,
      description: "Version control system",
    },
    {
      name: "GitHub",
      icon: SiGithub,
      description: "Code collaboration platform",
    },
    {
      name: "Postman",
      icon: SiPostman,
      description: "API testing and development",
    },
    {
      name: "Vercel",
      icon: SiVercel,
      description: "Deployment platform for web apps",
    },
    {
      name: "XAMPP",
      icon: FaTools, // Note: XAMPP icon not available
      description: "Local web server solution",
    },
    {
      name: "DBeaver",
      icon: SiReact, // Note: DBeaver icon not available
      description: "Universal database tool",
    },
    {
      name: "Docker",
      icon: SiDocker,
      description: "Containerization platform",
    },
    {
      name: "Trae",
      icon: FaTools, // Note: Trae icon not available
      description: "HTTP client library",
    },
    {
      name: "Windsurf",
      icon: FaTools, // Note: Windsurf icon not available
      description: "AI code editor",
    },
  ],
  languages: [
    {
      name: "JavaScript",
      icon: SiJavascript,
      description: "Web development language",
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      description: "Typed JavaScript superset",
    },
    {
      name: "Python",
      icon: SiPython,
      description: "General purpose programming",
    },
    {
      name: "Java",
      icon: SiReact,
      description: "Object-oriented programming",
    },
    {
      name: "C",
      icon: SiC,
      description: "System programming language",
    },
    {
      name: "C++",
      icon: SiCplusplus,
      description: "Object-oriented C extension",
    },
    {
      name: "Dart",
      icon: SiDart,
      description: "Language for Flutter apps",
    },
  ],
  other: [
    {
      name: "n8n",
      icon: SiZapier,
      description: "Workflow automation platform",
    },
    {
      name: "HubSpot",
      icon: SiHubspot,
      description: "CRM and marketing platform",
    },
    {
      name: "ElevenLabs",
      icon: FaTools, // Note: ElevenLabs icon not available
      description: "AI voice generation platform",
    },
    // {
    //   name: 'GAS',
    //   icon: FaTools,
    //   description: 'Google Apps Script'
    // },
    // {
    //   name: 'Calendly',
    //   icon: FaCalendar,
    //   description: 'Scheduling automation tool'
    // },
    // {
    //   name: 'Formspree',
    //   icon: FaForm,
    //   description: 'Form backend service'
    // },
    // {
    //   name: 'Yup & Formik',
    //   icon: FaForm,
    //   description: 'Form validation libraries'
    // },
  ],
};
