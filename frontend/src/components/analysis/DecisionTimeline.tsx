import React from 'react';
import { ChangeStatus } from '../../types';
import { cn } from '../../lib/utils';
import { Clock, Activity, CheckCircle2, Send, Eye, Brain, ChevronRight } from 'lucide-react';

export interface DecisionTimelineProps {
  currentStatus: ChangeStatus;
  onStageClick?: (stage: ChangeStatus) => void;
}

export const DecisionTimeline: React.FC<DecisionTimelineProps> = ({
  currentStatus,
  onStageClick,
}) => {
  const stages: { id: ChangeStatus; label: string; icon: React.ElementType }[] = [
    { id: 'draft', label: 'PROPOSED', icon: Clock },
    { id: 'analyzing', label: 'ANALYZING', icon: Activity },
    { id: 'approved', label: 'DECISION', icon: CheckCircle2 },
    { id: 'shipped', label: 'SHIPPED', icon: Send },
    { id: 'observing', label: 'OBSERVED', icon: Eye },
    { id: 'learned', label: 'LEARNED', icon: Brain },
  ];

  const currentIdx = stages.findIndex((s) => s.id === currentStatus);
  const activeIndex = currentIdx >= 0 ? currentIdx : 1; // Default to ANALYZING

  return (
    <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-4 shadow-xl select-none">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-signal" />
          DECISION LIFECYCLE PIPELINE
        </span>
        <span className="text-[11px] font-mono text-slate-400">
          Current State: <strong className="text-amber-400 uppercase tracking-wider">{stages[activeIndex].label}</strong>
        </span>
      </div>

      {/* Horizontal Connected Rail */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto py-1 scrollbar-none">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isCurrent = idx === activeIndex;
          const isPassed = idx < activeIndex;

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => onStageClick?.(stage.id)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono transition-all cursor-pointer shrink-0 relative',
                  isCurrent
                    ? 'bg-amber-950/70 border-amber-500/80 text-amber-300 font-semibold shadow-md shadow-amber-950/50'
                    : isPassed
                    ? 'bg-[#0e121a] border-slate-800 text-slate-300 hover:border-slate-700'
                    : 'bg-[#080a0f] border-slate-900 text-slate-500 hover:text-slate-400 hover:border-slate-800'
                )}
              >
                <Icon
                  className={cn(
                    'w-3.5 h-3.5',
                    isCurrent ? 'text-amber-400 animate-pulse' : isPassed ? 'text-emerald-400' : 'text-slate-500'
                  )}
                />
                <span className="tracking-tight">{stage.label}</span>
                {isCurrent && (
                  <span className="text-[9px] font-mono bg-amber-500 text-slate-950 px-1 py-0.2 rounded font-bold uppercase">
                    ACTIVE
                  </span>
                )}
              </button>
              {idx < stages.length - 1 && (
                <ChevronRight className={cn('w-3.5 h-3.5 shrink-0', idx < activeIndex ? 'text-emerald-500/60' : 'text-slate-800')} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
