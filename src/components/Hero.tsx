import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- 3D Character/Scene Component ---
interface EnergyCoreProps {
  progressRef: React.MutableRefObject<number>;
  reduceMotion: boolean;
  isLowPowerDevice: boolean;
}

const EnergyCore: React.FC<EnergyCoreProps> = ({ progressRef, reduceMotion, isLowPowerDevice }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;

    // Read directly from the ref
    const scrollProgress = progressRef.current;

    // rotation speed increases with scroll
    const motionFactor = reduceMotion ? 0.2 : isLowPowerDevice ? 0.55 : 1;
    meshRef.current.rotation.x += (0.005 + scrollProgress * 0.01) * motionFactor;
    meshRef.current.rotation.y += (0.01 + scrollProgress * 0.01) * motionFactor;

    // Wireframe rotates slightly differently creates depth
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = meshRef.current.rotation.x;
      wireframeRef.current.rotation.y = meshRef.current.rotation.y;
    }

    // Distortion "breathing" effect
    if (meshRef.current.material) {
      const mat = meshRef.current.material as any;
      // More dynamic distort
      mat.distort = reduceMotion
        ? 0.2
        : 0.3 + Math.sin(state.clock.elapsedTime) * 0.1 + scrollProgress * 0.35;
      mat.speed = reduceMotion ? 0.7 : isLowPowerDevice ? 1.3 : 2 + scrollProgress * 4;
    }

    // --- Smooth Interpolation Logic ---
    const targetPos = new THREE.Vector3(0, 0, 0);

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    if (scrollProgress <= 0.15) {
      // PHASE 1: Center → Right
      const t = scrollProgress / 0.15;
      const e = easeInOut(t);

      targetPos.set(2.5 * e, 0.5 * e, -1 * e);
    } else if (scrollProgress <= 0.5) {
      // PHASE 2: Right → Left
      const t = (scrollProgress - 0.15) / 0.35;
      const e = easeInOut(t);

      targetPos.set(
        2.5 + -5 * e, // 2.5 → -2.5
        0.5 + -1 * e, // 0.5 → -0.5
        -1 + 1 * e, // -1 → 0
      );
    } else if (scrollProgress <= 0.75) {
      // PHASE 3: Left → Center
      const t = (scrollProgress - 0.5) / 0.25;
      const e = easeInOut(t);

      targetPos.set(-2.5 + 2.5 * e, -0.5 + 0.5 * e, 0);
    } else {
      // PHASE 4: Exit Down
      const t = (scrollProgress - 0.75) / 0.25;

      targetPos.set(0, -t * 5, -t * 5);
    }

    // Smooth LERP to the calculated target
    groupRef.current.position.lerp(targetPos, reduceMotion ? 0.06 : 0.1);
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={reduceMotion ? 1 : isLowPowerDevice ? 2.2 : 4}
        rotationIntensity={reduceMotion ? 0.25 : 1}
        floatIntensity={reduceMotion ? 0.5 : isLowPowerDevice ? 1.2 : 2}
      >
        {/* Core */}
        <mesh ref={meshRef} scale={0.8}>
          <torusKnotGeometry args={[1, 0.35, 128, 32]} />
          <MeshDistortMaterial
            color={progressRef.current > 0.5 ? "#4f46e5" : "#60a5fa"}
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive={progressRef.current > 0.7 ? "#2e1065" : "#1e1b4b"}
            emissiveIntensity={0.5}
          />
        </mesh>

        {!isLowPowerDevice && !reduceMotion && (
          <mesh ref={wireframeRef} scale={1.2}>
            <torusKnotGeometry args={[1, 0.35, 128, 32]} />
            <meshBasicMaterial
              color={progressRef.current > 0.5 ? "#818cf8" : "#93c5fd"}
              wireframe
              transparent
              opacity={0.1}
            />
          </mesh>
        )}
      </Float>
      {!isLowPowerDevice && !reduceMotion && (
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
        />
      )}
    </group>
  );
};

