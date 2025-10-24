import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      color: "#00ffff",
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat app with AI integration",
      color: "#ff0080",
    },
    {
      title: "3D Portfolio Website",
      description: "Interactive portfolio with Three.js animations",
      color: "#00ff00",
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title gradient-text">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card neon-card"
              style={{ "--neon-color": project.color } as React.CSSProperties}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button className="project-button">View Project</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
