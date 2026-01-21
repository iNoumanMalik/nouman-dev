import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Server,
  Layers,
  Zap,
  Bug,
  Bot,
  LayoutDashboard,
  Rocket,
  MessageSquare,
  Search,
  GraduationCap,
  History,
  Wrench,
  Globe,
  Cpu,
  LucideIcon,
} from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- Data Types ---
type ServiceItem = {
  title: string;
  icon: LucideIcon;
};

type CategoryItem = {
  id: string;
  title: string;
  tagline: string;
  services: ServiceItem[];
  gradient: string;
};

// --- Strict Data Mapping ---
const servicesData: CategoryItem[] = [
  {
    id: "build",
    title: "Build",
    tagline: "Modern Digital Experiences",
    gradient: "from-blue-500 to-cyan-400",
    services: [
      { title: "Frontend Development", icon: Code },
      { title: "Backend Development", icon: Server },
      { title: "Full-Stack Web Development", icon: Globe },
      { title: "SaaS MVP Development", icon: Rocket },
    ],
  },
  {
    id: "scale",
    title: "Scale & Improve",
    tagline: "Optimization & Quality",
    gradient: "from-purple-500 to-pink-500",
    services: [
      { title: "System Design & Architecture", icon: Layers },
      { title: "Code Refactoring & Optimization", icon: Wrench },
      { title: "Bug Fixing & Feature Enhancement", icon: Bug },
      { title: "Ongoing Maintenance & Support", icon: History },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    tagline: "Intelligent Solutions",
    gradient: "from-amber-400 to-orange-500",
    services: [
      { title: "AI Chatbots & Conversational Agents", icon: Cpu },
      {
        title: "AI Feature Integration into Web & Mobile Apps",
        icon: LayoutDashboard,
      },
      { title: "Automated AI Workflows & n8n Integrations", icon: Zap },
    ],
  },
  {
    id: "guidance",
    title: "Guidance & Quality",
    tagline: "Expertise & Support",
    gradient: "from-emerald-400 to-teal-500",
    services: [
      { title: "Architecture & Technical Consulting", icon: MessageSquare },
      { title: "Quality Assurance & Testing", icon: Search },
      { title: "Developer Mentorship & Coaching", icon: GraduationCap },
    ],
  },
];

const Services = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // GSAP ScrollTrigger Setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Setup MatchMedia for Desktop only
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const totalSections = servicesData.length;

        // Horizontal Scroll Animation
        // We want to pin the component and slide the 'slider' div
        gsap.to(sliderRef.current, {
          xPercent: (-100 * (totalSections - 1)) / totalSections, // Move enough to show last item. logic varies based on container width
          ease: "none",
          scrollTrigger: {
            trigger: componentRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: "+=3000", // "Distance" of the scroll
            snap: {
              snapTo: 1 / (totalSections - 1),
              duration: 0.5,
              delay: 0.1,
              ease: "power1.inOut",
            },
            onUpdate: (self) => {
              // Calculate active index based on scroll progress
              const progress = self.progress;
              // Map 0-1 to 0-3
              const index = Math.round(progress * (totalSections - 1));
              setActiveCategoryIndex(
                Math.min(Math.max(index, 0), totalSections - 1),
              );
            },
          },
        });
        // We need to properly style the slider for this to work
        // The slider needs to be wider than the viewport: e.g., 400vw
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  // For mobile, we just use standard scroll, so we detect active index via IntersectionObserver (optional) or just simple click
  // But let's keep it simple for mobile: just display list.
  // However, the prompt says "Mobile behavior = swipe".
  // We can just rely on the 'activeCategoryIndex' being driven by scroll on Desktop.
  // On mobile, user can swipe the top cards. We can add a click handler.

  const activeCategory = servicesData[activeCategoryIndex];

  return (
    <div
      ref={componentRef}
      className="relative bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300"
    >
      {/* Desktop: Pinned Height Container / Mobile: Auto Height */}
      <div className="h-screen flex flex-col px-6 md:px-0 py-20 md:py-0">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full md:h-auto justify-center">
          {/* Header */}
          <div className="pt-16 md:pt-12 mb-12 text-center md:text-left md:px-12 ">
            <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] block mb-2">
              Services
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
              What I{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
                Deliver
              </span>
            </h2>
            <p className="mt-4 text-gray-400 dark:text-white/40 text-sm font-mono md:hidden">
              Swipe to explore →
            </p>
          </div>

          {/* --- Layer 1: Categories (Horizontal Track) --- */}
          {/* On Desktop: This track is what moves left-right via GSAP */}
          {/* On Mobile: Standard overflow-x scroll */}
          <div className="w-full overflow-hidden md:overflow-visible relative ">
            <div
              ref={sliderRef}
              className="flex flex-row gap-6 md:gap-0
                               md:w-[400%] 
                               overflow-x-auto md:overflow-visible 
                               snap-x snap-mandatory scrollbar-none 
                               px-6 md:px-0"
            >
              {servicesData.map((category, index) => {
                const isActive = index === activeCategoryIndex;
                return (
                  <div
                    key={category.id}
                    className="w-[85vw] shrink-0 md:w-1/4 h-[300px] md:h-[400px] 
                                           flex items-center justify-center p-4 snap-center"
                    onClick={() => setActiveCategoryIndex(index)} // Allow click on mobile/desktop
                  >
                    <motion.div
                      className={`
                                        w-full h-full rounded-3xl p-8 md:p-12 relative overflow-hidden
                                        flex flex-col justify-between 
                                        border transition-all duration-500 group
                                        ${isActive
                          ? "bg-white dark:bg-[#111] border-gray-200 dark:border-white/20 shadow-2xl scale-100 opacity-100"
                          : "bg-gray-100 dark:bg-[#050505] border-gray-200 dark:border-white/5 opacity-50 scale-95 blur-[2px]"
                        }
                                    `}
                    >
                      {/* Active Glow */}
                      {isActive && (
                        <div
                          className={`absolute inset-0 opacity-10 bg-gradient-to-br ${category.gradient}`}
                        />
                      )}

                      {/* Icon */}
                      <div className="relative z-10">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 ${isActive ? "text-blue-600 dark:text-white" : "text-gray-400 dark:text-white/30"}`}
                        >
                          {/* Just a generic icon for category if specific one not passed, but we'll use first service icon maybe? or just hardcode */}
                          {index === 0 && <Code size={28} />}
                          {index === 1 && <Zap size={28} />}
                          {index === 2 && <Bot size={28} />}
                          {index === 3 && <GraduationCap size={28} />}
                        </div>
                      </div>

                      {/* Title */}
                      <div className="relative z-10">
                        <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2">
                          {category.title}
                        </h3>
                        <p className="font-mono text-sm tracking-widest text-gray-500 dark:text-white/50 uppercase">
                          {category.tagline}
                        </p>
                      </div>

                      {/* Mobile Indicator */}
                      <div className="md:hidden absolute bottom-6 right-6 text-gray-200 dark:text-white/20">
                        0{index + 1}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- Layer 2: Services (Fixed Bottom Panel) --- */}
          {/* Stays fixed in view while Categories scroll above it (on Desktop) */}
          {/* On mobile, it appears below the scroll area */}
          <div className="mt-8 md:mt-12 h-[180px] md:h-[200px] px-6 md:px-12 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {activeCategory.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none"
                  >
                    <div className="mt-1 text-gray-500 dark:text-white/40">
                      <service.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 leading-tight">
                        {service.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Progress Bar (Desktop) */}
            <div className="hidden md:block absolute bottom-0 left-12 right-12 h-1 bg-gray-200 dark:bg-white/5 rounded-full mt-12">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                animate={{
                  width: `${((activeCategoryIndex + 1) / servicesData.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
