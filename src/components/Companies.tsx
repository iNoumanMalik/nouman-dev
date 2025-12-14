import { motion } from "framer-motion";

const Companies = () => {
  const companies = [
    "TechCorp",
    "InnovateLab",
    "DigitalSolutions",
    "StartupHub",
  ];

  return (
    <section id="companies" className="section">
      <div className="container">
        <h2 className="section-title gradient-text">Companies Worked With</h2>
        <div className="companies-grid">
          {companies.map((company, index) => (
            <motion.div
              key={company}
              className="company-card neon-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3>{company}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
