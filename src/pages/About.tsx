import { useEffect, useRef, useState } from "react";
import "./About.css";

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Timeline data ─── */
const timeline = [
  {
    year: "2019",
    label: "Curiosity",
    desc: "Started exploring web development — HTML, CSS, the basics of how the internet is built.",
  },
  {
    year: "2021",
    label: "Development",
    desc: "Built first full-stack applications. Learned JavaScript deeply and fell in love with React.",
  },
  {
    year: "2023",
    label: "Systems Thinking",
    desc: "Shifted focus to performance, architecture, and building things that scale with intention.",
  },
  {
    year: "2024",
    label: "AI Integration",
    desc: "Exploring intelligent interfaces and automation — where engineering meets emerging intelligence.",
  },
];

/* ─── Process cards ─── */
const process = [
  {
    num: "01",
    title: "Problem First",
    body: "I start by understanding the real problem before choosing tools or frameworks.",
  },
  {
    num: "02",
    title: "Systems Thinking",
    body: "I design software as interconnected systems rather than isolated components.",
  },
  {
    num: "03",
    title: "Performance Matters",
    body: "Clean architecture and optimized rendering are core priorities in my work.",
  },
  {
    num: "04",
    title: "Continuous Learning",
    body: "Technology evolves fast. I actively explore new tools and approaches to stay ahead.",
  },
];

/* ─── Outside items ─── */
const outside = [
  { icon: "⚡", label: "Tech exploration" },
  { icon: "🫆", label: "System design" },
  { icon: "📚", label: "Reading" },
  { icon: "🌍", label: "AI research" },
];

/* ─── Stats ─── */
const stats = [
  { value: "3+", label: "Years Coding" },
  { value: "20+", label: "Projects" },
  { value: "FE + AI", label: "Focus" },
  { value: "PK", label: "Pakistan" },
];

