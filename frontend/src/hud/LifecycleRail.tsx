import React from 'react';
import { Eye, Shield, UserCheck, Rocket, Activity, Brain } from 'lucide-react';

export type LifecycleStage = 'PREDICT' | 'PROVE' | 'DECIDE' | 'SHIP' | 'OBSERVE' | 'LEARN';

interface LifecycleRailProps {
  currentStage: LifecycleStage;
  onStageChange: (stage: LifecycleStage) => void;
}

const STAGES: Array<{ id: LifecycleStage; label: string; icon: any; color: string; desc: string }> = [
  { id: 'PREDICT', label: 'PREDICT', icon: Eye, color: '#F4C95D', desc: 'Trace downstream consequence graph' },
  { id: 'PROVE', label: 'PROVE', icon: Shield, color: '#35D6C5', desc: 'Inspect evidence & explicit unknowns' },
  { id: 'DECIDE', label: 'DECIDE', icon: UserCheck, color: '#FF6B5E', desc: '👤 Human Decision Gate & guardrails' },
  { id: 'SHIP', label: 'SHIP', icon: Rocket, color: '#8B7CFF', desc: 'Release change set to production' },
  { id: 'OBSERVE', label: 'OBSERVE', icon: Activity, color: '#35D6C5', desc: 'Compare predicted vs observed metric telemetry' },
  { id: 'LEARN', label: 'LEARN', icon: Brain, color: '#B8E986', desc: 'Update organizational memory & model rules' }
];

export const LifecycleRail: React.FC<LifecycleRailProps> = ({
  currentStage,
  onStageChange
}) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[92%] select-none">
      <div className="px-3 py-2 rounded-2xl bg-[#10131A]/90 border border-[#8B7CFF]/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center justify-between gap-1 overflow-x-auto">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = currentStage === stage.id;

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => onStageChange(stage.id)}
                className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 group cursor-pointer ${
                  isActive
                    ? 'bg-[#151A27] border border-[#F4C95D] shadow-[0_0_20px_rgba(244,201,93,0.3)] scale-105'
                    : 'hover:bg-[#1B2234] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Icon
                    className="w-4 h-4 transition-transform group-hover:scale-110"
                    style={{ color: isActive ? stage.color : '#8E9BAE' }}
                  />
                  <span
                    className="font-outfit font-extrabold text-xs tracking-wider"
                    style={{ color: isActive ? stage.color : '#8E9BAE' }}
                  >
                    {stage.label}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#8E9BAE] hidden lg:inline line-clamp-1">
                  {stage.desc}
                </span>
              </button>

              {idx < STAGES.length - 1 && (
                <span className="text-[#8E9BAE]/30 font-mono text-xs hidden sm:inline">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
