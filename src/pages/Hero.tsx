import { motion } from "framer-motion";
import Scene3D from "../components/ThreeDScene"; // Import the 3D scene

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-3d">
        <Scene3D />
      </div>
      <div className="hero-content">
        <motion.h1
          className="hero-title gradient-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Full Stack Developer
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Creating digital experiences with modern technologies
        </motion.p>
        <motion.button
          className="neon-button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          View My Work
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
