import { motion } from "framer-motion";

const TechStack = () => {
  const technologies = [
    { name: "React", color: "#00ffff" },
    { name: "TypeScript", color: "#ff0080" },
    { name: "Node.js", color: "#00ff00" },
    { name: "Python", color: "#ffff00" },
    { name: "Three.js", color: "#ff4000" },
    { name: "MongoDB", color: "#8000ff" },
  ];

  return (
    <section id="tech" className="section">
      <div className="container">
        <h2 className="section-title gradient-text">Tech Stack</h2>
        <div className="tech-grid">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="tech-card neon-card"
              style={{ "--neon-color": tech.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3>{tech.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
