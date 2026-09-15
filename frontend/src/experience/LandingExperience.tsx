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
    <div className={`relative w-screen h-screen overflow-y-auto bg-[#F7F3EA] text-[#151A27] font-outfit select-none transition-all duration-700 ${
      isTransitioning ? 'opacity-0 scale-105 filter blur-sm' : 'opacity-100 scale-100'
    }`}>
      {/* Soft Warm Radial Backdrop */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_30%,rgba(244,201,93,0.18)_0%,rgba(255,107,94,0.08)_40%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(21,26,39,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(21,26,39,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main Foreground Container */}
      <div className="relative z-20 w-full min-h-screen flex flex-col justify-between p-6 md:p-10 max-w-7xl mx-auto">
        {/* Top Navigation Header */}
        <div className="w-full flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#151A27] text-[#F4C95D] border border-[#151A27] flex items-center justify-center shadow-lg">
              <span className="w-3 h-3 rounded-full bg-[#F4C95D] animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-lg tracking-wider text-[#151A27]">IMPACTLOOP</span>
              <span className="font-mono text-[10px] text-[#8E9BAE] tracking-widest uppercase">
                DECISION INTELLIGENCE ENGINE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-4 py-1.5 rounded-full bg-[#151A27] text-[#F7F3EA] border border-[#151A27] shadow-md flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${apiConnected ? 'bg-[#35D6C5] shadow-[0_0_8px_#35D6C5]' : 'bg-[#F4C95D] shadow-[0_0_8px_#F4C95D]'}`} />
              <span className="font-semibold text-xs">
                {apiConnected ? 'INTELLIGENCE ENGINE ONLINE' : 'DEMO MODE'}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Section: Side-by-Side Grid Layout (Zero Text Overlap) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4">
          {/* Left Column (Headline, Eyebrow, Subheading, CTAs) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5 max-w-2xl">
            {/* Eyebrow Label */}
            <div className="px-3.5 py-1.5 rounded-full bg-[#151A27]/10 border border-[#151A27]/20 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B5E]" />
              <span className="font-mono text-xs text-[#151A27] font-bold tracking-wide uppercase">
                AI CHANGE-IMPACT DECISION INTELLIGENCE
              </span>
            </div>

            {/* Headline (Controlled, Dramatic, No Overlap) */}
            <h1 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#151A27] leading-[1.08] tracking-tight">
              SEE WHAT YOUR CHANGE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C95D] via-[#FF6B5E] to-[#8B7CFF]">
                SETS IN MOTION.
              </span>
            </h1>

            {/* Subheading Description */}
            <p className="text-base sm:text-lg text-[#151A27]/80 font-outfit leading-relaxed">
              ImpactLoop traces downstream consequences across systems, surfaces verified evidence and explicit unknowns, and gives humans an authoritative decision gate before shipping.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={handleExploreClick}
                disabled={isTransitioning}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F4C95D] via-[#FF6B5E] to-[#F4C95D] text-[#10131A] font-outfit font-black text-sm tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(244,201,93,0.4)] flex items-center justify-center gap-3 group cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current group-hover:scale-125 transition-transform" />
                <span>EXPLORE THE IMPACT</span>
              </button>

              <button
                onClick={onOpenAnalysis}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#151A27] text-[#F7F3EA] hover:bg-[#1B2234] font-outfit font-extrabold text-sm tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#35D6C5]" />
                <span>ANALYZE A CHANGE</span>
              </button>
            </div>

            {/* Canonical Demo Pill */}
            <div className="text-xs font-mono text-[#8E9BAE] flex items-center gap-2 pt-1">
              <span className="text-[#151A27]/70 font-semibold">CANONICAL DEMO READY:</span>
              <span className="text-[#10131A] font-bold bg-[#F4C95D]/30 px-3 py-1 rounded-full border border-[#F4C95D]">
                FREE TRIAL: 14 DAYS → 7 DAYS
              </span>
            </div>
          </div>

          {/* Right Column (Dedicated Spatial Visualization Canvas Card - Zero Overlap) */}
          <div className="lg:col-span-5 w-full h-[380px] sm:h-[420px] rounded-3xl bg-[#10131A] border border-[#F4C95D]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4">
            {/* 3D Impact Core Scene */}
            <div className="absolute inset-0 z-0 opacity-90">
              <Canvas camera={{ position: [0, 1.5, 9], fov: 45 }}>
                <ObservatoryLighting />
                <ParticleField count={250} />
                <ChangeCore title="14 DAYS → 7 DAYS" isPulsing />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
              </Canvas>
            </div>

            {/* Overlay Network Labels */}
            <div className="relative z-10 flex items-center justify-between pointer-events-none">
              <div className="px-3 py-1.5 rounded-xl bg-[#151A27]/90 border border-[#F4C95D]/40 text-[10px] font-mono text-[#F4C95D] font-bold">
                SPATIAL IMPACT GRAPH
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#151A27]/90 border border-[#35D6C5]/40 text-[10px] font-mono text-[#35D6C5] font-bold">
                5 DOWNSTREAM SYSTEMS
              </div>
            </div>

            <div className="relative z-10 text-center pointer-events-none">
              <span className="text-[10px] font-mono text-[#8E9BAE] bg-[#10131A]/80 px-3 py-1 rounded-full border border-white/10">
                CHANGE PROPAGATION ENGINE ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Pipeline Strip */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-6 gap-2 pt-4 border-t border-[#151A27]/15 font-mono text-[11px] text-[#151A27]">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#10131A] font-bold">1. PREDICT</span>
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
            <span className="text-[#10131A] font-bold">6. LEARN</span>
            <span className="text-[9px] text-[#8E9BAE] text-center hidden sm:inline">Organizational memory</span>
          </div>
        </div>
      </div>
    </div>
  );
};
