import React from 'react';
import { Play, Box, Network, Maximize2, FileText, HelpCircle, Layers, ShieldCheck, Activity, BookOpen } from 'lucide-react';

interface SpatialControlsProps {
  onReplayImpact: () => void;
  onFitView: () => void;
  is3DMode: boolean;
  onToggle3D: () => void;
  activePanel: string | null;
  onTogglePanel: (panelName: string) => void;
}

export const SpatialControls: React.FC<SpatialControlsProps> = ({
  onReplayImpact,
  onFitView,
  is3DMode,
  onToggle3D,
  activePanel,
  onTogglePanel
}) => {
  return (
    <div className="absolute top-20 right-4 z-40 flex flex-col gap-3 pointer-events-none select-none">
      {/* Primary Interaction HUD Controls */}
      <div className="p-2 rounded-2xl bg-[#080B12]/90 border border-[#F4C95D]/30 backdrop-blur-xl shadow-2xl flex flex-col gap-2 pointer-events-auto">
        {/* REPLAY IMPACT BUTTON */}
        <button
          onClick={onReplayImpact}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F4C95D] via-[#FF6B5E] to-[#F4C95D] text-[#080B12] font-outfit font-black text-xs tracking-wider uppercase hover:brightness-110 transition-all shadow-[0_0_25px_rgba(244,201,93,0.4)] flex items-center justify-center gap-2 group"
          title="Animate causal pulse propagation through downstream systems"
        >
          <Play className="w-4 h-4 fill-current group-hover:scale-125 transition-transform" />
          <span>REPLAY IMPACT</span>
        </button>

        <div className="h-px bg-white/10 my-0.5" />

        {/* 2D / 3D Toggle */}
        <button
          onClick={onToggle3D}
          className={`px-3 py-2 rounded-xl border font-mono text-xs font-semibold transition-all flex items-center justify-between gap-2 ${
            is3DMode
              ? 'bg-[#131826] border-[#F4C95D] text-[#F4C95D] shadow-[0_0_15px_rgba(244,201,93,0.2)]'
              : 'bg-[#0E1320] border-[#8B7CFF]/40 text-[#35D6C5]'
          }`}
        >
          <div className="flex items-center gap-2">
            {is3DMode ? <Box className="w-4 h-4 text-[#F4C95D]" /> : <Network className="w-4 h-4 text-[#35D6C5]" />}
            <span>{is3DMode ? '3D SPATIAL' : '2D GRAPH'}</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 font-mono text-[#8E9BAE]">
            {is3DMode ? 'WEBGL' : 'FLOW'}
          </span>
        </button>

        {/* FIT VIEW */}
        <button
          onClick={onFitView}
          className="px-3 py-2 rounded-xl bg-[#0E1320] border border-white/10 hover:border-[#8B7CFF] text-[#F5F3EE] transition-all font-mono text-xs flex items-center gap-2"
        >
          <Maximize2 className="w-4 h-4 text-[#8B7CFF]" />
          <span>FIT VIEW</span>
        </button>
      </div>

      {/* Contextual Intelligence Surfaces Toolbar */}
      <div className="p-2 rounded-2xl bg-[#080B12]/90 border border-[#8B7CFF]/30 backdrop-blur-xl shadow-2xl flex flex-col gap-1.5 pointer-events-auto">
        <span className="text-[9px] font-mono text-[#8E9BAE] uppercase px-2 py-1 tracking-widest">
          INTELLIGENCE PANELS
        </span>

        <button
          onClick={() => onTogglePanel('EVIDENCE')}
          className={`px-3 py-2 rounded-xl border text-xs font-outfit font-bold transition-all flex items-center gap-2.5 ${
            activePanel === 'EVIDENCE'
              ? 'bg-[#35D6C5]/20 border-[#35D6C5] text-[#35D6C5] shadow-[0_0_15px_rgba(53,214,197,0.3)]'
              : 'bg-[#0E1320]/80 border-transparent text-[#F5F3EE] hover:bg-[#131826] hover:border-white/20'
          }`}
        >
          <FileText className="w-4 h-4 text-[#35D6C5]" />
          <span>EVIDENCE</span>
        </button>

        <button
          onClick={() => onTogglePanel('UNKNOWNS')}
          className={`px-3 py-2 rounded-xl border text-xs font-outfit font-bold transition-all flex items-center gap-2.5 ${
            activePanel === 'UNKNOWNS'
              ? 'bg-[#8B7CFF]/20 border-[#8B7CFF] text-[#8B7CFF] shadow-[0_0_15px_rgba(139,124,255,0.3)]'
              : 'bg-[#0E1320]/80 border-transparent text-[#F5F3EE] hover:bg-[#131826] hover:border-white/20'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-[#8B7CFF]" />
          <span>UNKNOWNS</span>
        </button>

        <button
          onClick={() => onTogglePanel('SCENARIOS')}
          className={`px-3 py-2 rounded-xl border text-xs font-outfit font-bold transition-all flex items-center gap-2.5 ${
            activePanel === 'SCENARIOS'
              ? 'bg-[#F4C95D]/20 border-[#F4C95D] text-[#F4C95D] shadow-[0_0_15px_rgba(244,201,93,0.3)]'
              : 'bg-[#0E1320]/80 border-transparent text-[#F5F3EE] hover:bg-[#131826] hover:border-white/20'
          }`}
        >
          <Layers className="w-4 h-4 text-[#F4C95D]" />
          <span>SCENARIOS</span>
        </button>

        <button
          onClick={() => onTogglePanel('DECISION')}
          className={`px-3 py-2 rounded-xl border text-xs font-outfit font-bold transition-all flex items-center gap-2.5 ${
            activePanel === 'DECISION'
              ? 'bg-[#FF6B5E]/20 border-[#FF6B5E] text-[#FF6B5E] shadow-[0_0_15px_rgba(255,107,94,0.3)]'
              : 'bg-[#0E1320]/80 border-transparent text-[#F5F3EE] hover:bg-[#131826] hover:border-white/20'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#FF6B5E]" />
          <span>DECISION GATE</span>
        </button>

        <button
          onClick={() => onTogglePanel('OUTCOMES')}
          className={`px-3 py-2 rounded-xl border text-xs font-outfit font-bold transition-all flex items-center gap-2.5 ${
            activePanel === 'OUTCOMES'
              ? 'bg-[#35D6C5]/20 border-[#35D6C5] text-[#35D6C5] shadow-[0_0_15px_rgba(53,214,197,0.3)]'
              : 'bg-[#0E1320]/80 border-transparent text-[#F5F3EE] hover:bg-[#131826] hover:border-white/20'
          }`}
        >
          <Activity className="w-4 h-4 text-[#35D6C5]" />
          <span>OBSERVED OUTCOMES</span>
        </button>

        <button
          onClick={() => onTogglePanel('MEMORY')}
          className={`px-3 py-2 rounded-xl border text-xs font-outfit font-bold transition-all flex items-center gap-2.5 ${
            activePanel === 'MEMORY'
              ? 'bg-[#B8E986]/20 border-[#B8E986] text-[#B8E986] shadow-[0_0_15px_rgba(184,233,134,0.3)]'
              : 'bg-[#0E1320]/80 border-transparent text-[#F5F3EE] hover:bg-[#131826] hover:border-white/20'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#B8E986]" />
          <span>ORG MEMORY</span>
        </button>
      </div>
    </div>
  );
};
