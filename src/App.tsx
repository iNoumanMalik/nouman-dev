import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="gradient-text">Portfolio</span>
        </div>
        <div className="nav-links">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#tech" className="nav-link">Tech</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </div>
    </nav>
  )
}

// 3D Scene Component
const Scene3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#00ffff"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0}
        />
      </Sphere>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

// Hero Section
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
  )
}

// About Section
const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title gradient-text">About Me</h2>
        <div className="neon-card">
          <p>
            I'm a passionate full-stack developer with expertise in modern web technologies. 
            I love creating innovative solutions and bringing ideas to life through code.
          </p>
        </div>
      </div>
    </section>
  )
}

// Tech Stack Section
const TechStack = () => {
  const technologies = [
    { name: 'React', color: '#00ffff' },
    { name: 'TypeScript', color: '#ff0080' },
    { name: 'Node.js', color: '#00ff00' },
    { name: 'Python', color: '#ffff00' },
    { name: 'Three.js', color: '#ff4000' },
    { name: 'MongoDB', color: '#8000ff' }
  ]

  return (
    <section id="tech" className="section">
      <div className="container">
        <h2 className="section-title gradient-text">Tech Stack</h2>
        <div className="tech-grid">
          {technologies.map((tech, index) => (
            <motion.div 
              key={tech.name}
              className="tech-card neon-card"
              style={{ '--neon-color': tech.color } as React.CSSProperties}
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
  )
}

// Projects Section
const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      color: '#00ffff'
    },
    {
      title: 'AI Chat Application',
      description: 'Real-time chat app with AI integration',
      color: '#ff0080'
    },
    {
      title: '3D Portfolio Website',
      description: 'Interactive portfolio with Three.js animations',
      color: '#00ff00'
    }
  ]

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title gradient-text">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              className="project-card neon-card"
              style={{ '--neon-color': project.color } as React.CSSProperties}
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
  )
}

// Companies Section
const Companies = () => {
  const companies = ['TechCorp', 'InnovateLab', 'DigitalSolutions', 'StartupHub']

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
  )
}

// GitHub Contributions Section
const GitHubContributions = () => {
  return (
    <section id="github" className="section">
      <div className="container">
        <h2 className="section-title gradient-text">GitHub Contributions</h2>
        <div className="github-card neon-card neon-green">
          <div className="contributions-grid">
            {Array.from({ length: 365 }, (_, i) => (
              <div 
                key={i} 
                className={`contribution-day ${Math.random() > 0.7 ? 'active' : ''}`}
              />
            ))}
          </div>
          <p className="contributions-text">500+ contributions in the last year</p>
        </div>
      </div>
    </section>
  )
}

// Contact Section
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
  )
}

// Footer Section
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-logo">
              <span className="gradient-text">Portfolio</span>
            </div>
            <p className="footer-description">
              Crafting digital experiences with passion and precision. 
              Let's build something amazing together.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">
                <span>GitHub</span>
              </a>
              <a href="#" className="social-link">
                <span>LinkedIn</span>
              </a>
              <a href="#" className="social-link">
                <span>Twitter</span>
              </a>
              <a href="#" className="social-link">
                <span>Email</span>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#tech">Tech Stack</a></li>
                <li><a href="#projects">Projects</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Web Development</a></li>
                <li><a href="#">UI/UX Design</a></li>
                <li><a href="#">Mobile Apps</a></li>
                <li><a href="#">Consulting</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Contact</h4>
              <ul>
                <li><a href="#">hello@portfolio.dev</a></li>
                <li><a href="#">+1 (555) 123-4567</a></li>
                <li><a href="#">San Francisco, CA</a></li>
                <li><a href="#">Available for hire</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; 2024 Portfolio. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const appRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Smooth scroll setup
    const sections = document.querySelectorAll('.section')
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  }, [])

  return (
    <div className="app" ref={appRef}>
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Companies />
      <GitHubContributions />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
