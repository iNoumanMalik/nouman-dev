import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap, HardDrive, Cpu, Cloud } from "lucide-react";

// --- Data Structure (Consolidated from your shared skills) ---
const stackData = [
  {
    title: "🌐 Frontend Architecture",
    icon: <Zap size={24} />,
    accent: "cyan",
    description: "Building modern, responsive, and performant user interfaces.",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "Responsive UI",
    ],
    details: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "State Management", level: 85 },
    ],
  },
  {
    title: "⚙️ Backend Services",
    icon: <Cpu size={24} />,
    accent: "green",
    description: "Developing scalable, secure, and reliable RESTful APIs.",
    skills: [
      "Node.js",
      "Express.js",
      "JWT Auth",
      "RESTful API",
      "Error Handling",
    ],
    details: [
      { name: "Node/Express", level: 90 },
      { name: "Authentication (JWT)", level: 85 },
      { name: "API Design", level: 95 },
    ],
  },
  {
    title: "🗄️ Data & Persistence",
    icon: <HardDrive size={24} />,
    accent: "pink",
    description: "Experience with both relational and NoSQL databases.",
    skills: ["MongoDB", "MySQL", "DBeaver", "Firebase", "OOP/C"],
    details: [
      { name: "NoSQL (MongoDB)", level: 80 },
      { name: "Relational (MySQL)", level: 75 },
    ],
  },
  {
    title: "☁️ DevOps & Automation",
    icon: <Cloud size={24} />,
    accent: "indigo",
    description:
      "Version control, continuous deployment, and workflow automation.",
    skills: ["Git & GitHub", "Vercel", "Render", "n8n", "Postman", "VS Code"],
    details: [
      { name: "Git/Version Control", level: 95 },
      { name: "Deployment/Hosting", level: 90 },
      { name: "Workflow Automation", level: 80 },
    ],
  },
];

// --- Color Maps (Fix for dynamic Tailwind classes) ---
const textColorMap: Record<string, string> = {
  cyan: "text-cyan-400",
  green: "text-green-400",
  pink: "text-pink-400",
  indigo: "text-indigo-400",
};

const bgColorMap: Record<string, string> = {
  cyan: "bg-cyan-500",
  green: "bg-green-500",
  pink: "bg-pink-500",
  indigo: "bg-indigo-500",
};

const borderColorMap: Record<string, string> = {
  cyan: "border-cyan-500/50",
  green: "border-green-500/50",
  pink: "border-pink-500/50",
  indigo: "border-indigo-500/50",
};

const shadowColorMap: Record<string, string> = {
  cyan: "shadow-cyan-500/30",
  green: "shadow-green-500/30",
  pink: "shadow-pink-500/30",
  indigo: "shadow-indigo-500/30",
};

// --- Helper Components ---

interface ProgressBarProps {
  name: string;
  level: number;
  accent: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ name, level, accent }) => {
  const barColor = bgColorMap[accent];
  const textColor = textColorMap[accent];
  const glowShadow = `shadow-glow-${accent}`;

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1 text-white/80">
        <span className={textColor}>{name}</span>
        <span className="font-mono text-xs">{level}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <motion.div
          className={`${barColor} h-2 rounded-full transition-all duration-700 ease-out ${glowShadow}`}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </div>
    </div>
  );
};

interface LayerCardProps {
  layer: (typeof stackData)[0];
  index: number;
}

const LayerCard: React.FC<LayerCardProps> = ({ layer, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const textColor = textColorMap[layer.accent];
  const borderColor = borderColorMap[layer.accent];
  const shadowColor = shadowColorMap[layer.accent];

  return (
    <motion.div
      className={`layer-card p-6 md:p-8 rounded-2xl cursor-pointer mb-6 border ${borderColor}
                bg-white/5 backdrop-blur-sm relative shadow-lg ${shadowColor}`}
      style={{ zIndex: 10 - index }}
      initial={{ opacity: 0, y: 50, rotateX: -5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -12, rotateX: 2 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className={`flex items-center ${textColor}`}>
          <motion.span
            animate={{ scale: isExpanded ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {layer.icon}
          </motion.span>
          <h3 className="text-2xl font-bold ml-3 text-white">{layer.title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className={`${textColor} transition-transform`}
        >
          <ChevronDown />
        </motion.div>
      </div>

      <p className="text-white/60 mt-2 mb-4 text-sm">{layer.description}</p>

      {/* Skills Tags Preview */}
      <div className="flex flex-wrap gap-2 mb-4">
        {layer.skills.slice(0, 5).map((skill, i) => (
          <span
            key={i}
            className={`px-3 py-1 text-xs font-mono rounded-full border ${borderColor} ${textColor}`}
          >
            {skill}
          </span>
        ))}
        {layer.skills.length > 5 && (
          <span className="px-3 py-1 text-xs font-mono text-white/50">
            +{layer.skills.length - 5} more
          </span>
        )}
      </div>

      {/* Expanded Details Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-4 border-t border-white/10 mt-4 overflow-hidden"
          >
            <h4 className={`text-lg font-semibold mb-3 ${textColor}`}>
              Core Competency
            </h4>
            {layer.details.map((detail, i) => (
              <ProgressBar
                key={i}
                name={detail.name}
                level={detail.level}
                accent={layer.accent}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main TechStack Component ---

const TechStack = () => {
  return (
    <section id="tech" className="section bg-black/80 py-20 ">
      {/* Custom Styles for Pattrn.io Neon Aesthetic */}
      <style>{`
        .shadow-glow-cyan { box-shadow: 0 0 8px #00a4ff; }
        .shadow-glow-green { box-shadow: 0 0 8px #5be57a; }
        .shadow-glow-pink { box-shadow: 0 0 8px #ff0080; }
        .shadow-glow-indigo { box-shadow: 0 0 8px #8b5cf6; }

        /* The perspective effect for the "Layered" look */
        .layer-stack {
          transform: perspective(1000px);
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-5 w-full box-border flex flex-col text-white">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
            My Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 ">
              Tech Stack{" "}
            </span>
          </h2>
        </div>

        {/* <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-600">Deployment</span> */}

        <div className="layer-stack">
          {stackData.map((layer, index) => (
            <LayerCard key={layer.title} layer={layer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
