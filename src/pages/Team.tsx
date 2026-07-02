import { useState, useMemo, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { teamHierarchy, type TeamMember } from "../data/team";
import "./Team.css";

/* ─── Deterministic hash for variant selection ─── */
function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/* ─── Avatar variant types ─── */
type AvatarVariant = {
  skin: { light: string; mid: string; shadow: string };
  hairColor: string;
  hairPath: string;
  hairBackPath?: string; // For long hair that goes behind the shoulders
  eyeColor: string;
  accent: string;
  shirt: string;
  hasGlasses: boolean;
  mouth: string;
};

// Clean, geometric minimalist hair paths
const HAIR_MALE_1 = "M30 40 C30 15 70 15 70 40 Q65 22 50 22 Q35 22 30 40 Z"; // Short neat
const HAIR_MALE_2 = "M28 42 C28 10 72 10 72 42 Q68 25 50 25 Q32 25 28 42 Z"; // Slightly fuller
const HAIR_MALE_3 = "M32 38 C32 18 68 18 68 38 Q50 15 32 38 Z"; // Swept up
const HAIR_MALE_4 = "M30 45 C28 20 72 20 70 45 Q65 25 50 25 Q35 25 30 45 Z"; // Textured

const HAIR_FEMALE_1 = "M50 16 C25 16 22 40 20 65 L32 65 C32 40 38 28 50 28 C62 28 68 40 68 65 L80 65 C78 40 75 16 50 16 Z"; // Long straight
const HAIR_FEMALE_2 = "M26 48 C26 12 74 12 74 48 C74 58 66 62 64 50 C64 28 36 28 36 50 C34 62 26 58 26 48 Z"; // Bob cut
const HAIR_FEMALE_3 = "M28 45 C25 15 75 15 72 45 Q68 28 50 28 Q32 28 28 45 Z"; // Shoulder sweep (front)
const HAIR_FEMALE_3_BACK = "M28 45 L22 70 L78 70 L72 45 Z"; // Shoulder sweep (back)
const HAIR_FEMALE_4 = "M30 35 C30 10 70 10 70 35 C75 40 75 55 68 60 C68 45 65 30 50 30 C35 30 32 45 32 60 C25 55 25 40 30 35 Z"; // Curly/Voluminous

const MOUTH_SMILE = "M 44 48 Q 50 53 56 48";
const MOUTH_NEUTRAL = "M 45 49 Q 50 50 55 49";
const MOUTH_SMIRK = "M 44 49 Q 50 51 56 47";

const MALE_VARIANTS: AvatarVariant[] = [
  {
    skin: { light: "#f5d0b0", mid: "#e8bca0", shadow: "#d4a88c" },
    hairColor: "#2a1d14",
    hairPath: HAIR_MALE_1,
    eyeColor: "#2a1d14",
    accent: "#3b82f6",
    shirt: "#1e293b",
    hasGlasses: false,
    mouth: MOUTH_SMILE,
  },
  {
    skin: { light: "#e8b898", mid: "#dba880", shadow: "#c99870" },
    hairColor: "#0f0f1e",
    hairPath: HAIR_MALE_2,
    eyeColor: "#0f0f1e",
    accent: "#10b981",
    shirt: "#064e3b",
    hasGlasses: true,
    mouth: MOUTH_NEUTRAL,
  },
  {
    skin: { light: "#f8d5b8", mid: "#ecc8a8", shadow: "#dbb898" },
    hairColor: "#4a2518",
    hairPath: HAIR_MALE_3,
    eyeColor: "#4a2518",
    accent: "#f59e0b",
    shirt: "#78350f",
    hasGlasses: false,
    mouth: MOUTH_SMIRK,
  },
  {
    skin: { light: "#c09068", mid: "#a07048", shadow: "#805038" },
    hairColor: "#1a0e08",
    hairPath: HAIR_MALE_4,
    eyeColor: "#1a0e08",
    accent: "#8b5cf6",
    shirt: "#2e1065",
    hasGlasses: false,
    mouth: MOUTH_SMILE,
  },
];

const FEMALE_VARIANTS: AvatarVariant[] = [
  {
    skin: { light: "#f8d5c0", mid: "#ecc8b0", shadow: "#dbb09a" },
    hairColor: "#2a0e18",
    hairPath: HAIR_FEMALE_1,
    eyeColor: "#2a0e18",
    accent: "#a855f7",
    shirt: "#4a044e",
    hasGlasses: false,
    mouth: MOUTH_SMILE,
  },
  {
    skin: { light: "#e0b090", mid: "#c09070", shadow: "#a07050" },
    hairColor: "#4a1518",
    hairPath: HAIR_FEMALE_2,
    eyeColor: "#2a0508",
    accent: "#ec4899",
    shirt: "#831843",
    hasGlasses: true,
    mouth: MOUTH_SMIRK,
  },
  {
    skin: { light: "#f0c8b0", mid: "#e0b8a0", shadow: "#d0a890" },
    hairColor: "#1a1a2e",
    hairPath: HAIR_FEMALE_3,
    hairBackPath: HAIR_FEMALE_3_BACK,
    eyeColor: "#1a1a2e",
    accent: "#3b82f6",
    shirt: "#172554",
    hasGlasses: false,
    mouth: MOUTH_SMILE,
  },
  {
    skin: { light: "#f2d4b8", mid: "#e6c4a8", shadow: "#d6b498" },
    hairColor: "#5c2d1a",
    hairPath: HAIR_FEMALE_4,
    eyeColor: "#3a1a0e",
    accent: "#10b981",
    shirt: "#022c22",
    hasGlasses: false,
    mouth: MOUTH_NEUTRAL,
  },
];

const NEUTRAL_VARIANTS: AvatarVariant[] = [
  {
    skin: { light: "#f0c8a8", mid: "#e0b898", shadow: "#c9a080" },
    hairColor: "#1a1a2e",
    hairPath: HAIR_MALE_2,
    eyeColor: "#1a1a2e",
    accent: "#8b5cf6",
    shirt: "#3b0764",
    hasGlasses: true,
    mouth: MOUTH_SMILE,
  },
  {
    skin: { light: "#e2bca0", mid: "#ccac90", shadow: "#a08060" },
    hairColor: "#3a1a10",
    hairPath: HAIR_FEMALE_2,
    eyeColor: "#2a1a10",
    accent: "#10b981",
    shirt: "#065f46",
    hasGlasses: false,
    mouth: MOUTH_NEUTRAL,
  },
  {
    skin: { light: "#f5d0b0", mid: "#e5c0a0", shadow: "#d0b090" },
    hairColor: "#6b3a2a",
    hairPath: HAIR_MALE_1,
    eyeColor: "#4a2518",
    accent: "#f59e0b",
    shirt: "#92400e",
    hasGlasses: false,
    mouth: MOUTH_SMILE,
  },
  {
    skin: { light: "#c89470", mid: "#a87450", shadow: "#885430" },
    hairColor: "#1a0e08",
    hairPath: HAIR_FEMALE_3,
    hairBackPath: HAIR_FEMALE_3_BACK,
    eyeColor: "#1a0e08",
    accent: "#ef4444",
    shirt: "#7f1d1d",
    hasGlasses: true,
    mouth: MOUTH_SMIRK,
  },
];

const VARIANT_MAP: Record<string, AvatarVariant[]> = {
  male: MALE_VARIANTS,
  female: FEMALE_VARIANTS,
  neutral: NEUTRAL_VARIANTS,
};

/* ─── Illustrated SVG Avatars (Modern & Minimalist) ─── */
const IllustratedAvatar = ({
  type,
  size = "md",
  memberId = "default",
  customAvatar,
}: {
  type: "male" | "female" | "neutral";
  size?: "sm" | "md" | "lg";
  memberId?: string;
  customAvatar?: string;
}) => {
  const sizeMap = { sm: 40, md: 56, lg: 88 };
  const px = sizeMap[size];

  if (customAvatar) {
    return (
      <div
        className="select-none overflow-hidden rounded-full bg-white/10"
        style={{ width: px, height: px }}
      >
        <img
          src={customAvatar}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const variants = VARIANT_MAP[type];
  const variantIdx = hashId(memberId) % variants.length;
  const v = variants[variantIdx];

  const skinGradId = `sg-${type}-${variantIdx}-${size}`;
  const ringId = `ring-${type}-${variantIdx}-${size}`;
  
  const { skin, hairColor, hairPath, hairBackPath, eyeColor, accent, shirt, hasGlasses, mouth } = v;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 100 100"
      fill="none"
      className="select-none overflow-hidden rounded-full"
    >
      <defs>
        <radialGradient id={skinGradId} cx="50%" cy="38%" r="52%">
          <stop offset="0%" stopColor={skin.light} />
          <stop offset="70%" stopColor={skin.mid} />
          <stop offset="100%" stopColor={skin.shadow} />
        </radialGradient>
        <linearGradient id={ringId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Background fill */}
      <circle cx="50" cy="50" r="50" fill={accent} opacity="0.1" />

      {/* Back Hair (if applicable) */}
      {hairBackPath && <path d={hairBackPath} fill={hairColor} />}

      {/* Shoulders / Body */}
      <path
        d="M20 100 C20 70 32 60 50 60 C68 60 80 70 80 100 Z"
        fill={shirt}
      />

      {/* Neck */}
      <rect x="42" y="50" width="16" height="15" fill={skin.shadow} rx="4" />

      {/* Head (Clean Circle) */}
      <circle cx="50" cy="38" r="18" fill={`url(#${skinGradId})`} />

      {/* Front Hair */}
      <path d={hairPath} fill={hairColor} />

      {/* Eyes */}
      <circle cx="43" cy="38" r="1.8" fill={eyeColor} />
      <circle cx="57" cy="38" r="1.8" fill={eyeColor} />

      {/* Subtle Nose */}
      <path d="M 50 40 L 49 44 L 51 44 Z" fill={skin.shadow} opacity="0.4" />

      {/* Mouth */}
      <path d={mouth} stroke={eyeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />

      {/* Glasses */}
      {hasGlasses && (
        <g stroke={accent} strokeWidth="1.5" fill="none" opacity="0.8">
          <rect x="36" y="34" width="11" height="8" rx="2" />
          <rect x="53" y="34" width="11" height="8" rx="2" />
          <path d="M 47 37 L 53 37" />
        </g>
      )}

      {/* Outer Inner Ring for premium feel */}
      <circle cx="50" cy="50" r="49" stroke={`url(#${ringId})`} strokeWidth="2" />
    </svg>
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
      viewBox={`0 0 100 40`}
      preserveAspectRatio="none"
    >
      <motion.path
        d={
          count > 1
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
  count,
  index,
  total,
}: {
  count: number;
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
        <IllustratedAvatar type={member.avatarType} size="sm" memberId={member.id} customAvatar={member.avatar} />
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
        <IllustratedAvatar type={department.avatarType} size="md" memberId={department.id} customAvatar={department.avatar} />
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
                    count={idx}
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
        (p) => p.includes(hoveredId) && p.includes(nodeId),
      );
    },
    [hoveredId, paths],
  );

  const departments = teamHierarchy.children || [];

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
              <IllustratedAvatar
                type={teamHierarchy.avatarType}
                size="lg"
                memberId={teamHierarchy.id}
                customAvatar={teamHierarchy.avatar}
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