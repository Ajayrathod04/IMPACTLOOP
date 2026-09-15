import React from 'react';
import { X, Activity } from 'lucide-react';
import { DEMO_METRIC_OBSERVATION } from '../data/demo';

interface OutcomePanelProps {
  changeId: string;
  onClose: () => void;
}

export const OutcomePanel: React.FC<OutcomePanelProps> = ({ onClose }) => {
  return (
    <div className="absolute top-20 right-4 z-50 w-[420px] max-h-[calc(100vh-140px)] overflow-y-auto observatory-panel rounded-2xl p-5 text-[#F5F3EE] shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#35D6C5]" />
          <div>
            <h3 className="font-outfit font-extrabold text-base text-[#F5F3EE]">OBSERVED POST-SHIP OUTCOMES</h3>
            <span className="font-mono text-[10px] text-[#35D6C5]">CLOSED-LOOP TELEMETRY VALIDATION</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#8E9BAE] hover:text-[#F5F3EE]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-3 py-2 rounded-xl bg-[#35D6C5]/10 border border-[#35D6C5]/30 flex items-center justify-between font-mono text-xs">
        <span className="text-[#35D6C5] font-bold">DEMO TELEMETRY FEED</span>
        <span className="text-[#8E9BAE]">SHIPPED 7 DAYS AGO</span>
      </div>

      <div className="flex flex-col gap-3">
        {DEMO_METRIC_OBSERVATION.map((obs, idx) => {
          const isDeltaPositive = obs.variance >= 0;

          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0E1320] border border-white/10 hover:border-[#35D6C5]/50 transition-all flex flex-col gap-3"
            >
              <span className="font-outfit font-bold text-xs text-[#F5F3EE]">{obs.metric_name}</span>

              <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center">
                <div className="p-2 rounded-lg bg-[#131826]">
                  <span className="text-[9px] text-[#8E9BAE] block">PREDICTED</span>
                  <span className="font-bold text-[#F4C95D]">{obs.predicted_change > 0 ? `+${obs.predicted_change}%` : `${obs.predicted_change}%`}</span>
                </div>

                <div className="p-2 rounded-lg bg-[#131826]">
                  <span className="text-[9px] text-[#8E9BAE] block">OBSERVED</span>
                  <span className="font-bold text-[#35D6C5]">{obs.observed_change > 0 ? `+${obs.observed_change}%` : `${obs.observed_change}%`}</span>
                </div>

                <div className="p-2 rounded-lg bg-[#131826]">
                  <span className="text-[9px] text-[#8E9BAE] block">DELTA</span>
                  <span className={`font-bold ${isDeltaPositive ? 'text-[#35D6C5]' : 'text-[#FF6B5E]'}`}>
                    {obs.variance > 0 ? `+${obs.variance}%` : `${obs.variance}%`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
