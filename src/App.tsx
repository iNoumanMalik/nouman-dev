import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css"; // Global styles

// Import Components and Pages
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Companies from "./components/Companies";
import GitHubContributions from "./components/GitHubContributions";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll setup
    // This logic remains here as it controls the animation for all sections on the page.
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            // You might add markers: true for debugging ScrollTrigger setup
          },
        }
      );
    });
  }, []);

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
  );
}

export default App;