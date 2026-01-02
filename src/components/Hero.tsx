import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Character/Scene Component ---
interface EnergyCoreProps {
  scrollProgress: number;
}

const EnergyCore: React.FC<EnergyCoreProps> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    
    // Constant base rotation
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.005;
    
    // Material reactivity
    if (meshRef.current.material) {
      const mat = meshRef.current.material as any;
      mat.distort = 0.3 + scrollProgress * 0.4;
      mat.speed = 2 + scrollProgress * 3;
    }
    
    // Complex Pathing based on scrollProgress
    const targetPos = new THREE.Vector3(0, 0, 0);
    const targetScale = 1.2;

    if (scrollProgress < 0.2) {
      // Intro: Center
      targetPos.set(0, 0, 0);
    } else if (scrollProgress < 0.4) {
      // Tech Stack phase: Move to side to make room for text
      targetPos.set(2, 0.5, -1);
    } else if (scrollProgress < 0.6) {
      // Skills Cloud phase: Submerge slightly
      targetPos.set(-2, -0.5, 0);
    } else if (scrollProgress < 0.8) {
      // Projects phase: High visibility
      targetPos.set(0, 1.2, -2);
    } else {
      // Experience/Contact: Exit/Background transition
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

// --- Main Scrollytelling Component ---
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
      
      {/* 3D Visual Layer - Fixed throughout sections */}
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

      {/* Progress Indicator (Vertical Left) */}
      <div className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-center">
        <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest rotate-180 [writing-mode:vertical-lr]">Sequence_Active</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className={`w-px transition-all duration-700 ${
              Math.floor(scrollProgress * 5) === i ? 'h-8 bg-blue-400' : 'h-4 bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* --- CONTENT LAYERS (Narrative Overlays) --- */}

      {/* SECTION 0: HERO START */}
      <section className="relative h-screen flex items-center px-10 md:px-32 z-10">
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-blue-500" />
            <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.5em] animate-pulse">Initializing Core...</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase">
            Architecting <br />
            <span className="text-white/20">Intelligence</span>
          </h1>
          <p className="text-white/40 font-light text-lg md:text-xl max-w-lg leading-relaxed">
            I build digital ecosystems where GenAI meets high-performance engineering. 
            Scroll to descend into the logic.
          </p>
        </div>
      </section>

      {/* SECTION 1: THE STACK (Phase 2) */}
      <section className="relative h-screen flex items-center justify-start px-10 md:px-32 z-10">
        <div className="max-w-xl space-y-8 bg-black/20 backdrop-blur-md p-10 rounded-3xl border border-white/5">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Layer 01: <br />The Infrastructure</h2>
          <div className="space-y-4 text-white/60 font-light leading-relaxed">
            <p>Moving beyond simple scripts. I engineer scalable backends and fluid frontends designed for the next generation of AI-driven applications.</p>
            <div className="grid grid-cols-2 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-blue-400/80">
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Distributed Systems</span>
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Neural Interfaces</span>
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Real-time Mesh</span>
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Vector Logic</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SYNTHESIS (Phase 3) */}
      <section className="relative h-screen flex items-center justify-end px-10 md:px-32 z-10">
        <div className="max-w-xl space-y-8 text-right">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Layer 02: <br />Synthesis</h2>
            <div className="h-1 w-24 bg-blue-600 ml-auto" />
          </div>
          <p className="text-white/40 text-lg leading-relaxed italic pr-6">
            "Software is no longer static. It is a living reflection of data, evolving through continuous integration and cognitive synthesis."
          </p>
          <div className="flex gap-4 justify-end">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center min-w-[100px]">
              <span className="block text-2xl font-bold font-mono">99.9</span>
              <span className="text-[9px] font-mono uppercase text-white/30 tracking-widest">Uptime</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center min-w-[100px]">
              <span className="block text-2xl font-bold font-mono">0.1ms</span>
              <span className="text-[9px] font-mono uppercase text-white/30 tracking-widest">Latency</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DEPLOYMENT (Phase 4) */}
      <section className="relative h-screen flex items-center justify-center z-10 px-10">
        <div className="text-center space-y-8 max-w-2xl">
          <div className="inline-block px-4 py-1 border border-blue-500/30 rounded-full text-[10px] font-mono text-blue-400 uppercase tracking-[0.3em] mb-4">
            Production Ready
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Ready for <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-600">Deployment</span>
          </h2>
          <p className="text-white/40 font-light text-lg">
            Transitioning from the core to the peripheral systems. Explore the specific modules of my tech stack below.
          </p>
          <div className="pt-10">
            <div className="w-px h-24 bg-linear-to-b from-blue-500/0 via-blue-500 to-blue-500/0 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* This spacer ensures we scroll enough to see all transitions before hitting the next component in App.tsx */}
      <div className="h-[20vh]" />
    </div>
  );
}