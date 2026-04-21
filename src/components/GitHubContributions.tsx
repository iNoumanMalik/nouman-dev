import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useGithubContributions } from "../hooks/useGithubContributions";

const GitHubContributions = () => {
  const { theme } = useTheme();
  const { data, loading, error } = useGithubContributions();
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
      <section id="github" className="section bg-gray-100 dark:bg-[#050505] transition-colors duration-300 py-20">
        <div className="max-w-[1200px] mx-auto px-[20px] w-full box-border">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8 text-gray-900 dark:text-white">
            Github{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 dark:from-green-200 dark:to-green-500 ">
              Contributions
            </span>
          </h2>
          <div className="github-card bg-white dark:bg-black rounded-lg p-8 border border-green-500/20 dark:border-green-500/30 shadow-xl dark:shadow-green-500/20 flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mb-4" />
            <p className="text-sm opacity-70 text-gray-900 dark:text-white">Analyzing temporal code signatures...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github" className="section bg-gray-100 dark:bg-[#050505] transition-colors duration-300 py-20">
        <div className="max-w-[1200px] mx-auto px-[20px] w-full box-border text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8 text-gray-900 dark:text-white">
            Github{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 ">
              Archive
            </span>
          </h2>
          <div className="github-card bg-white dark:bg-black rounded-lg p-8 border border-red-500/20 dark:border-red-500/30 shadow-xl dark:shadow-red-500/20">
            <p className="text-red-500 mb-2">Failed to synchronize with GitHub orbital servers.</p>
            <p className="text-xs text-gray-500">{error}</p>
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
    <section id="github" className="section bg-gray-100 dark:bg-[#050505] transition-colors duration-300 py-20">
      <div className="max-w-[1200px] mx-auto px-[20px] w-full box-border">
        <h2 className="text-center text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8 text-gray-900 dark:text-white">
          Github{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 dark:from-green-200 dark:to-green-500 ">
            Contributions
          </span>
        </h2>

        <div className="github-card bg-white dark:bg-black rounded-lg p-8 border border-green-500/20 dark:border-green-500/30 shadow-xl dark:shadow-green-500/20">
          <div className="flex gap-3 justify-center">
            {/* Day labels */}
            {data ?
              <div className="flex flex-col justify-between text-xs text-gray-400 dark:opacity-60 pt-5">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div> : ""
            }


            {/* Contribution graph */}
            <div className="overflow-x-auto">
              {/* Month labels */}
              <div className="relative text-xs text-gray-400 dark:opacity-60 mb-1 h-4">
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
                            backgroundColor: day.contributionCount === 0 ? (theme === 'dark' ? "#161b22" : "#ebedf0") : day.color,
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
          <p className="contributions-text mt-4 text-center text-gray-500 dark:text-gray-400">
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