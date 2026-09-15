import React from 'react';
import { Play, Maximize2, Sparkles, HelpCircle, GitBranch, ShieldCheck, Box, Activity } from 'lucide-react';

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
    <div className="fixed right-4 top-24 z-30 flex flex-col space-y-2">
      {/* Replay Impact Pulse */}
      <button
        onClick={onReplayImpact}
        className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#0E1320]/90 border border-[#F4C95D]/40 text-[#F4C95D] hover:bg-[#F4C95D] hover:text-[#080B12] transition-all shadow-xl backdrop-blur-md"
        title="Replay Impact Propagation"
      >
        <Play className="w-5 h-5 fill-current" />
        <span className="absolute right-14 bg-[#0E1320] border border-[#262838] px-2.5 py-1 rounded text-[10px] font-mono text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          REPLAY IMPACT PULSE
        </span>
      </button>

      {/* Toggle 3D / 2D mode */}
      <button
        onClick={onToggle3D}
        className={`group relative flex items-center justify-center w-11 h-11 rounded-xl border transition-all shadow-xl backdrop-blur-md ${
          is3DMode 
            ? 'bg-[#8B7CFF]/20 border-[#8B7CFF] text-[#8B7CFF]' 
            : 'bg-[#0E1320]/90 border-[#262838] text-slate-400 hover:text-slate-200'
        }`}
        title="Toggle 3D / 2D Spatial Observatory"
      >
        <Box className="w-5 h-5" />
        <span className="absolute right-14 bg-[#0E1320] border border-[#262838] px-2.5 py-1 rounded text-[10px] font-mono text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {is3DMode ? '3D OBSERVATORY ACTIVE' : 'SWITCH TO 3D'}
        </span>
      </button>

      {/* Reset Camera / Fit View */}
      <button
        onClick={onFitView}
        className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#0E1320]/90 border border-[#262838] text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all shadow-xl backdrop-blur-md"
        title="Fit Spatial View"
      >
        <Maximize2 className="w-5 h-5" />
        <span className="absolute right-14 bg-[#0E1320] border border-[#262838] px-2.5 py-1 rounded text-[10px] font-mono text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          FIT SPATIAL VIEW
        </span>
      </button>

      <div className="w-full h-px bg-[#121829] my-1" />

      {/* Floating Panel Toggles */}
      {[
        { id: 'EVIDENCE', label: 'EVIDENCE TRAILS', icon: Sparkles, color: '#8B7CFF' },
        { id: 'UNKNOWNS', label: 'EXPLICIT UNKNOWNS', icon: HelpCircle, color: '#F4C95D' },
        { id: 'SCENARIOS', label: 'SCENARIO LAB', icon: GitBranch, color: '#73B7FF' },
        { id: 'DECISION', label: 'DECISION GATE', icon: ShieldCheck, color: '#FF6B5E' },
        { id: 'LEARNING', label: 'OUTCOMES & LEARNING', icon: Activity, color: '#B8E986' }
      ].map((p) => {
        const Icon = p.icon;
        const isActive = activePanel === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onTogglePanel(p.id)}
            className={`group relative flex items-center justify-center w-11 h-11 rounded-xl border transition-all shadow-xl backdrop-blur-md ${
              isActive 
                ? 'bg-[#121829] border-current shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                : 'bg-[#0E1320]/90 border-[#262838] text-slate-400 hover:text-slate-200'
            }`}
            style={{ color: isActive ? p.color : undefined }}
            title={p.label}
          >
            <Icon className="w-5 h-5" />
            <span className="absolute right-14 bg-[#0E1320] border border-[#262838] px-2.5 py-1 rounded text-[10px] font-mono text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {p.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