/* ══════════════════════════════════════════════════ */
const About = () => {
  const hero = useInView(0.1);
  const story = useInView(0.1);
  const howI = useInView(0.1);
  const philos = useInView(0.1);
  const outside_ = useInView(0.1);
  const cta = useInView(0.1);

  return (
    <section id="about" className="ab-root">
      {/* ── Noise grain overlay ── */}
      <div className="ab-grain" aria-hidden />

      {/* ══ 1. HERO ══ */}
      <div
        ref={hero.ref}
        className={`ab-section ab-hero ${hero.visible ? "ab--in" : ""}`}
      >
        <div className="ab-hero-grid">
          {/* Avatar column */}
          <div className="ab-avatar-wrap">
            <div className="ab-avatar">
              <div className="ab-avatar-ring" />
              <div className="ab-avatar-inner">
                <svg
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ab-avatar-svg"
                >
                  {/* Geometric architect avatar */}
                  <circle
                    cx="60"
                    cy="40"
                    r="22"
                    stroke="var(--ab-accent)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="40"
                    r="14"
                    fill="var(--ab-accent)"
                    opacity="0.12"
                  />
                  <circle
                    cx="60"
                    cy="38"
                    r="9"
                    fill="var(--ab-fg)"
                    opacity="0.9"
                  />
                  <ellipse
                    cx="60"
                    cy="90"
                    rx="28"
                    ry="18"
                    stroke="var(--ab-accent)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <ellipse
                    cx="60"
                    cy="90"
                    rx="20"
                    ry="12"
                    fill="var(--ab-fg)"
                    opacity="0.08"
                  />
                  <line
                    x1="60"
                    y1="62"
                    x2="60"
                    y2="72"
                    stroke="var(--ab-fg)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="44"
                    y1="75"
                    x2="76"
                    y2="75"
                    stroke="var(--ab-accent)"
                    strokeWidth="1"
                  />
                  {/* Circuit nodes */}
                  <circle
                    cx="20"
                    cy="20"
                    r="3"
                    fill="var(--ab-accent)"
                    opacity="0.4"
                  />
                  <circle
                    cx="100"
                    cy="20"
                    r="3"
                    fill="var(--ab-accent)"
                    opacity="0.4"
                  />
                  <circle
                    cx="20"
                    cy="100"
                    r="3"
                    fill="var(--ab-accent)"
                    opacity="0.25"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="3"
                    fill="var(--ab-accent)"
                    opacity="0.25"
                  />
                  <line
                    x1="23"
                    y1="20"
                    x2="37"
                    y2="20"
                    stroke="var(--ab-accent)"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                  <line
                    x1="83"
                    y1="20"
                    x2="97"
                    y2="20"
                    stroke="var(--ab-accent)"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                  <line
                    x1="20"
                    y1="23"
                    x2="20"
                    y2="37"
                    stroke="var(--ab-accent)"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                  <line
                    x1="100"
                    y1="23"
                    x2="100"
                    y2="37"
                    stroke="var(--ab-accent)"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                </svg>
              </div>
              <div className="ab-avatar-label">NM</div>
            </div>

            {/* Stats */}
            <div className="ab-stats">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="ab-stat"
                  style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                >
                  <span className="ab-stat-val">{s.value}</span>
                  <span className="ab-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Text column */}
          <div className="ab-hero-text">
            <p className="ab-eyebrow">// about</p>
            <h1 className="ab-hero-heading">
              About the
              <br />
              <span className="ab-accent-text">Architect</span>
            </h1>
            <p className="ab-hero-sub">
              Software Engineer focused on building intelligent,
              <br />
              high-performance web systems.
            </p>
            <p className="ab-hero-body">
              I design and build modern web applications where performance,
              clarity, and intelligent automation meet.
            </p>
            <p className="ab-hero-body">
              My focus lies at the intersection of frontend engineering,
              scalable systems, and emerging AI technologies.
            </p>
            <div className="ab-hero-line" />
          </div>
        </div>
      </div>

      {/* ══ 2. MY STORY ══ */}
      <div
        ref={story.ref}
        className={`ab-section ab-story ${story.visible ? "ab--in" : ""}`}
      >
        <div className="ab-section-label">02 — Journey</div>
        <h2 className="ab-section-heading">My Story</h2>
        <div className="ab-story-grid">
          <div className="ab-story-text">
            <p>
              My journey into software started with curiosity about how
              digital systems actually work.
            </p>
            <p>
              What began as simple frontend experiments quickly evolved into
              building full applications and exploring how intelligent systems
              can enhance human workflows.
            </p>
            <p>
              Today I focus on designing scalable interfaces and systems that
              balance performance, clarity, and real-world usability.
            </p>
          </div>
          <div className="ab-timeline">
            {timeline.map((t, i) => (
              <div
                key={i}
                className="ab-tl-item"
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                <div className="ab-tl-marker">
                  <div className="ab-tl-dot" />
                  <div className="ab-tl-line" />
                </div>
                <div className="ab-tl-content">
                  <div className="ab-tl-year">{t.year}</div>
                  <div className="ab-tl-label">{t.label}</div>
                  <div className="ab-tl-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 3. HOW I WORK ══ */}
      <div
        ref={howI.ref}
        className={`ab-section ab-process ${howI.visible ? "ab--in" : ""}`}
      >
        <div className="ab-section-label">03 — Process</div>
        <h2 className="ab-section-heading">How I Work</h2>
        <div className="ab-process-grid">
          {process.map((p, i) => (
            <div
              key={i}
              className="ab-process-card"
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              <span className="ab-process-num">{p.num}</span>
              <h3 className="ab-process-title">{p.title}</h3>
              <div className="ab-process-divider" />
              <p className="ab-process-body">{p.body}</p>
              <div className="ab-process-corner tl" />
              <div className="ab-process-corner tr" />
              <div className="ab-process-corner bl" />
              <div className="ab-process-corner br" />
            </div>
          ))}
        </div>
      </div>

      {/* ══ 4. TECH PHILOSOPHY ══ */}
      <div
        ref={philos.ref}
        className={`ab-section ab-philos ${philos.visible ? "ab--in" : ""}`}
      >
        <div className="ab-philos-inner">
          <div className="ab-section-label">04 — Philosophy</div>
          <div className="ab-philos-quote">
            Technology should
            <br />
            feel <span className="ab-accent-text">invisible</span>.
          </div>
          <div className="ab-philos-text">
            <p>
              The best systems are the ones users never notice —<br />
              they simply work, adapt, and scale naturally.
            </p>
            <p>
              My goal is to design software that is not only functional but
              also resilient, maintainable, and future-ready.
            </p>
          </div>
          <div className="ab-philos-bg-text" aria-hidden>
            PHILOSOPHY
          </div>
        </div>
      </div>

      {/* ══ 5. OUTSIDE THE CODE ══ */}
      <div
        ref={outside_.ref}
        className={`ab-section ab-outside ${outside_.visible ? "ab--in" : ""}`}
      >
        <div className="ab-section-label">05 — Human</div>
        <h2 className="ab-section-heading">Outside the Code</h2>
        <div className="ab-outside-grid">
          <div className="ab-outside-text">
            <p>
              Outside of development, I enjoy exploring emerging technology
              trends, studying system design, and building experimental
              projects.
            </p>
            <p>
              I believe curiosity is the most powerful skill an engineer can
              have.
            </p>
          </div>
          <div className="ab-outside-cards">
            {outside.map((o, i) => (
              <div
                key={i}
                className="ab-outside-card"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <span className="ab-outside-icon">{o.icon}</span>
                <span className="ab-outside-label">{o.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 6. CTA ══ */}
      <div
        ref={cta.ref}
        className={`ab-section ab-cta ${cta.visible ? "ab--in" : ""}`}
      >
        <div className="ab-cta-inner">
          <div className="ab-section-label">06 — Connect</div>
          <h2 className="ab-cta-heading">
            Let's Build Something
            <br />
            <span className="ab-accent-text">Meaningful</span>
          </h2>
          <p className="ab-cta-body">
            If you're working on an interesting project or need help building
            intelligent web systems, I'd love to connect.
          </p>
          <div className="ab-cta-btns">
            <a href="#projects" className="ab-btn ab-btn--primary">
              View Projects
            </a>
            <a
              href="mailto:inoumanmalik@outlook.com"
              className="ab-btn ab-btn--ghost"
            >
              Contact Me
            </a>
          </div>
          <div className="ab-cta-decoration" aria-hidden>
            {"// let's work = () => greatThings();"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
