import React, { useState } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleExploreClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onExploreDemo();
    }, 600); // 600ms smooth camera expansion transition
  };

  return (
    <div className={`relative w-screen h-screen overflow-hidden bg-[#10131A] text-[#F7F3EA] font-outfit select-none transition-all duration-700 ${
      isTransitioning ? 'opacity-0 scale-105 filter blur-sm' : 'opacity-100 scale-100'
    }`}>
      {/* Background 3D Impact World Canvas */}
      <div className="absolute inset-0 z-0 opacity-85 pointer-events-auto">
        <Canvas camera={{ position: [0, 2, 11], fov: 45 }}>
          <ObservatoryLighting />
          <ParticleField count={450} />
          <ChangeCore title="14 DAYS → 7 DAYS" isPulsing />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
      </div>

      {/* Spatial Atmospheric Layers */}
      <div className="absolute inset-0 z-10 bg-spatial-grid pointer-events-none opacity-30" />
      <div className="absolute inset-0 z-10 bg-observatory-glow pointer-events-none" />

      {/* Main Foreground Container */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 md:p-10 max-w-7xl mx-auto">
        {/* Top Navigation Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#151A27] border border-[#F4C95D]/40 flex items-center justify-center shadow-[0_0_25px_rgba(244,201,93,0.35)]">
              <span className="w-3 h-3 rounded-full bg-[#F4C95D] animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-bold text-lg tracking-wider text-[#F7F3EA]">IMPACTLOOP</span>
              <span className="font-mono text-[10px] text-[#8E9BAE] tracking-widest uppercase">
                DECISION INTELLIGENCE ENGINE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-4 py-1.5 rounded-full bg-[#151A27]/90 border border-white/10 backdrop-blur-md flex items-center gap-2 shadow-lg">
              <span className={`w-2.5 h-2.5 rounded-full ${apiConnected ? 'bg-[#35D6C5] shadow-[0_0_10px_#35D6C5]' : 'bg-[#F4C95D] shadow-[0_0_10px_#F4C95D]'}`} />
              <span className="text-[#F7F3EA] font-semibold">
                {apiConnected ? 'INTELLIGENCE ENGINE ONLINE' : 'DEMO MODE'}
              </span>
            </div>
          </div>
        </div>

        {/* Center Hero Content */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 my-auto">
          {/* Small Product Category Label */}
          <div className="px-4 py-1.5 rounded-full bg-[#151A27]/90 border border-[#F4C95D]/40 backdrop-blur-md shadow-[0_0_20px_rgba(244,201,93,0.2)] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
            <span className="font-mono text-xs text-[#F4C95D] font-bold tracking-wide uppercase">
              AI CHANGE-IMPACT DECISION INTELLIGENCE
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#F7F3EA] leading-[1.05] tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
            SEE WHAT YOUR CHANGE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C95D] via-[#FF6B5E] to-[#8B7CFF]">
              SETS IN MOTION.
            </span>
          </h1>

          {/* Subheading Description */}
          <p className="max-w-2xl text-base sm:text-lg text-[#8E9BAE] font-outfit leading-relaxed">
            ImpactLoop traces downstream consequences across systems, surfaces verified evidence and explicit unknowns, and gives humans an authoritative decision gate before shipping.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={handleExploreClick}
              disabled={isTransitioning}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F4C95D] via-[#FF6B5E] to-[#F4C95D] text-[#10131A] font-outfit font-black text-sm tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(244,201,93,0.5)] flex items-center gap-3 group cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current group-hover:scale-125 transition-transform" />
              <span>EXPLORE THE IMPACT</span>
            </button>

            <button
              onClick={onOpenAnalysis}
              className="px-8 py-4 rounded-2xl bg-[#151A27]/90 border border-[#8B7CFF]/40 hover:border-[#F4C95D] text-[#F7F3EA] font-outfit font-extrabold text-sm tracking-wider uppercase hover:bg-[#1B2234] transition-all backdrop-blur-md flex items-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#8B7CFF]" />
              <span>ANALYZE A CHANGE</span>
            </button>
          </div>

          {/* Canonical Demo Pill */}
          <div className="mt-1 text-xs font-mono text-[#8E9BAE] flex items-center gap-2">
            <span>CANONICAL DEMO READY:</span>
            <span className="text-[#F4C95D] font-bold bg-[#F4C95D]/10 px-2.5 py-0.5 rounded-full border border-[#F4C95D]/30">
              FREE TRIAL: 14 DAYS → 7 DAYS
            </span>
          </div>
        </div>

        {/* Bottom Pipeline Strip */}
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
