import { Suspense, lazy } from "react";
import ScrollytellingHero from "../components/Hero";

const TechStack = lazy(() => import("../components/TechStack"));
const SkillsCloud = lazy(() => import("../components/TechStackShowcase"));
const Services = lazy(() => import("../components/Services"));
const Projects = lazy(() => import("../components/Projects"));
const Experience = lazy(() => import("../components/Experience"));
const GitHubContributions = lazy(() => import("../components/GitHubContributions"));
const Contact = lazy(() => import("../components/Contact"));

function Home() {
  return (
    <>
      <ScrollytellingHero />
      <Suspense fallback={null}>
        <TechStack />
        <SkillsCloud />
        <Services />
        <Projects />
        <Experience />
        <GitHubContributions />
        <Contact />
      </Suspense>
    </>
  );
}

export default Home;
