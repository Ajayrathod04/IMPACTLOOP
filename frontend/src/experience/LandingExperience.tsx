import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ObservatoryLighting } from '../world/ObservatoryLighting';
import { ParticleField } from '../world/ParticleField';
import { ChangeCore } from '../world/ChangeCore';

interface LandingExperienceProps {
  onExploreDemo: () => void;
  onOpenAnalysis: () => void;
  apiConnected: boolean;
}

export const LandingExperience: React.FC<LandingExperienceProps> = ({
  onExploreDemo,
  onOpenAnalysis,
  apiConnected
}) => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#080B12] text-[#F5F3EE] font-outfit select-none">
      {/* Background 3D Abstract Impact World Canvas */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
        <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
          <ObservatoryLighting />
          <ParticleField count={400} />
          <ChangeCore title="14 DAYS → 7 DAYS" isPulsing />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
        </Canvas>
      </div>

      {/* Atmospheric Vignette & Grid Backdrop */}
      <div className="absolute inset-0 z-10 bg-spatial-grid pointer-events-none opacity-40" />
      <div className="absolute inset-0 z-10 bg-observatory-glow pointer-events-none" />

      {/* Landing Foreground Content Container */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 md:p-10">
        {/* Top Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0E1320] border border-[#F4C95D]/40 flex items-center justify-center shadow-[0_0_20px_rgba(244,201,93,0.3)]">
              <span className="w-3 h-3 rounded-full bg-[#F4C95D] animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-wider text-[#F5F3EE]">IMPACTLOOP</span>
              <span className="font-mono text-[10px] text-[#8E9BAE] tracking-widest uppercase">
                DECISION INTELLIGENCE ENGINE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-full bg-[#0E1320]/80 border border-white/10 backdrop-blur-md flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-[#35D6C5] shadow-[0_0_8px_#35D6C5]' : 'bg-[#F4C95D]'}`} />
              <span className="text-[#F5F3EE]">
                {apiConnected ? 'INTELLIGENCE ENGINE ONLINE' : 'LOCAL ENGINE READY'}
              </span>
            </div>
          </div>
        </div>

        {/* Center Hero Section */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 my-auto">
          {/* Tagline Badge */}
          <div className="px-4 py-1.5 rounded-full bg-[#131826]/90 border border-[#F4C95D]/40 backdrop-blur-md shadow-[0_0_25px_rgba(244,201,93,0.15)] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
            <span className="font-mono text-xs text-[#F4C95D] font-bold tracking-wide uppercase">
              AI CHANGE-IMPACT DECISION INTELLIGENCE
            </span>
          </div>

          {/* Expressive Display Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#F5F3EE] leading-[1.05] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            SEE WHAT YOUR CHANGE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C95D] via-[#FF6B5E] to-[#8B7CFF]">
              SETS IN MOTION.
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl text-base sm:text-lg text-[#8E9BAE] font-outfit leading-relaxed">
            ImpactLoop traces downstream consequences across systems, surfaces verified evidence and explicit unknowns, and gives humans an authoritative decision gate before shipping.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={onExploreDemo}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F4C95D] via-[#FF6B5E] to-[#F4C95D] text-[#080B12] font-outfit font-black text-sm tracking-wider uppercase hover:scale-105 transition-all shadow-[0_0_35px_rgba(244,201,93,0.5)] flex items-center gap-3 group"
            >
              <Play className="w-5 h-5 fill-current group-hover:scale-125 transition-transform" />
              <span>EXPLORE THE IMPACT</span>
            </button>

            <button
              onClick={onOpenAnalysis}
              className="px-8 py-4 rounded-2xl bg-[#0E1320]/90 border border-[#8B7CFF]/40 hover:border-[#F4C95D] text-[#F5F3EE] font-outfit font-extrabold text-sm tracking-wider uppercase hover:bg-[#131826] transition-all backdrop-blur-md flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-[#8B7CFF]" />
              <span>ANALYZE A CHANGE</span>
            </button>
          </div>

          {/* Canonical Demo Pill */}
          <div className="mt-2 text-xs font-mono text-[#8E9BAE] flex items-center gap-2">
            <span>CANONICAL DEMO READY:</span>
            <span className="text-[#F4C95D] font-bold bg-[#F4C95D]/10 px-2 py-0.5 rounded border border-[#F4C95D]/30">
              FREE TRIAL: 14 DAYS → 7 DAYS
            </span>
          </div>
        </div>

        {/* Bottom Workflow Pipeline Indicator */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-6 gap-2 pt-4 border-t border-white/10 font-mono text-[11px] text-[#8E9BAE]">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#F4C95D] font-bold">1. PREDICT</span>
            <span className="text-[9px] text-[#8E9BAE] text-center hidden sm:inline">Trace downstream graph</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#35D6C5] font-bold">2. PROVE</span>
            <span className="text-[9px] text-[#8E9BAE] text-center hidden sm:inline">Audit evidence & unknowns</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#FF6B5E] font-bold">3. DECIDE</span>
            <span className="text-[9px] text-[#8E9BAE] text-center hidden sm:inline">Human decision gate</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#8B7CFF] font-bold">4. SHIP</span>
            <span className="text-[9px] text-[#8E9BAE] text-center hidden sm:inline">Phased feature release</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#35D6C5] font-bold">5. OBSERVE</span>
            <span className="text-[9px] text-[#8E9BAE] text-center hidden sm:inline">Compare telemetry vs prediction</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#B8E986] font-bold">6. LEARN</span>
            <span className="text-[9px] text-[#8E9BAE] text-center hidden sm:inline">Organizational memory</span>
          </div>
        </div>
      </div>
    </div>
  );
};
