import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Import the Inter font from Google Fonts
 

// Initialize GSAP ScrollTrigger
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// // Enable smooth scrolling for the whole document
// document.documentElement.style.scrollBehavior = 'smooth';

// // Set up a root-level container with proper styling
// const rootElement = document.getElementById('root');
// if (rootElement) {
//   rootElement.className = 'min-h-screen bg-black text-white';
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
