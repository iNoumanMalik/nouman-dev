import React from "react";
import { motion } from "framer-motion";
import optoLogo from "../assets/clients/opto/logo.png";
import abtahiLogo from "../assets/clients/abtahi/logo.png";
import zerolineLogo from "../assets/clients/zeroline/logo.png";
import therapistreetLogo from "../assets/clients/therapistreet/logo.png";
import fitlabLogo from "../assets/clients/fitlab/logo.png";
import zamungLogo from "../assets/clients/zamung/logo.png";
import zcLogo from "../assets/clients/zc-traders/logo.png";

const projects = [
  {
    id: 1,
    title: "OPTOPRO",
    description:
      "A full-scale hospital management system for an eye care clinic, handling appointments, patients, dispensing, billing, and operational workflows.",
    tech: ["React", "TypeScript", "Material UI", "Zustand", "NestJS", "MySQL"],
    color: "from-blue-700 to-cyan-900",
    image: optoLogo,
    demoLink: "https://opto.computerized.ai/", 
    codeLink: "https://github.com/computerized-ai/optopro-frontend", 
  },
  {
    id: 2,
    title: "ZeroLine",
    description:
      "An AI voice agent portal with real-time data integration, designed to manage conversations, analytics, and intelligent automation.",
    tech: ["React", "TypeScript", "Tailwind CSS", "APIs", "AI Integration"],
    color: "from-blue-600 to-cyan-800",
    image: zerolineLogo,
    demoLink: "https://zero.computerized.ai/", 
    codeLink: "https://github.com/computerized-ai/computerized", 
  },
  {
    id: 3,
    title: "FitLab",
    description:
      "An AI-powered gym lead generation landing page focused on conversions, performance, and modern UI/UX.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "from-blue-500 to-cyan-900",
    image: fitlabLogo,
    demoLink: "https://fitlab.computerized.ai/", 
    codeLink: "https://github.com/computerized-ai/ai-fitness-website", 
  },
  {
    id: 4,
    title: "Abtahi Counselling",
    description:
      "A mental health website featuring online session booking with Calendly and Zoom integration, focused on accessibility and calm UX.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Calendly", "Zoom API"],
    color: "from-blue-400 to-cyan-800",
    image: abtahiLogo,
    demoLink: "https://www.abtahicounselling.co.uk/", 
    codeLink: "https://github.com/computerized-ai/abtahi-counselling", 
  },
  {
    id: 5,
    title: "ZC Traders",
    description:
      "A business website for a trading company, focused on showcasing services, products, and building client trust with a clean UI.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    color: "from-blue-400 to-cyan-800",
    image: zcLogo,
    demoLink: "https://zc-traders.vercel.app/", 
    codeLink: "https://github.com/iNoumanMalik/zc-traders", 
  },
  {
    id: 6,
    title: "TherapistStreet",
    description:
      "A therapist listing and lead capture platform built with Next.js, featuring a custom contact form integrated with Google Scripts for data handling.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Google Scripts"],
    color: "from-blue-400 to-cyan-800",
    image: therapistreetLogo,
    demoLink: "https://www.therapistreet.com/", 
    codeLink: "https://github.com/computerized-ai/therapistreet", 
  },
  {
    id: 7,
    title: "Zamung Client",
    description:
      "A client-facing web platform designed to present company offerings with a modern layout and responsive user experience.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    color: "from-blue-300 to-cyan-800",
    image: zamungLogo,
    demoLink: "https://www.zamungclient.com/", 
    codeLink: "https://github.com/iNoumanMalik/landmark-builders", 
  },
];

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  total: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const topOffset = 80 + index * 40;

  const handleDemoClick = () => {
    if (project.demoLink) {
      window.open(project.demoLink, "_blank", "noopener,noreferrer");
    }
  };

  const handleCodeClick = () => {
    if (project.codeLink) {
      window.open(project.codeLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="sticky w-full max-w-6xl mx-auto flex items-start justify-center px-4"
      style={{ top: `${topOffset}px`, height: "80vh" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative w-full h-[70vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br ${project.color}`}
      >
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -mr-48 -mt-48 rounded-full" />

        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center z-10">
            <motion.span
              className="text-white/60 font-mono text-sm mb-4 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              PROJECT 0{project.id}
            </motion.span>

            <motion.h3
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {project.title}
            </motion.h3>

            <motion.p
              className="text-white/80 text-lg mb-8 max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {project.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white/90"
                >
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {/* Demo Button - Solid */}
              <motion.button
                onClick={handleDemoClick}
                className="group relative px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-opacity-90 transition-all active:scale-95 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: project.demoLink ? 1.05 : 1 }}
                whileTap={{ scale: project.demoLink ? 0.95 : 1 }}
                disabled={!project.demoLink}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  <span>Live Demo</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.button>

              {/* Repository Button - Outline with Glow */}
              <motion.button
                onClick={handleCodeClick}
                className="group relative px-8 py-3.5 bg-transparent font-bold rounded-full transition-all active:scale-95 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: project.codeLink ? 1.05 : 1 }}
                whileTap={{ scale: project.codeLink ? 0.95 : 1 }}
                disabled={!project.codeLink}
                style={{
                  border: '1.5px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-full p-[1.5px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <span className="relative flex items-center gap-2 text-white">
                  <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span>Code</span>
                  <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side: Clean Modern Image Display */}
          <div className="hidden lg:flex w-1/2 h-full items-center justify-center p-12 relative">
            <motion.div
              className="relative w-full max-w-md aspect-square"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              {/* Glow Effect Behind */}
              <div className="absolute inset-0  scale-110 rounded-full" />

              {/* Main Image Container */}
              <div className="relative h-full rounded-3xl p-12 overflow-hidden">
                {/* Logo/Image */}
                <div className="relative h-full flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-500"
                    style={{
                      filter:
                        "brightness(1.1) drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
                    }}
                  />
                </div>
              </div>

              {/* Orbiting Dots */}
              <motion.div
                className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ transformOrigin: "-150px 150px" }}
              />

              <motion.div
                className="absolute bottom-0 left-0 w-2 h-2 bg-white/60 rounded-full"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ transformOrigin: "150px -150px" }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function Projects() {
  return (
    <section className="relative w-full bg-black py-24">
      <div className="w-full max-w-4xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-white text-5xl md:text-7xl font-black mb-2 tracking-tighter">
          Live Projects
          <br />
        </h2>
        <p className="text-white/40 font-mono">SCROLL TO EXPLORE ARCHIVE</p>
      </div>

      <div className="relative space-y-24 pb-48">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>

      {/* Background visual elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[150px]" />
      </div>
    </section>
  );
}

export default Projects;