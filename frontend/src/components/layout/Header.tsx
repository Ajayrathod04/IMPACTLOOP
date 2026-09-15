import React from 'react';
import { Search, Bell, Layers, ChevronDown, Sparkles, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export interface HeaderProps {
  onAnalyzeClick?: () => void;
  apiConnected?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onAnalyzeClick, apiConnected = true }) => {
  return (
    <header className="h-14 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-md px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left Brand Command Strip & Workspace Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-amber-500/20 border border-amber-400/40">
            <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-ivory-100 tracking-tight text-sm font-sans">
                ImpactLoop
              </span>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                Observatory
              </span>
            </div>
          </div>
        </div>

        <div className="h-4 w-[1px] bg-slate-800" />

        {/* Workspace Dropdown */}
        <button className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-mono text-slate-300 transition-colors cursor-pointer">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Acme Production Workspace</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>

        {/* Backend Real Health Telemetry */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono">
          <span className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
          <span className={apiConnected ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
            API {apiConnected ? 'ONLINE (HTTP 200)' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Right Search, Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <div className="relative w-56 hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search change, graph, metrics..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-10 py-1.5 text-xs text-ivory-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-all font-mono"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500 bg-slate-950 px-1 py-0.5 rounded border border-slate-800">
            ⌘K
          </kbd>
        </div>

        {/* Notification Affordance */}
        <button className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white transition-colors relative cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
        </button>

        {/* Quick Action Button */}
        <Button
          variant="primary"
          size="sm"
          icon={<Sparkles className="w-3.5 h-3.5" />}
          onClick={onAnalyzeClick}
        >
          New Analysis
        </Button>

        <div className="h-4 w-[1px] bg-slate-800" />

        {/* User Profile Badge */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold text-slate-950 border border-amber-400/40 shadow-sm font-mono">
            AR
          </div>
          <span className="hidden xl:inline text-xs font-mono text-slate-300">Alex Rivera</span>
        </div>
      </div>
    </header>
  );
};
