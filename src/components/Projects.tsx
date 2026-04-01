import React, { useRef, useState } from "react";
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
    title: "OptoPro",
    description:
      "A full-scale hospital management system for an eye care clinic, handling appointments, patients, dispensing, billing, and operational workflows.",
    tech: ["React", "TypeScript", "Material UI", "Zustand", "NestJS", "MySQL"],
    color: "from-blue-700 to-indigo-900",
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
    color: "from-blue-600 to-indigo-800",
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
    color: "from-blue-500 to-indigo-900",
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
    color: "from-blue-400 to-indigo-800",
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
    color: "from-blue-400 to-indigo-800",
    image: zcLogo,
    demoLink: "https://zc-traders.vercel.app/",
    codeLink: "https://github.com/iNoumanMalik/zc-traders",
  },
  {
    id: 6,
    title: "Therapistreet",
    description:
      "Therapistreet is a calm, all-in-one platform designed to give therapists full autonomy over their practice, including branding, client management, and growth.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Google Scripts"],
    color: "from-blue-400 to-indigo-800",
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
    color: "from-blue-300 to-indigo-800",
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
      className="w-full max-w-6xl mx-auto flex items-start justify-center px-4 md:sticky h-auto md:h-[80vh]"
      style={{ top: `${topOffset}px` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative w-full min-h-[540px] md:min-h-0 md:h-[70vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br ${project.color}`}
      >
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -mr-48 -mt-48 rounded-full" />

        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center z-10">
            <motion.span
              className="text-white/70 font-mono text-xs sm:text-sm mb-4 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              PROJECT 0{project.id}
            </motion.span>

            <motion.h3
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-5 md:mb-6"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {project.title}
            </motion.h3>

            <motion.p
              className="text-white/90 md:text-white/80 text-base sm:text-lg mb-6 md:mb-8 max-w-md leading-relaxed"
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
              className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {/* Demo Button - Solid */}
              <motion.button
                onClick={handleDemoClick}
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-opacity-90 transition-all active:scale-95 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-transparent font-bold rounded-full transition-all active:scale-95 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
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
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const handleMobileScroll = () => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth;
    if (!cardWidth) return;
    const nextIndex = Math.round(el.scrollLeft / cardWidth);
    if (nextIndex !== activeMobileIndex) {
      setActiveMobileIndex(nextIndex);
    }
  };

  const scrollToMobileCard = (index: number) => {
    const el = mobileTrackRef.current;
    if (!el) return;
    el.scrollTo({
      left: index * el.clientWidth,
      behavior: "smooth",
    });
    setActiveMobileIndex(index);
  };

  return (
    <section id="projects" className="relative w-full bg-transparent py-24 transition-colors duration-300">
      <div className="w-full max-w-4xl mx-auto px-6 mb-14 md:mb-20 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2 text-gray-900 dark:text-white">
          Live{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 ">
            Projects
          </span>
        </h2>
        <p className="text-gray-500 dark:text-white/40 font-mono text-[10px] sm:text-xs">SCROLL TO EXPLORE ARCHIVE</p>
      </div>

      {/* Mobile: Horizontal snap carousel */}
      <div className="md:hidden">
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 pb-4 gap-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => (
            <div key={project.id} className="w-full shrink-0 snap-center px-1">
              <div className={`relative w-full min-h-[540px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br ${project.color}`}>
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 blur-[90px] -mr-36 -mt-36 rounded-full" />
                <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
                  <span className="text-white/70 font-mono text-xs sm:text-sm mb-4 block">
                    PROJECT 0{project.id}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                    {project.title}
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg mb-6 max-w-md leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-col gap-3">
                    <button
                      onClick={() => project.demoLink && window.open(project.demoLink, "_blank", "noopener,noreferrer")}
                      className="w-full px-6 py-3.5 bg-white text-black font-bold rounded-full hover:bg-opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!project.demoLink}
                    >
                      Live Demo
                    </button>
                    <button
                      onClick={() => project.codeLink && window.open(project.codeLink, "_blank", "noopener,noreferrer")}
                      className="w-full px-6 py-3.5 bg-transparent border border-white/30 text-white font-bold rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!project.codeLink}
                    >
                      Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={`Go to project ${index + 1}`}
              onClick={() => scrollToMobileCard(index)}
              className={`h-2 rounded-full transition-all duration-300 ${activeMobileIndex === index ? "w-6 bg-blue-500" : "w-2 bg-gray-300 dark:bg-white/30"}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Existing stacked sticky cards (unchanged) */}
      <div className="hidden md:block relative space-y-12 md:space-y-24 pb-20 md:pb-48">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;