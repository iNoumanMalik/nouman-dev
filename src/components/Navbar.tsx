import logo from "../assets/layers-ic.png"; 

const handleLogoClick = () => {
  window.location.href = "/";
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div onClick={handleLogoClick} className="nav-logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <span className=".logo">portfolio</span>
        </div>
        <div className="nav-links">
          <a href="#hero" className="nav-link">
            Home
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#tech" className="nav-link">
            Tech
          </a>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <button className="nav-button">Contact</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
