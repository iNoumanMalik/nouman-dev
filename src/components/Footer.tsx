import { useEffect, useState, useCallback } from "react";

type ToastType = "copy" | "soon";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const Footer = () => {
  const [time, setTime] = useState(new Date());
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const handleCopy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        showToast("Copied to clipboard!", "copy");
      } catch {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        showToast("Copied to clipboard!", "copy");
      }
    },
    [showToast],
  );

  const handleComingSoon = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
      e.preventDefault();
      showToast(`"${label}" is coming soon.`, "soon");
    },
    [showToast],
  );

  return (
    <>
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.type}`}>
            <span className="toast-icon">
              {toast.type === "copy" ? "✓" : "◎"}
            </span>
            {toast.message}
          </div>
        ))}
      </div>

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
                  <a
                    href="#approach"
                    onClick={(e) => handleComingSoon(e, "Approach")}
                  >
                    Approach
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    // onClick={(e) => handleComingSoon(e, "Clients")}
                  >
                    Clients
                  </a>
                </li>
                <li>
                  <a
                    href="#awards"
                    onClick={(e) => handleComingSoon(e, "Awards")}
                  >
                    Awards
                  </a>
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
                  <a
                    href="/about"
                    // onClick={(e) => handleComingSoon(e, "About")}
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">SOCIAL</h4>
              <div className="footer-divider"></div>
              <ul className="footer-links">
                <li>
                  <a href="https://www.instagram.com/nomii.official">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://x.com/home">X</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/nouman-me/">LinkedIn</a>
                </li>
                <li>
                  <a href="https://github.com/iNoumanMalik">GitHub</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">WANT TO SEE MY WORK?</h4>
              <div className="footer-divider"></div>
              <ul className="footer-links">
                <li>
                  <a
                    href="mailto:inoumanmalik@outlook.com"
                    className="copyable"
                    title="Click to copy email"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy("inoumanmalik@outlook.com");
                    }}
                  >
                    inoumanmalik@outlook.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+923144221693"
                    className="copyable"
                    title="Click to copy phone"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy("+92 314 4221693");
                    }}
                  >
                    +92 314 4221693
                    
                  </a>
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
    </>
  );
};

export default Footer;
