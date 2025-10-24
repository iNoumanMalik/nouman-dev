
const GitHubContributions = () => {
  return (
    <section id="github" className="section">
      <div className="container">
        <h2 className="section-title gradient-text">GitHub Contributions</h2>
        <div className="github-card neon-card neon-green">
          <div className="contributions-grid">
            {Array.from({ length: 365 }, (_, i) => (
              <div
                key={i}
                className={`contribution-day ${
                  Math.random() > 0.7 ? "active" : ""
                }`}
              />
            ))}
          </div>
          <p className="contributions-text">
            500+ contributions in the last year
          </p>
        </div>
      </div>
    </section>
  );
};

export default GitHubContributions;
