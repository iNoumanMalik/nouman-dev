import logo from "../assets/layers-ic.png";

const handleLogoClick = () => {
  window.location.href = "/";
};

const Navbar = () => {
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[1000] backdrop-blur-xl bg-white/1 border border-white/10 rounded-[50px] p-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-auto min-w-[320px] max-w-[90vw]">
      <div className="flex items-center justify-center h-full gap-2 md:gap-4">
        <div onClick={handleLogoClick} className="flex items-center gap-2 text-xl text-white ml-2 cursor-pointer shrink-0">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-semibold tracking-tight hidden sm:block">portfolio</span>
        </div>
        <div className="flex items-center px-2 gap-1 md:gap-2">
          <a href="#hero" className="text-white/60 no-underline font-medium text-sm transition-all duration-300 relative flex items-center px-3 py-2 rounded-lg hover:text-blue-400 ">
            Home
          </a>
          <a href="#about" className="text-white/60 no-underline font-medium text-sm transition-all duration-300 relative flex items-center px-3 py-2 rounded-lg hover:text-blue-400 ">
            About
          </a>
          <a href="#tech" className="text-white/60 no-underline font-medium text-sm transition-all duration-300 relative flex items-center px-3 py-2 rounded-lg hover:text-blue-400 ">
            Tech
          </a>
          <a href="#projects" className="text-white/60 no-underline font-medium text-sm transition-all duration-300 relative flex items-center px-3 py-2 rounded-lg hover:text-blue-400 ">
            Projects
          </a>
          <button className="rounded-[20px] border border-transparent px-5 py-2 text-sm font-bold text-black bg-white cursor-pointer transition-all duration-300 ml-2 hover:scale-105 hover:bg-gray-200 hover:border-white">Contact</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
