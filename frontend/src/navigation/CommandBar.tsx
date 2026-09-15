import React from 'react';
import { Cpu, Sparkles, RotateCcw, ChevronRight } from 'lucide-react';

interface CommandBarProps {
  changeTitle: string;
  apiConnected: boolean;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onOpenIntake: () => void;
  onResetDemo: () => void;
  onReturnLanding: () => void;
}

export const CommandBar: React.FC<CommandBarProps> = ({
  changeTitle,
  apiConnected,
  activeFilter,
  onFilterChange,
  onOpenIntake,
  onResetDemo,
  onReturnLanding
}) => {
  return (
    <div className="fixed top-4 left-4 right-4 z-40 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 bg-[#0E1320]/90 border border-[#8B7CFF]/20 rounded-2xl p-3 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      
      {/* Left: Logo & Change Context */}
      <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
        <button
          onClick={onReturnLanding}
          className="flex items-center space-x-2 group hover:opacity-80 transition-all"
          title="Return to Landing"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F4C95D] to-[#FF6B5E] flex items-center justify-center shadow-lg">
            <Cpu className="w-4 h-4 text-[#080B12] font-bold" />
          </div>
          <span className="font-mono text-sm font-extrabold tracking-wider text-[#F5F3EE] uppercase hidden sm:inline">
            IMPACT<span className="text-[#F4C95D]">LOOP</span>
          </span>
        </button>

        <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block" />

        {/* Change title badge */}
        <div className="bg-[#121829] border border-[#262838] px-3 py-1 rounded-lg flex items-center space-x-2 font-mono text-xs">
          <span className="text-slate-400">TARGET:</span>
          <span className="text-[#F4C95D] font-bold truncate max-w-[200px] sm:max-w-[300px]">
            {changeTitle}
          </span>
        </div>

        {/* API connection status pill */}
        <span className={`inline-flex items-center space-x-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
          apiConnected 
            ? 'bg-[#B8E986]/10 text-[#B8E986] border-[#B8E986]/30' 
            : 'bg-[#FF6B5E]/10 text-[#FF6B5E] border-[#FF6B5E]/30'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${apiConnected ? 'bg-[#B8E986] animate-pulse' : 'bg-[#FF6B5E]'}`} />
          <span className="hidden sm:inline">{apiConnected ? 'CONNECTED' : 'OFFLINE'}</span>
        </span>
      </div>

      {/* Center: Interactive Filters */}
      <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto py-1 md:py-0">
        {[
          { id: 'ALL', label: 'ALL NODES' },
          { id: 'EVIDENCE', label: 'EVIDENCE' },
          { id: 'INFERRED', label: 'INFERRED' },
          { id: 'UNKNOWN', label: 'UNKNOWNS' },
          { id: 'OBSERVED', label: 'OBSERVED' },
          { id: 'HIGH_RISK', label: 'HIGH RISK' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => onFilterChange(f.id)}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all whitespace-nowrap border ${
              activeFilter === f.id
                ? 'bg-[#8B7CFF]/20 text-[#8B7CFF] border-[#8B7CFF]'
                : 'bg-[#080B12]/60 text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
        <button
          onClick={onResetDemo}
          className="flex items-center space-x-1.5 bg-[#121829] hover:bg-[#1A2235] text-slate-300 border border-[#262838] px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#F4C95D]" />
          <span>RESET DEMO</span>
        </button>

        <button
          onClick={onOpenIntake}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-[#F4C95D] to-[#FF6B5E] text-[#080B12] font-mono font-bold text-xs px-3.5 py-1.5 rounded-lg hover:scale-105 transition-all shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROPOSE CHANGE</span>
        </button>
      </div>
    </div>
  );
};
