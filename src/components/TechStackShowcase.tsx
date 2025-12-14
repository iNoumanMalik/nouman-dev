import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { technologies, Tech } from "../data/technologies";

const TechStackShowcase = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");


  const uniqueAllTechnologies = useMemo(() => {
    const seen = new Set<string>();
    const result: Tech[] = [];
    
    Object.values(technologies).flat().forEach((tech: Tech) => {
      if (!seen.has(tech.name)) {
        seen.add(tech.name);
        result.push(tech);
      }
    });
    
    return result;
  }, []);

  const filteredTechnologies: Tech[] =
    selectedCategory === "all"
      ? uniqueAllTechnologies
      : technologies[selectedCategory as keyof typeof technologies] || [];

  const findTechCategory = (techName: string): string => {
    for (const [category, techs] of Object.entries(technologies)) {
      if (techs.some((tech: Tech) => tech.name === techName)) {
        return category;
      }
    }
    return "other";
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Tech Stack
          </h2>
          <p className="text-gray-400 mt-3">Technologies I work with</p>
        </motion.div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedCategory === "all"
                ? "bg-linear-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            All
          </button>

          {Object.keys(technologies).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-3 rounded-full capitalize font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-linear-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {filteredTechnologies.map((tech: Tech) => (
            <div
              key={tech.name}
              className="group relative"
              onMouseEnter={() => setActiveTooltip(tech.name)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 mx-auto flex items-center justify-center
                rounded-2xl bg-linear-to-br from-[#f5f5f5] via-[#dcdcdc] to-[#b8b8b8]
                shadow-lg cursor-pointer border border-white/20 relative overflow-hidden"
              >
                {tech.imgSrc ? (
                  <img src={tech.imgSrc} alt={tech.name} className="w-9 h-9" />
                ) : (
                  <tech.icon className="w-9 h-9 text-gray-900" />
                )}
              </motion.div>

              <p className="text-center text-white/90 text-sm mt-2 font-medium">
                {tech.name}
              </p>

              {/* Enhanced Tooltip */}
              <AnimatePresence>
                {activeTooltip === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 
                      bg-black/90 backdrop-blur-xl text-white p-4 rounded-xl 
                      shadow-2xl border border-white/10 z-50 min-w-[280px] max-w-[320px]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 flex items-center justify-center
                        rounded-xl bg-linear-to-br from-[#f5f5f5] via-[#dcdcdc] to-[#b8b8b8]"
                      >
                        {tech.imgSrc ? (
                          <img src={tech.imgSrc} alt={tech.name} className="w-6 h-6" />
                        ) : (
                          <tech.icon className="w-6 h-6 text-gray-900" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">
                          {tech.name}
                        </h3>
                        <span className="text-cyan-400 text-xs font-medium capitalize">
                          {findTechCategory(tech.name)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {tech.description}
                    </p>

                    {/* Tooltip arrow */}
                    <div
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 
                      bg-black/90 rotate-45 border-l border-t border-white/10"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackShowcase;