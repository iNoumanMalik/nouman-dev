import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Character/Scene Component (Logic preserved as requested) ---
interface EnergyCoreProps {
  scrollProgress: number;
}

const EnergyCore: React.FC<EnergyCoreProps> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.005;
    if (meshRef.current.material) {
      const mat = meshRef.current.material as any;
      mat.distort = 0.3 + scrollProgress * 0.4;
      mat.speed = 2 + scrollProgress * 3;
    }
    const targetPos = new THREE.Vector3(0, 0, 0);
    if (scrollProgress < 0.2) {
      targetPos.set(0, 0, 0);
    } else if (scrollProgress < 0.4) {
      targetPos.set(2, 0.5, -1);
    } else if (scrollProgress < 0.6) {
      targetPos.set(-2, -0.5, 0);
    } else if (scrollProgress < 0.8) {
      targetPos.set(0, 1.2, -2);
    } else {
      targetPos.set(0, -4, -5);
    }
    groupRef.current.position.lerp(targetPos, 0.07);
  });

  return (
    <group ref={groupRef}>
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.2}>
          <MeshDistortMaterial
            color={scrollProgress > 0.5 ? "#4f46e5" : "#60a5fa"}
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.9}
            emissive={scrollProgress > 0.7 ? "#2e1065" : "#000000"}
          />
        </Sphere>
      </Float>
      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </group>
  );
};

export default function ScrollytellingHero() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    setWindowHeight(window.innerHeight);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const totalHeight = typeof document !== 'undefined' ? document.documentElement.scrollHeight - windowHeight : 0;
  const scrollProgress = totalHeight > 0 ? Math.min(Math.max(scrollY / totalHeight, 0), 1) : 0;

  return (
    <div className="relative bg-[#050505] text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas shadows gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <EnergyCore scrollProgress={scrollProgress} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Progress Indicator */}
      <div className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-center">
        <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest rotate-180 [writing-mode:vertical-lr]">System_Build_Status</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className={`w-px transition-all duration-700 ${
              Math.floor(scrollProgress * 5) === i ? 'h-8 bg-blue-400' : 'h-4 bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* SECTION 0: HERO / INITIALIZATION */}
      <section className="relative h-screen flex items-center px-10 md:px-32 z-10">
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-blue-500" />
            <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.5em]">Ignition Sequence Initiated</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase">
            Engineering <br />
            <span className="text-white/20">The Engine</span>
          </h1>
          <p className="text-white/40 font-light text-lg md:text-xl max-w-lg leading-relaxed">
            I architect the skeletons and forge the neural combustion chambers where I transforms data into intelligence. I build the systems that drive the future.
          </p>
          <div className="pt-4 flex items-center gap-4 text-[10px] font-mono text-white/20 uppercase tracking-widest">
            <span>Engage Propulsion</span>
            <div className="w-12 h-px bg-white/10" />
            <span>Step 01 // Structural_Chassis</span>
          </div>
        </div>
      </section>

      {/* SECTION 1: INFRASTRUCTURE (The Chassis) */}
      <section className="relative h-screen flex items-center justify-start px-10 md:px-32 z-10">
        <div className="max-w-xl space-y-8 bg-black/40 backdrop-blur-xl p-10 rounded-3xl border border-white/5 shadow-2xl">
          <div className="space-y-2">
            <span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest">Layer 01: The Chassis</span>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Distributed <br />Foundations</h2>
          </div>
          <div className="space-y-4 text-white/60 font-light leading-relaxed text-sm md:text-base">
            <p>Every engine needs a frame capable of sustaining high-velocity throughput. I design robust backends and automated pipelines that act as the structural steel for scalable AI applications.</p>
            <div className="grid grid-cols-2 gap-y-3 font-mono text-[10px] uppercase tracking-widest text-blue-400/80 pt-4">
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Load-Bearing APIs</span>
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Data Pipelines</span>
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Orchestration</span>
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Cloud Hardening</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SYNTHESIS (The Neural Combustion) */}
      <section className="relative h-screen flex items-center justify-end px-10 md:px-32 z-10">
        <div className="max-w-xl space-y-8 text-right ">
          <div className="space-y-2">
            <span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest">Layer 02: The Combustion</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Neural <br />Integration</h2>
            <div className="h-1 w-24 bg-blue-600 ml-auto mt-4" />
          </div>
          <p className="text-white/40 text-lg leading-relaxed font-light">
            This is where raw compute becomes cognitive energy. I fine-tune LLM integrations and vector logic to ensure the machine doesn't just run—it thinks, reacts, and adapts in real-time.
          </p>
          <p className="text-white/20 text-sm italic pr-6 border-r border-blue-500/30">
            "An engine is only as powerful as its ability to convert complexity into motion."
          </p>
          <div className="flex gap-4 justify-end pt-4">
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
              <span className="block text-2xl font-bold font-mono tracking-tighter">OPTIMIZED</span>
              <span className="text-[9px] font-mono uppercase text-white/30 tracking-widest">Neural Flow</span>
            </div>
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
              <span className="block text-2xl font-bold font-mono tracking-tighter">SEAMLESS</span>
              <span className="text-[9px] font-mono uppercase text-white/30 tracking-widest">UX Interface</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DEPLOYMENT (The Velocity) */}
      <section className="relative h-screen flex items-center justify-center z-10 px-10">
        <div className="text-center space-y-8 max-w-2xl">
          <div className="inline-block px-4 py-1 border border-blue-500/30 rounded-full text-[10px] font-mono text-blue-400 uppercase tracking-[0.3em] mb-4">
            Full Throttle Reached
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Operational <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-600">Autonomy</span>
          </h2>
          <p className="text-white/50 font-light text-lg leading-relaxed">
            The build is complete. I deliver fully autonomous systems that operate with the precision of a high-performance machine, ready to take the wheel of complex enterprise challenges.
          </p>
          <div className="pt-12 flex flex-col items-center gap-4">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">Initialize Next Module</span>
            <div className="w-px h-20 bg-linear-to-b from-blue-500 via-blue-500 to-transparent mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      <div className="h-[20vh]" />
    </div>
  );
}