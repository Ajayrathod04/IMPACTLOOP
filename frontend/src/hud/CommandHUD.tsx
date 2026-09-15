import React from 'react';
import { Sparkles, RefreshCw, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';

interface CommandHUDProps {
  changeTitle: string;
  apiConnected: boolean;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onOpenIntake: () => void;
  onResetDemo: () => void;
  onReturnLanding: () => void;
}

export const CommandHUD: React.FC<CommandHUDProps> = ({
  changeTitle,
  apiConnected,
  onOpenIntake,
  onResetDemo,
  onReturnLanding
}) => {
  return (
    <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none select-none">
      {/* Left: Brand & Return Landing */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={onReturnLanding}
          className="px-3 py-2 rounded-xl bg-[#0E1320]/90 border border-[#8B7CFF]/30 hover:border-[#F4C95D] hover:bg-[#131826] text-[#F5F3EE] transition-all flex items-center gap-2 shadow-lg backdrop-blur-md text-xs font-mono font-medium"
          title="Return to Hero Landing"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#F4C95D]" />
          <span>LANDING</span>
        </button>

        <div className="px-4 py-2 rounded-xl bg-[#0E1320]/90 border border-[#F4C95D]/40 backdrop-blur-md flex items-center gap-3 shadow-xl">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F4C95D] shadow-[0_0_10px_#F4C95D] animate-pulse" />
          <div className="flex flex-col">
            <span className="font-display text-sm tracking-wider text-[#F5F3EE]">IMPACTLOOP</span>
            <span className="text-[10px] font-mono text-[#8E9BAE] tracking-widest uppercase">SPATIAL DECISION OBSERVATORY</span>
          </div>
        </div>
      </div>

      {/* Center: Active Canonical Change Title */}
      <div className="pointer-events-auto hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131826]/90 border border-[#F4C95D]/50 backdrop-blur-md shadow-2xl">
        <span className="text-[10px] font-mono text-[#F4C95D] uppercase bg-[#F4C95D]/10 px-2 py-0.5 rounded border border-[#F4C95D]/30 font-bold">
          ACTIVE CHANGE
        </span>
        <span className="font-outfit font-bold text-sm text-[#F5F3EE]">{changeTitle}</span>
      </div>

      {/* Right: Actions & API Status */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <div className="px-3 py-1.5 rounded-xl bg-[#0E1320]/90 border border-white/10 backdrop-blur-md flex items-center gap-2 text-xs font-mono">
          {apiConnected ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-[#35D6C5]" />
              <span className="text-[#35D6C5]">ENGINE ONLINE</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-[#F4C95D]" />
              <span className="text-[#F4C95D]">LOCAL DEMO MODE</span>
            </>
          )}
        </div>

        <button
          onClick={onResetDemo}
          className="px-3 py-2 rounded-xl bg-[#0E1320]/90 border border-white/10 hover:border-[#F4C95D] text-[#8E9BAE] hover:text-[#F5F3EE] transition-all flex items-center gap-1.5 backdrop-blur-md text-xs font-mono"
          title="Reload Canonical Demo (14 days -> 7 days)"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">RESET DEMO</span>
        </button>

        <button
          onClick={onOpenIntake}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F4C95D] to-[#FF6B5E] text-[#080B12] font-outfit font-extrabold text-xs tracking-wider uppercase hover:brightness-110 transition-all shadow-[0_0_20px_rgba(244,201,93,0.3)] flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ANALYZE CHANGE</span>
        </button>
      </div>
    </div>
  );
};
