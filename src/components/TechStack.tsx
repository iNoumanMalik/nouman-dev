import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Zap,  Cloud, Database, Server,  Brain } from "lucide-react";

// --- Data Structure ---
const stackData = [
  {
    title: "Frontend Architecture",
    icon: <Zap size={24} />,
    accent: "blue",
    description: "Building modern, responsive, and performant user interfaces with state-of-the-art libraries.",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
    details: [
      { name: "React Ecosystem", level: 98 },
      { name: "Performance Optimization", level: 92 },
      { name: "Animation & Interaction", level: 95 },
    ],
    className: "md:col-span-2", // Full width on medium screens
  },
  {
    title: "AI & Intelligence",
    icon: <Brain size={24} />,
    accent: "pink",
    description: "Integrating LLMs and building autonomous agents that can see, hear, and interact.",
    skills: ["OpenAI API", "LangChain", "Vector DBs", "Voice Agents", "RAG Pipelines"],
    details: [
      { name: "LLM Integration", level: 90 },
      { name: "Agentic Workflows", level: 85 },
      { name: "AI/Voice Interfaces", level: 88 },
    ],
    className: "md:col-span-1", // Compact
  },
  {
    title: "Backend Services",
    icon: <Server size={24} />,
    accent: "blue",
    description: "Developing robust, scalable RESTful APIs and microservices architectures.",
    skills: ["Node.js", "Express", "NestJS", "JWT Auth", "System Design"],
    details: [
      { name: "API Architecture", level: 94 },
      { name: "Security & Auth", level: 90 },
      { name: "Severless Functions", level: 85 },
    ],
    className: "md:col-span-1", // Compact
  },
  {
    title: "Data Layer",
    icon: <Database size={24} />,
    accent: "blue",
    description: "Architecting efficient data schemas for relational and NoSQL stores.",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "Firebase"],
    details: [
      { name: "Schema Design", level: 88 },
      { name: "Query Optimization", level: 85 },
      { name: "Real-time Data", level: 90 },
    ],
    className: "md:col-span-1", // Compact
  },
  {
    title: "DevOps & Cloud",
    icon: <Cloud size={24} />,
    accent: "blue",
    description: "Automating deployment pipelines and managing cloud infrastructure.",
    skills: ["Docker", "AWS", "Vercel", "CI/CD", "Git"],
    details: [
      { name: "CI/CD Pipelines", level: 88 },
      { name: "Cloud Infrastructure", level: 82 },
      { name: "Containerization", level: 85 },
    ],
    className: "md:col-span-1", // Compact
  },
];

// --- Holographic Card Component ---
const BentoCard = ({ item }: { item: typeof stackData[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // const [ isHovered,setIsHovered] = useState(false);

  // Gradient definitions based on accent
  const gradients = {
    blue: "from-blue-400 to-indigo-600",
    indigo: "from-indigo-500 to-purple-500",
    purple: "from-purple-500 to-pink-500",
    cyan: "from-cyan-400 to-blue-500",
    pink: "from-pink-400 to-rose-500",
  };

  const bgGlow = {
    blue: "bg-blue-500/20",
    indigo: "bg-indigo-500/20",
    purple: "bg-purple-500/20",
    cyan: "bg-cyan-500/20",
    pink: "bg-pink-500/20",
  };

  const selectedGradient = gradients[item.accent as keyof typeof gradients];
  const selectedBgGlow = bgGlow[item.accent as keyof typeof bgGlow];

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden ${item.className}`}
      onMouseMove={handleMouseMove}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* 1. Mouse Following Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. Inner Content */}
      <div className="relative h-full p-8 flex flex-col pt-12">

        {/* Header: Icon & Title */}
        <div className="flex items-start justify-between mb-6">
          {/* <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 text-white ${isHovered ? 'scale-110' : ''} transition-transform duration-300`}>
            {React.cloneElement(item.icon as React.ReactElement<any>, { className: `w-6 h-6 text-${item.accent}-400` })}
          </div> */}
          <div className={`text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-white/5 bg-white/5 text-${item.accent}-300/80`}>
            Module 0{stackData.indexOf(item) + 1}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
          {item.title}
        </h3>

        <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
          {item.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {item.skills.slice(0, 4).map((skill) => (
            <span key={skill} className={`px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md border border-white/5 bg-white/5 text-white/70 group-hover:border-${item.accent}-500/30 group-hover:text-${item.accent}-300 transition-colors`}>
              {skill}
            </span>
          ))}
        </div>

        {/* Hover Details (Progress Bars) - Push to bottom */}
        <div className="mt-auto space-y-3 pt-6 border-t border-white/5">
          {item.details.map((detail, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
                <span>{detail.name}</span>
                <span>{detail.level}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${selectedGradient}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${detail.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Decorative Gradient Blobs (Background) */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition duration-700 ${selectedBgGlow}`} />

    </motion.div>
  );
};

// --- Main Layout ---
const BentoTechStack = () => {
  return (
    <section id="tech" className="relative py-32 bg-black px-6 overflow-hidden">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
              System Architecture
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Arsenal</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-white/30 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Live Systems</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <span>v3.0.0</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackData.map((item, idx) => (
            <BentoCard key={idx} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default BentoTechStack;
