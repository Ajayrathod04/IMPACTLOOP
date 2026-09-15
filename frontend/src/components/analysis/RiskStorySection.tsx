import React from 'react';
import { ArrowRight, HelpCircle, AlertTriangle, TrendingDown, ShieldCheck, Zap } from 'lucide-react';

export const RiskStorySection: React.FC = () => {
  const steps = [
    {
      step: '01',
      stage: 'ASSUMPTION',
      title: 'Users can activate within 7 days',
      details: 'Assumes current self-serve onboarding latency allows faster setup without dropping off.',
      icon: HelpCircle,
      accent: 'border-amber-700/60 bg-amber-950/30 text-amber-300',
      badgeColor: 'bg-amber-900/60 text-amber-300 border-amber-700/50',
    },
    {
      step: '02',
      stage: 'CONSEQUENCE',
      title: 'Less time to reach activation',
      details: 'Compressed window reduces available calendar time for users to complete key team setup.',
      icon: AlertTriangle,
      accent: 'border-orange-700/60 bg-orange-950/30 text-orange-300',
      badgeColor: 'bg-orange-900/60 text-orange-300 border-orange-700/50',
    },
    {
      step: '03',
      stage: 'BUSINESS IMPACT',
      title: 'Activation risk increases +8%',
      details: 'Top-of-funnel drop accelerates before enterprise sales outreach velocity catches up.',
      icon: TrendingDown,
      accent: 'border-rose-700/60 bg-rose-950/30 text-rose-300',
      badgeColor: 'bg-rose-900/60 text-rose-300 border-rose-700/50',
    },
    {
      step: '04',
      stage: 'GUARDRAIL',
      title: 'Run cohort experiment before rollout',
      details: 'Deploy 10% A/B cohort test with Day-3 email onboarding boost before 100% global release.',
      icon: ShieldCheck,
      accent: 'border-emerald-700/60 bg-emerald-950/30 text-emerald-300',
      badgeColor: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/50',
    },
  ];

  return (
    <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-5 space-y-4 shadow-xl select-none">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60">
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-ivory-100 font-sans tracking-tight">WHY THIS CHANGE MATTERS</h3>
            <p className="text-[11px] text-slate-400 font-mono">Connected causal story from intake assumption to recommended mitigation</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-amber-950/60 text-amber-400 border border-amber-800/50">
          SPATIAL CAUSAL CHAIN
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="relative">
              <div className={`border rounded-lg p-4 space-y-2.5 h-full ${item.accent} transition-all hover:border-amber-500/50`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${item.badgeColor}`}>
                    {item.stage}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex items-start gap-2">
                    <Icon className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <h4 className="text-xs font-bold font-mono tracking-tight text-ivory-100 leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{item.details}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                  <ArrowRight className="w-4 h-4 text-amber-400/80" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
