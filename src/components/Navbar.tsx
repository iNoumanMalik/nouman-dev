import { useState, useEffect } from "react";
// import { useTheme } from "../context/ThemeContext";
import logo from "../assets/layers-ic.png";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  // const { theme } = useTheme();

  const handleLogoClick = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 0 },
        ease: "power2.inOut"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHomeClick = () => {
    navigate("/")
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-black/50 backdrop-blur-md py-4 shadow-sm dark:shadow-none" : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div onClick={handleLogoClick} className="flex items-center gap-2 text-xl text-gray-900 dark:text-white cursor-pointer shrink-0">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          <span onClick={handleHomeClick} className="font-semibold tracking-tight hidden sm:block">portfolio</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 md:gap-4">
          {["TechStack", "Services", "Projects", "Experience"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
              className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest font-mono"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="ml-4 rounded-[20px] border border-gray-200 dark:border-transparent px-5 py-2 text-sm font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-800 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-blue-600 dark:hover:border-gray-600"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
