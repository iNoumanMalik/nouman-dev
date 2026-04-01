import { useState, useEffect } from "react";
// import { useTheme } from "../context/ThemeContext";
import logo from "../assets/layers-ic.png";
import gsap from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleHomeClick = () => {
    navigate("/")
  }

  const navItems = ["TechStack", "Services", "Projects", "Experience"];

  const handleRouteNavigation = (path: "/" | "/about") => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== path) {
      navigate(path);
      return;
    }

    if (path === "/") {
      gsap.to(window, { duration: 0.8, scrollTo: 0, ease: "power2.inOut" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-black/50 backdrop-blur-md py-4 shadow-sm dark:shadow-none" : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <div onClick={handleLogoClick} className="flex items-center gap-2 text-xl text-gray-900 dark:text-white cursor-pointer shrink-0">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          <span onClick={handleHomeClick} className="font-semibold tracking-tight hidden sm:block">portfolio</span>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-black/70 text-gray-900 dark:text-white p-2.5 backdrop-blur-sm"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 md:gap-4">
          {navItems.map((item) => (
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

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute left-4 right-4 top-[calc(100%+0.5rem)] rounded-2xl border border-gray-200 dark:border-white/10 bg-white/95 dark:bg-black/90 backdrop-blur-md shadow-xl transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <div className="p-3 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => handleRouteNavigation("/")}
            className="px-3 py-3 rounded-xl text-sm font-semibold text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 uppercase tracking-wider"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleRouteNavigation("/about")}
            className="px-3 py-3 rounded-xl text-sm font-semibold text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 uppercase tracking-wider"
          >
            About
          </button>

          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                handleNavClick(e, `#${item.toLowerCase()}`);
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 uppercase tracking-wider"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              handleNavClick(e, "#contact");
              setIsMobileMenuOpen(false);
            }}
            className="mt-1 rounded-xl border border-gray-200 dark:border-white/10 px-3 py-3 text-sm font-bold text-center text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
