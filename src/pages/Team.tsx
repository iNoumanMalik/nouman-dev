import { useState, useMemo, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { teamHierarchy, type TeamMember } from "../data/team";
import "./Team.css";

/* ─── Avatar Component (Only Custom SVGs Now) ─── */
const Avatar = ({
  src,
  size = "md",
}: {
  src: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeMap = { sm: 40, md: 56, lg: 88 };
  const px = sizeMap[size];

  return (
    <div
      className="select-none overflow-hidden rounded-full bg-white/10"
      style={{ width: px, height: px }}
    >
      <img
        src={src}
        alt="avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

/* ─── Types ─── */
type BranchPath = string[];

/* ─── Stagger variants ─── */
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Compute ancestor paths ─── */
function collectPaths(
  node: TeamMember,
  path: string[] = [],
): BranchPath[] {
  const current = [...path, node.id];
  if (!node.children || node.children.length === 0) return [current];
  return node.children.flatMap((c) => collectPaths(c, current));
}

/* ─── Tree SVG Connector between levels ─── */
const LevelConnector = ({
  count,
  index,
  isActive,
}: {
  count: number;
  index: number;
  isActive: boolean;
}) => {
  const spacing = 100 / count;
  const center = spacing * index + spacing / 2;

  return (
    <svg
      className="w-full h-8 md:h-10"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
    >
      <motion.path
        d={count > 1
          ? `M${center} 0 L${center} 12`
          : `M50 0 L50 12`
        }
        stroke={isActive ? "var(--team-accent)" : "var(--team-border)"}
        strokeWidth="1.5"
        fill="none"
        opacity={isActive ? 0.7 : 0.25}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
      />
    </svg>
  );
};

/* ─── Member connection SVG ─── */
const MemberConnector = ({
  index,
  total,
}: {
  index: number;
  total: number;
}) => {
  if (total <= 1) return null;
  const spacing = 100 / total;
  const center = spacing * index + spacing / 2;

  return (
    <svg
      className="absolute top-0 left-0 w-full h-6"
      viewBox="0 0 100 24"
      preserveAspectRatio="none"
      style={{ transform: "translateY(-24px)" }}
    >
      {total > 1 && (
        <>
          {index === 0 && (
            <motion.path
              d={`M${center} 24 H${spacing * (total - 1) + spacing / 2}`}
              stroke="var(--team-border)"
              strokeWidth="1"
              fill="none"
              opacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
            />
          )}
          <motion.path
            d={`M${center} 0 L${center} 24`}
            stroke="var(--team-border)"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          />
        </>
      )}
    </svg>
  );
};

/* ─── Member Card ─── */
const MemberCard = ({
  member,
  isBranchActive,
  onHover,
  onLeave,
}: {
  member: TeamMember;
  isBranchActive: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
}) => {
  if (!member.avatar) {
    return null;
  }
  return (
    <motion.div
      variants={fadeIn}
      className="relative"
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={onLeave}
    >
      <div
        className={`
          relative rounded-2xl p-4 flex flex-col items-center gap-2.5
          min-w-[120px] w-full
          transition-all duration-500 cursor-default
          bg-white/60 dark:bg-white/[0.04]
          border
          ${isBranchActive
            ? "border-[var(--team-accent)]/40 shadow-lg shadow-[var(--team-accent)]/10 dark:shadow-[var(--team-accent)]/5"
            : "border-gray-200/50 dark:border-white/[0.06] shadow-sm"
          }
          backdrop-blur-xl
          hover:border-[var(--team-accent)]/30 hover:shadow-xl
          hover:-translate-y-0.5 hover:bg-white/70 dark:hover:bg-white/[0.07]
        `}
        style={{
          transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Avatar src={member.avatar} size="sm" />
        <div className="text-center">
          <p className="text-[13px] font-semibold text-gray-900 dark:text-white leading-tight">
            {member.name}
          </p>
          <p className="text-[10px] text-gray-500 dark:text-white/40 tracking-wide mt-0.5">
            {member.role}
          </p>
        </div>
        {isBranchActive && (
          <div
            className="absolute -inset-0.5 rounded-2xl opacity-30 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, var(--team-accent), transparent)",
              filter: "blur(4px)",
              zIndex: -1,
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

/* ─── Department Section ─── */
const DepartmentSection = ({
  department,
  isBranchActive,
  baseDelay,
  onHover,
  onLeave,
}: {
  department: TeamMember;
  isBranchActive: boolean;
  baseDelay: number;
  onHover: (id: string) => void;
  onLeave: () => void;
}) => {
  const members = department.children || [];
  const memberDelay = baseDelay + 0.3;

  if (!department.avatar) {
    return null;
  }

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center relative group"
      onMouseEnter={() => onHover(department.id)}
      onMouseLeave={onLeave}
    >
      <LevelConnector
        count={1}
        index={0}
        isActive={isBranchActive}
      />

      <div
        className={`
          relative rounded-2xl p-4 flex flex-col items-center gap-3
          w-full transition-all duration-500 cursor-default
          bg-white/70 dark:bg-white/[0.05]
          border
          ${isBranchActive
            ? "border-[var(--team-accent)]/50 shadow-lg shadow-[var(--team-accent)]/15 dark:shadow-[var(--team-accent)]/8"
            : "border-gray-200/50 dark:border-white/[0.06] shadow-sm"
          }
          backdrop-blur-xl
          hover:border-[var(--team-accent)]/40 hover:shadow-xl
          hover:-translate-y-0.5
        `}
        style={{
          transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {department.department && (
          <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wider bg-[var(--team-accent)]/10 text-[var(--team-accent)] border border-[var(--team-accent)]/20">
            {department.department}
          </span>
        )}
        <Avatar src={department.avatar} size="md" />
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
            {department.name}
          </p>
          <p className="text-[11px] text-gray-500 dark:text-white/40 tracking-wide mt-0.5">
            {department.role}
          </p>
        </div>
      </div>

      {members.length > 0 && (
        <div className="relative mt-0">
          <div
            className="team-connector-line"
            style={{
              opacity: isBranchActive ? 0.5 : 0.15,
              transition: "opacity 0.4s ease",
            }}
          />

          <div className="relative">
            <div
              className="flex flex-wrap justify-center gap-3 md:gap-4"
            >
              {members.map((member, idx) => (
                <div key={member.id} className="relative">
                  <MemberConnector
                    index={idx}
                    total={members.length}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: memberDelay + idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <MemberCard
                      member={member}
                      isBranchActive={isBranchActive}
                      onHover={onHover}
                      onLeave={onLeave}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

/* ─── Main Team Page ─── */
function Team() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const paths = useMemo(() => collectPaths(teamHierarchy), []);

  const isHighlighted = useCallback(
    (nodeId: string) => {
      if (!hoveredId) return false;
      return paths.some(
        (p) => p.includes(hoveredId) && p.includes(nodeId)
      );
    },
    [hoveredId, paths]
  );

  const departments = teamHierarchy.children || [];

  if (!teamHierarchy.avatar) {
    return null;
  }

  return (
    <div className="team-root min-h-screen">
      <div className="team-grain" aria-hidden />

      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--team-accent), transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 dark:opacity-8 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #a855f7, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="team-eyebrow">// team</p>
          <h1 className="team-heading">
            The People Behind
            <br />
            <span className="team-accent">the Code</span>
          </h1>
          <p className="team-sub font-mono text-xs md:text-sm tracking-wide">
            A collective of engineers, designers, and thinkers
            <br className="hidden sm:block" />
            building the future, one commit at a time.
          </p>
        </motion.div>

        {/* ── Tree ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          {/* CEO Node */}
          <motion.div
            variants={fadeIn}
            onMouseEnter={() => setHoveredId(teamHierarchy.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative mb-0 z-20"
          >
            <div
              className={`
                relative rounded-3xl p-6 md:p-8 flex flex-col items-center gap-4
                min-w-[200px] md:min-w-[260px]
                transition-all duration-500 cursor-default
                bg-white/70 dark:bg-white/[0.04]
                border
                ${isHighlighted(teamHierarchy.id)
                  ? "border-[var(--team-accent)]/60 shadow-2xl shadow-[var(--team-accent)]/20 dark:shadow-[var(--team-accent)]/10"
                  : "border-gray-200/40 dark:border-white/[0.06] shadow-lg"
                }
                backdrop-blur-2xl
                hover:border-[var(--team-accent)]/50
              `}
              style={{
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-3xl opacity-30 dark:opacity-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, var(--team-accent), #a855f7, transparent 70%)",
                  filter: "blur(8px)",
                  zIndex: -1,
                }}
              />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-[var(--team-accent)] text-white dark:text-black shadow-lg">
                Founder
              </span>
              <Avatar
                src={teamHierarchy.avatar}
                size="lg"
              />
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {teamHierarchy.name}
                </p>
                <p className="text-sm md:text-base text-gray-500 dark:text-white/50 tracking-wide mt-1">
                  {teamHierarchy.role}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Connector from CEO to departments */}
          <motion.div
            variants={fadeIn}
            className="relative w-full max-w-5xl"
          >
            <div className="flex flex-col items-center">
              <div className="team-connector-line" />

              <div className="team-connector-horizontal w-full">
                <div className="absolute inset-x-[5%] top-0 h-px bg-gradient-to-r from-transparent via-[var(--team-accent)]/20 to-transparent" />
                {departments.map((_, i) => (
                  <div
                    key={i}
                    className="team-connector-drop"
                    style={{
                      maxWidth: `${100 / departments.length}%`,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Departments Row */}
          <motion.div
            variants={staggerContainer}
            className="w-full max-w-6xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
              {departments.map((dept, idx) => (
                <div key={dept.id}>
                  <DepartmentSection
                    department={dept}
                    isBranchActive={isHighlighted(dept.id)}
                    baseDelay={0.2 + idx * 0.06}
                    onHover={(id) => setHoveredId(id)}
                    onLeave={() => setHoveredId(null)}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom fade */}
          <div className="h-32 w-full bg-gradient-to-t from-[var(--team-bg)] to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}

export default Team;
