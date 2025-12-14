import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title gradient-text">Get In Touch</h2>
        <div className="contact-content">
          <motion.div
            className="contact-card neon-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3>Let's work together</h3>
            <p>Ready to bring your ideas to life? Let's connect!</p>
            <div className="contact-buttons">
              <button className="neon-button">Email Me</button>
              <button className="neon-button">LinkedIn</button>
              <button className="neon-button">GitHub</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
