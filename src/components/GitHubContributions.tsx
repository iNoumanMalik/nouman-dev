import { motion } from "framer-motion";
import { useState } from "react";
import { useGithubContributions } from "../hooks/useGithubContributions";

const GitHubContributions = () => {
  const { data, loading } = useGithubContributions("iNoumanMalik");
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
    count: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: "",
    count: 0
  });

  if (loading) {
    return (
      <section id="github" className="section">
        <div className="container">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
            Github{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 ">
              Contributions
            </span>
          </h2>
          <div className="github-card neon-card neon-green">
            <p className="text-sm opacity-70">Loading contributions…</p>
          </div>
        </div>
      </section>
    );
  }

  const weeks = data?.weeks ?? [];
  const totalContributions = weeks
    .flatMap((week) => week.contributionDays)
    .reduce((sum, day) => sum + day.contributionCount, 0);

  // Get month labels - show month name when it's the first week that contains days from that month
  const getMonthLabels = () => {
    const labels: { month: string; weekIndex: number }[] = [];
    const seenMonths = new Set<string>();

    weeks.forEach((week, weekIndex) => {
      // Check the first day of the week to determine the month
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();
        const monthKey = `${date.getFullYear()}-${month}`;
        const monthName = date.toLocaleDateString("en-US", { month: "short" });
        
        // Skip December from previous year (month 11) if it appears at the start
        // Only show months starting from January (month 0) or if we've already seen January
        if (!seenMonths.has(monthKey) && weekIndex < weeks.length - 2) {
          if (month !== 11 || seenMonths.size > 0) {
            seenMonths.add(monthKey);
            labels.push({
              month: monthName,
              weekIndex,
            });
          }
        }
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();

  const handleMouseEnter = (e: React.MouseEvent, day: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const formattedDate = new Date(day.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      content: formattedDate,
      count: day.contributionCount
    });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <section id="github" className="section">
      <div className="max-w-[1200px] mx-auto px-[20px] w-full box-border">
      <h2 className="text-center text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
            Github{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-500 ">
              Contributions
            </span>
          </h2>

        <div className="github-card rounded-lg p-8 border border-green-500/30 shadow-lg shadow-green-500/20">
          <div className="flex gap-3 justify-center">
            {/* Day labels */}
            <div className="flex flex-col justify-between text-xs opacity-60 pt-5">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Contribution graph */}
            <div className="overflow-x-auto">
              {/* Month labels */}
              <div className="relative text-xs opacity-60 mb-1 h-4">
                {monthLabels.map(({ month, weekIndex }) => (
                  <span
                    key={`${month}-${weekIndex}`}
                    className="absolute"
                    style={{ left: `${(weekIndex - 1) * 15}px` }}
                  >
                    {month}
                  </span>
                ))}
              </div>

              {/* Contribution grid */}
              <div className="flex gap-[3px]">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.contributionDays.map((day, dayIndex) => {
                      // Enhance color visibility
                      const enhanceColor = (color: string) => {
                        if (!color || color === "#161b22") return "#161b22";
                        // Parse hex color and increase brightness
                        const hex = color.replace("#", "");
                        const r = parseInt(hex.substr(0, 2), 16);
                        const g = parseInt(hex.substr(2, 2), 16);
                        const b = parseInt(hex.substr(4, 2), 16);
                        
                        // Increase brightness by 40%
                        const brighten = (val: number) => Math.min(255, Math.floor(val * 1.4));
                        
                        return `rgb(${brighten(r)}, ${brighten(g)}, ${brighten(b)})`;
                      };

                      return (
                        <motion.div
                          key={day.date}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                          whileHover={{ scale: 1.3 }}
                          onMouseEnter={(e) => handleMouseEnter(e, day)}
                          onMouseLeave={handleMouseLeave}
                          className="w-[12px] h-[12px] rounded-sm cursor-pointer"
                          style={{
                            backgroundColor: day.color || "#161b22",
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="contributions-text mt-4 text-center">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(-50%, -100%)"
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg shadow-xl border border-gray-700 text-sm whitespace-nowrap"
          >
            <div className="font-semibold">
              {tooltip.count} {tooltip.count === 1 ? "contribution" : "contributions"}
            </div>
            <div className="text-gray-400 text-xs">{tooltip.content}</div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
export default GitHubContributions;