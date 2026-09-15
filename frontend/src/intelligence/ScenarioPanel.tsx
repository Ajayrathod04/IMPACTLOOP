import React, { useState } from 'react';
import { X, Layers, TrendingUp, TrendingDown, ShieldAlert } from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/demo';

interface ScenarioPanelProps {
  changeId: string;
  onClose: () => void;
}

export const ScenarioPanel: React.FC<ScenarioPanelProps> = ({ onClose }) => {
  const [activeScenario, setActiveScenario] = useState<string>('EXPECTED');

  const scenario = DEMO_SCENARIOS.find((s) => s.name === activeScenario) || DEMO_SCENARIOS[1];

  return (
    <div className="absolute top-20 right-4 z-50 w-[420px] max-h-[calc(100vh-140px)] overflow-y-auto observatory-panel rounded-2xl p-5 text-[#F5F3EE] shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#F4C95D]" />
          <div>
            <h3 className="font-outfit font-extrabold text-base text-[#F5F3EE]">SCENARIO LAB</h3>
            <span className="font-mono text-[10px] text-[#F4C95D]">PREDICTIVE MONTE CARLO SIMULATION</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#8E9BAE] hover:text-[#F5F3EE]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scenario Mode Switcher */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#0E1320] border border-white/10 font-mono text-xs">
        {DEMO_SCENARIOS.map((s) => (
          <button
            key={s.name}
            onClick={() => setActiveScenario(s.name)}
            className={`py-2 px-2 rounded-lg font-bold transition-all text-center ${
              activeScenario === s.name
                ? 'bg-[#F4C95D] text-[#080B12] shadow-[0_0_15px_rgba(244,201,93,0.4)]'
                : 'text-[#8E9BAE] hover:text-[#F5F3EE]'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Active Scenario Card */}
      <div className="p-4 rounded-xl bg-[#0E1320] border border-[#F4C95D]/30 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-outfit font-extrabold text-sm text-[#F5F3EE]">{scenario.title}</span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#F4C95D]/20 text-[#F4C95D] border border-[#F4C95D]/40 font-bold">
            {Math.round(scenario.confidence * 100)}% MODEL CONFIDENCE
          </span>
        </div>

        <p className="text-xs text-[#F5F3EE]/80 leading-relaxed font-outfit">{scenario.description}</p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-2 border-t border-white/10">
          <div className="p-2.5 rounded-lg bg-[#131826] border border-white/5 flex flex-col gap-1">
            <span className="text-[9px] text-[#8E9BAE]">ACTIVATION DELTA</span>
            <span className={`font-bold flex items-center gap-1 ${scenario.activation_delta.startsWith('+') ? 'text-[#35D6C5]' : 'text-[#FF6B5E]'}`}>
              {scenario.activation_delta.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {scenario.activation_delta}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#131826] border border-white/5 flex flex-col gap-1">
            <span className="text-[9px] text-[#8E9BAE]">SUPPORT SURGE</span>
            <span className="font-bold text-[#FF6B5E] flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              {scenario.support_surge}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#131826] border border-white/5 flex flex-col gap-1 col-span-2">
            <span className="text-[9px] text-[#8E9BAE]">PROJECTED ARR RUN-RATE</span>
            <span className="font-bold text-[#F4C95D] text-sm">{scenario.arr_impact}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
