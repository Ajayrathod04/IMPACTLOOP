import React from 'react';
import { Sparkles, Play, ShieldAlert, Cpu, ArrowRight, Activity, GitBranch, Layers } from 'lucide-react';

interface HeroLandingProps {
  onExploreDemo: () => void;
  onOpenAnalysis: () => void;
  apiConnected: boolean;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onExploreDemo,
  onOpenAnalysis,
  apiConnected
}) => {
  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F3EE] relative overflow-hidden flex flex-col justify-between p-6 md:p-12">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial-glow pointer-events-none opacity-80" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#8B7CFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FF6B5E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="flex items-center justify-between z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F4C95D] to-[#FF6B5E] flex items-center justify-center shadow-lg">
            <Cpu className="w-5 h-5 text-[#080B12] font-bold" />
          </div>
          <span className="font-mono text-lg font-extrabold tracking-wider text-[#F5F3EE] uppercase">
            IMPACT<span className="text-[#F4C95D]">LOOP</span>
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center space-x-1.5 text-xs font-mono px-3 py-1 rounded-full border ${
            apiConnected 
              ? 'bg-[#B8E986]/10 text-[#B8E986] border-[#B8E986]/30' 
              : 'bg-[#FF6B5E]/10 text-[#FF6B5E] border-[#FF6B5E]/30'
          }`}>
            <span className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-[#B8E986] animate-pulse' : 'bg-[#FF6B5E]'}`} />
            <span>{apiConnected ? 'FASTAPI INTELLIGENCE ONLINE' : 'OFFLINE MODE'}</span>
          </span>
        </div>
      </header>

      {/* Main Hero Content */}
      <div className="max-w-4xl mx-auto text-center z-10 my-auto py-12 space-y-8">
        <div className="inline-flex items-center space-x-2 bg-[#121829] border border-[#8B7CFF]/30 px-4 py-1.5 rounded-full text-xs font-mono text-[#8B7CFF]">
          <Sparkles className="w-4 h-4 text-[#F4C95D]" />
          <span>AI CHANGE-IMPACT DECISION OBSERVATORY</span>
        </div>

        <h1 className="font-mono text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F5F3EE] leading-tight">
          See the consequences <br />
          <span className="bg-gradient-to-r from-[#F4C95D] via-[#FF6B5E] to-[#8B7CFF] bg-clip-text text-transparent">
            before you ship the change.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
          ImpactLoop traces how a product decision propagates across downstream systems, surfaces hidden evidence & explicit unknowns, and learns autonomously from observed telemetry.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#F4C95D] to-[#FF6B5E] text-[#080B12] font-mono font-bold text-sm hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(244,201,93,0.3)] flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 fill-[#080B12]" />
            <span>EXPLORE DEMO: 14d → 7d TRIAL</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAnalysis}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#121829] border border-[#8B7CFF]/40 text-[#F5F3EE] font-mono font-bold text-sm hover:bg-[#1A2235] hover:border-[#8B7CFF] transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-[#8B7CFF]" />
            <span>PROPOSE NEW CHANGE</span>
          </button>
        </div>
      </div>

      {/* Feature Highlights Ribbon */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-4 z-10 pt-6 border-t border-[#121829]">
        <div className="bg-[#0E1320]/60 border border-[#121829] rounded-xl p-4 flex items-start space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B5E]/15 border border-[#FF6B5E]/30 text-[#FF6B5E] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-[#F5F3EE]">PREDICT IMPACT</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Quantify downstream risk & affected systems.</p>
          </div>
        </div>

        <div className="bg-[#0E1320]/60 border border-[#121829] rounded-xl p-4 flex items-start space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#8B7CFF]/15 border border-[#8B7CFF]/30 text-[#8B7CFF] flex items-center justify-center shrink-0">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-[#F5F3EE]">PROVE & SCENARIO</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Compare Conservative, Expected & Adverse tracks.</p>
          </div>
        </div>

        <div className="bg-[#0E1320]/60 border border-[#121829] rounded-xl p-4 flex items-start space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#35D6C5]/15 border border-[#35D6C5]/30 text-[#35D6C5] flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-[#F5F3EE]">OBSERVE TELEMETRY</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Track predicted vs actual metric variance.</p>
          </div>
        </div>

        <div className="bg-[#0E1320]/60 border border-[#121829] rounded-xl p-4 flex items-start space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#B8E986]/15 border border-[#B8E986]/30 text-[#B8E986] flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-[#F5F3EE]">ORG MEMORY</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Auto-update graph weights for future changes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