export default function ScrollytellingHero() {
  const progressRef = useRef(0); // Mutable ref (0 to 1)
  // We use state for slight UI updates (the progress bar steps), but throttle it via GSAP if needed.
  // Actually, for the indicator to look responsive, we might need a re-render,
  // OR we can make the indicator a separate component that reads the ref/state.
  // For now, let's keep it simple: We DO need state for the UI bars to update,
  // but the 3D scene (heavy part) doesn't need to re-render.
  const [activeStep, setActiveStep] = React.useState(0);
  const [reduceMotion, setReduceMotion] = React.useState(false);
  const [isLowPowerDevice, setIsLowPowerDevice] = React.useState(false);
  const isMobile = isLowPowerDevice;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreferences = () => {
      setReduceMotion(mediaQuery.matches);
      setIsLowPowerDevice(window.innerWidth < 768);
    };
    updatePreferences();
    mediaQuery.addEventListener("change", updatePreferences);
    window.addEventListener("resize", updatePreferences);
    return () => {
      mediaQuery.removeEventListener("change", updatePreferences);
      window.removeEventListener("resize", updatePreferences);
    };
  }, []);

  useEffect(() => {
    // Track Global Scroll (document.body)
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: isLowPowerDevice ? 0 : 0.2,
      onUpdate: (self) => {
        progressRef.current = self.progress;

        // Update the UI indicator Step (0-4)
        // Optimization: only set state if changed
        if (!isLowPowerDevice) {
          const newStep = Math.floor(self.progress * 5);
          setActiveStep((prev) => (prev !== newStep ? newStep : prev));
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isLowPowerDevice]);

  return (
    <div className="relative bg-transparent text-gray-900 dark:text-white transition-colors duration-300">
      {/* 1. Fixed Background Layer (3D) */}
      {!isMobile && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas
            dpr={isLowPowerDevice || reduceMotion ? [1, 1.2] : [1, 2]}
            shadows={!isLowPowerDevice && !reduceMotion}
            gl={{ antialias: !isLowPowerDevice, powerPreference: isLowPowerDevice ? "low-power" : "high-performance" }}
          >
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
              <ambientLight intensity={isLowPowerDevice ? 0.35 : 0.5} />
              <pointLight position={[10, 10, 10]} intensity={isLowPowerDevice ? 0.7 : 1} />
              {/* Pass ref, not state value, to prevent Canvas re-renders */}
              <EnergyCore
                progressRef={progressRef}
                reduceMotion={reduceMotion}
                isLowPowerDevice={isLowPowerDevice}
              />
              {!isLowPowerDevice && !reduceMotion && <Environment preset="city" />}
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* 2. Fixed HUD Layer (Progress Indicator) */}
      <div className="hidden md:flex fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-50 flex-col gap-6 items-center mix-blend-difference">
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest rotate-180 [writing-mode:vertical-lr]">
          System_Build_Status
        </span>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-px transition-all duration-700 ${activeStep === i ? "h-8 bg-blue-500" : "h-4 bg-white/20"
              }`}
          />
        ))}
      </div>

      {/* 3. Original Content Sections (Preserved) */}

      {/* SECTION 0: HERO / INITIALIZATION */}
      <section className="relative min-h-[85svh] md:h-screen flex items-center px-5 sm:px-6 md:px-32 pt-24 md:pt-0 z-10">
        <div className="max-w-4xl space-y-5 md:space-y-6 text-gray-900 dark:text-white">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-blue-500" />
            <span className="text-blue-600 dark:text-blue-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em]">
              Ignition Sequence Initiated
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-9xl font-black leading-[0.9] md:leading-[0.85] tracking-tighter uppercase">
            Engineering <br />
            <span className="text-gray-400 dark:text-white/20">The Engine</span>
          </h1>
          <p className="text-gray-700 dark:text-white/60 font-light text-base sm:text-lg md:text-xl max-w-lg leading-relaxed">
            I architect the skeletons and forge the neural combustion chambers
            where I transforms data into intelligence. I build the systems that
            drive the future.
          </p>
          <div className="pt-3 md:pt-4 flex items-center gap-3 md:gap-4 text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-white/30 uppercase tracking-wider md:tracking-widest">
            <span>Engage Propulsion</span>
            <div className="w-12 h-px bg-gray-200 dark:bg-white/10" />
            <span>Step 01 // Structural_Chassis</span>
          </div>
        </div>
      </section>

      {/* SECTION 1: INFRASTRUCTURE (The Chassis) */}
      <section className="relative min-h-[85svh] md:h-screen flex items-center justify-start px-5 sm:px-6 md:px-32 py-8 md:py-0 z-10">
        <div className="max-w-xl space-y-6 md:space-y-8 bg-white/70 dark:bg-black/40 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-white/5 shadow-2xl">
          <div className="space-y-2">
            <span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest">
              Layer 01: The Chassis
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">
              Distributed <br />
              Foundations
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
            <p>
              Every engine needs a frame capable of sustaining high-velocity
              throughput. I design robust backends and automated pipelines that
              act as the structural steel for scalable AI applications.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 font-mono text-[10px] uppercase tracking-widest text-blue-700/80 dark:text-blue-400/80 pt-4">
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full" />{" "}
                Load-Bearing APIs
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full" /> Data
                Pipelines
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full" />{" "}
                Orchestration
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full" /> Cloud
                Hardening
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SYNTHESIS (The Neural Combustion) */}
      <section className="relative min-h-[85svh] md:h-screen flex items-center justify-end px-5 sm:px-6 md:px-32 py-8 md:py-0 z-10">
        <div className="max-w-xl space-y-6 md:space-y-8 text-left md:text-right">
          <div className="space-y-2">
            <span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest">
              Layer 02: The Combustion
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Neural <br />
              Integration
            </h2>
            <div className="h-1 w-20 md:w-24 bg-blue-600 md:ml-auto mt-4" />
          </div>
          <p className="text-gray-700 dark:text-white/60 text-base sm:text-lg leading-relaxed font-light">
            This is where raw compute becomes cognitive energy. I fine-tune LLM
            integrations and vector logic to ensure the machine doesn't just
            run—it thinks, reacts, and adapts in real-time.
          </p>
          <p className="text-gray-500 dark:text-white/30 text-sm italic pr-0 md:pr-6 border-l md:border-l-0 md:border-r border-blue-500/30 pl-4 md:pl-0">
            "An engine is only as powerful as its ability to convert complexity
            into motion."
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 md:justify-end pt-2 md:pt-4">
            <div className="px-5 py-3 md:px-6 md:py-4 bg-white/70 md:bg-white/5 dark:bg-white/5 border border-gray-200 md:border-white/10 rounded-2xl text-center">
              <span className="block text-2xl font-bold font-mono tracking-tighter">
                OPTIMIZED
              </span>
              <span className="text-[9px] font-mono uppercase text-gray-500 md:text-white/30 dark:text-white/30 tracking-widest">
                Neural Flow
              </span>
            </div>
            <div className="px-5 py-3 md:px-6 md:py-4 bg-white/70 md:bg-white/5 dark:bg-white/5 border border-gray-200 md:border-white/10 rounded-2xl text-center">
              <span className="block text-2xl font-bold font-mono tracking-tighter">
                SEAMLESS
              </span>
              <span className="text-[9px] font-mono uppercase text-gray-500 md:text-white/30 dark:text-white/30 tracking-widest">
                UX Interface
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DEPLOYMENT (The Velocity) */}
      <section className="relative min-h-[85svh] md:h-screen flex items-center justify-center z-10 px-5 sm:px-6 md:px-10 py-8 md:py-0">
        <div className="text-center space-y-6 md:space-y-8 max-w-2xl">
          <div className="inline-block px-4 py-1 border border-blue-500/30 rounded-full text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] mb-4">
            Full Throttle Reached
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Operational <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-600">
              Autonomy
            </span>
          </h2>
          <p className="text-gray-700 dark:text-white/60 font-light text-base sm:text-lg leading-relaxed">
            The build is complete. I deliver fully autonomous systems that
            operate with the precision of a high-performance machine, ready to
            take the wheel of complex enterprise challenges.
          </p>
          <div className="pt-12 flex flex-col items-center gap-4">
            <span className="text-[10px] font-mono text-gray-400 dark:text-white/20 uppercase tracking-[0.4em]">
              Initialize Next Module
            </span>
            <div className="w-px h-20 bg-linear-to-b from-blue-500 via-blue-500 to-transparent mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      <div className="h-[20vh]" />
    </div>
  );
}
