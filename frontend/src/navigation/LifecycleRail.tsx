import React from 'react';
import { Layers, ShieldCheck, Activity, Brain, GitBranch } from 'lucide-react';

export type LifecycleStage = 'PREDICT' | 'PROVE' | 'SHIP' | 'OBSERVE' | 'LEARNED';

interface LifecycleRailProps {
  currentStage: LifecycleStage;
  onStageChange: (stage: LifecycleStage) => void;
}

export const LifecycleRail: React.FC<LifecycleRailProps> = ({
  currentStage,
  onStageChange
}) => {
  const stages: { id: LifecycleStage; label: string; icon: any; color: string; desc: string }[] = [
    {
      id: 'PREDICT',
      label: 'PREDICT',
      icon: Layers,
      color: '#F4C95D',
      desc: 'Simulate downstream consequence network & calculate risk score.'
    },
    {
      id: 'PROVE',
      label: 'PROVE',
      icon: GitBranch,
      color: '#8B7CFF',
      desc: 'Evaluate Conservative, Expected & Adverse scenario tracks.'
    },
    {
      id: 'SHIP',
      label: 'SHIP',
      icon: ShieldCheck,
      color: '#FF6B5E',
      desc: 'Human Decision Gate: Approve, Review, or Hold deployment.'
    },
    {
      id: 'OBSERVE',
      label: 'OBSERVE',
      icon: Activity,
      color: '#35D6C5',
      desc: 'Track real-world telemetry vs predicted metric variance.'
    },
    {
      id: 'LEARNED',
      label: 'LEARNED',
      icon: Brain,
      color: '#B8E986',
      desc: 'Update graph weights & store reusable organizational memory.'
    }
  ];

  const activeObj = stages.find(s => s.id === currentStage) || stages[0];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 max-w-4xl mx-auto bg-[#0E1320]/90 border border-[#8B7CFF]/20 rounded-2xl p-3 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 md:pb-0">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = currentStage === stage.id;
          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => onStageChange(stage.id)}
                className={`flex flex-col items-center p-2 rounded-xl transition-all font-mono text-xs ${
                  isActive 
                    ? 'bg-[#121829] border border-current shadow-lg scale-105' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#121829]/50 border border-transparent'
                }`}
                style={{ color: isActive ? stage.color : undefined }}
              >
                <div className="flex items-center space-x-1.5 font-bold">
                  <Icon className="w-4 h-4" />
                  <span>{stage.label}</span>
                </div>
              </button>
              {idx < stages.length - 1 && (
                <span className="text-slate-600 font-mono text-xs hidden sm:inline">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-2 text-center text-[11px] font-mono text-slate-400 border-t border-[#121829] pt-1.5 hidden sm:block">
        <strong style={{ color: activeObj.color }}>{activeObj.label}:</strong> {activeObj.desc}
      </div>
    </div>
  );
};
