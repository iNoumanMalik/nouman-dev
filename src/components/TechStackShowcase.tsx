import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { technologies, Tech } from "../data/technologies";
import { 
  Grid, 
  Monitor, 
  Server, 
  Database, 
  Smartphone, 
  Wrench,
  Code,
  Zap,
  Globe,
  Cpu,
  Smartphone as MobileIcon,
  Terminal,
  Palette,
  Cloud,
  CircleEllipsis

} from 'lucide-react';

const CategoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  all: (props) => <Grid className="w-5 h-5" {...props} />, 
  frontend: (props) => <Monitor className="w-5 h-5" {...props} />, 
  backend: (props) => <Server className="w-5 h-5" {...props} />, 
  database: (props) => <Database className="w-5 h-5" {...props} />, 
  mobile: (props) => <Smartphone className="w-5 h-5" {...props} />, 
  tools: (props) => <Wrench className="w-5 h-5" {...props} />, 
  languages: (props) => <Code className="w-5 h-5" {...props} />, 
  other: (props) => <CircleEllipsis className="w-5 h-5" {...props} />, 
};

const CategoryPill = ({ category, selected, onClick }: { 
  category: string; 
  selected: boolean; 
  onClick: () => void 
}) => {
  const Icon = CategoryIcons[category] || CategoryIcons['all'];
  const isAll = category === 'all';
  const label = isAll ? 'All' : category;

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative flex items-center justify-center p-3 rounded-full font-medium
        transition-all duration-300 ease-in-out group
        ${selected
          ? "bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent text-cyan-300"
          : "bg-transparent text-gray-400 hover:text-white"
        }
      `}
      style={{
        width: selected ? 'auto' : '44px',
        minWidth: '44px',
        height: '44px'
      }}
    >
      {/* Selected indicator */}
      {selected && (
        <motion.div
          layoutId="category-indicator"
          className="absolute inset-0 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"
        />
      )}
      
      {/* Hover ring */}
      <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-white/10 transition-colors" />
      
      <div className="flex items-center gap-2 relative z-10">
        <Icon className={selected ? "text-cyan-300" : "group-hover:text-white transition-colors"} />
        <AnimatePresence>
          {selected && (
            <motion.span
              initial={{ opacity: 0, width: 0, marginLeft: -4 }}
              animate={{ opacity: 1, width: 'auto', marginLeft: 4 }}
              exit={{ opacity: 0, width: 0, marginLeft: -4 }}
              className="whitespace-nowrap capitalize text-sm font-medium"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

const TechStackShowcase = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

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

  const categories = ["all", ...Object.keys(technologies)];

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

        {/* Enhanced Category Filter Pills */}
        <div className="relative mb-8">
          {/* Background decorative elements */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="flex flex-wrap justify-center gap-2 relative">
            {categories.map((cat) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="relative"
              >
                <CategoryPill
                  category={cat}
                  selected={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                />
                
                {/* Hover tooltip for unselected categories */}
                <AnimatePresence>
                  {hoveredCategory === cat && selectedCategory !== cat && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 
                        bg-gray-900 border border-white/10 rounded-md text-xs text-white 
                        whitespace-nowrap z-10"
                    >
                      <span className="capitalize">
                        {cat === 'all' ? 'All Technologies' : cat}
                      </span>
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-gray-900 rotate-45 border-b border-r border-white/10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          {/* Active category indicator */}
          <motion.div
            layoutId="category-background"
            className="absolute left-0 top-0 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-400/10 backdrop-blur-sm -z-10"
            style={{
              width: selectedCategory === 'all' ? '44px' : 
                     selectedCategory === 'frontend' ? '100px' :
                     selectedCategory === 'backend' ? '90px' :
                     selectedCategory === 'database' ? '110px' :
                     selectedCategory === 'mobile' ? '95px' :
                     selectedCategory === 'tools' ? '85px' :
                     selectedCategory === 'languages' ? '115px' :
                     selectedCategory === 'other' ? '90px' : '44px',
              height: '44px',
              transform: selectedCategory === 'all' ? 'translateX(0px)' :
                        selectedCategory === 'frontend' ? 'translateX(46px)' :
                        selectedCategory === 'backend' ? 'translateX(100px)' :
                        selectedCategory === 'database' ? 'translateX(154px)' :
                        selectedCategory === 'mobile' ? 'translateX(218px)' :
                        selectedCategory === 'tools' ? 'translateX(277px)' :
                        selectedCategory === 'languages' ? 'translateX(326px)' :
                        selectedCategory === 'other' ? 'translateX(395px)' : 'translateX(0px)',
            }}
          />
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredTechnologies.map((tech: Tech) => (
            <div
              key={tech.name}
              className="group relative"
              onMouseEnter={() => setActiveTooltip(tech.name)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 mx-auto flex items-center justify-center
                rounded-2xl bg-gradient-to-br from-[#f5f5f5] via-[#dcdcdc] to-[#b8b8b8]
                shadow-lg cursor-pointer border border-white/20 relative overflow-hidden"
              >
                {tech.imgSrc ? (
                  <img src={tech.imgSrc} alt={tech.name} className="w-9 h-9" />
                ) : (
                  <tech.icon className="w-8 h-8 text-gray-900" />
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
                        rounded-xl bg-gradient-to-br from-[#f5f5f5] via-[#dcdcdc] to-[#b8b8b8]"
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