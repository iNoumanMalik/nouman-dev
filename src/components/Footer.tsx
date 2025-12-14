import { useEffect, useState } from "react";

const Footer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <h1 className="footer-main-heading">
          Let's build your next <br /> project together
        </h1>
        <div className="footer-content">
          <div className="footer-column">
            <h4 className="footer-heading">Primary</h4>
            <div className="footer-divider"></div>
            <ul className="footer-links">
              <li>
                <a href="#approach">Approach</a>
              </li>
              <li>
                <a href="#clients">Clients</a>
              </li>
              <li>
                <a href="#awards">Awards</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Go Deeper</h4>
            <div className="footer-divider"></div>
            <ul className="footer-links">
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">SOCIAL</h4>
            <div className="footer-divider"></div>
            <ul className="footer-links">
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">X</a>
              </li>
              <li>
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="#">GitHub</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">WANT TO SEE MY WORK?</h4>
            <div className="footer-divider"></div>
            <ul className="footer-links">
              <li>
                <a href="mailto:inoumanmalik@outlook.com">
                  inoumanmalik@outlook.com
                </a>
              </li>
              <li>
                <a href="tel:+923144221693">+92 314 4221693</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>
              &copy; 2025 Nouman. <br /> All rights reserved.
            </p>
            <p>
              Islamabad
              <br />
              {time.toLocaleTimeString()}
            </p>
            <p>
              I write code, break it, then fix it (sometimes).
              <br />
              ////////////////////////{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="background-signature">Nouman</div>
    </footer>
  );
};

export default Footer;
