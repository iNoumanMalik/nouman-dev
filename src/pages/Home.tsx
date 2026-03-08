
import ScrollytellingHero from "../components/Hero";
import TechStack from "../components/TechStack";
import SkillsCloud from "../components/TechStackShowcase";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import GitHubContributions from "../components/GitHubContributions";
import Contact from "../components/Contact";

function Home() {
  return (
    <>
      <ScrollytellingHero />
      <TechStack />
      <SkillsCloud />
      <Services />
      <Projects />
      <Experience />
      <GitHubContributions />
      <Contact />
    </>
  );
}

export default Home;
