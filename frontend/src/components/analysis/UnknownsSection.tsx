import React from 'react';
import { HelpCircle, AlertCircle } from 'lucide-react';

export interface UnknownsSectionProps {
  unknowns?: string[];
}

export const UnknownsSection: React.FC<UnknownsSectionProps> = ({ unknowns }) => {
  const defaultUnknowns = [
    '3 enterprise customer segments lack historical activation telemetry for 7-day trials.',
    'Chargebee billing webhook idempotency on trial expiration has not been load-tested.',
    'Support desk inquiry volume spike (+15%) is estimated from 2025 historical patterns.',
  ];

  const list = unknowns && unknowns.length > 0 ? unknowns : defaultUnknowns;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/60 shadow-md">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-ivory-100 flex items-center gap-2">
              What We Don't Know Yet (Surfaced Unknowns)
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-amber-950 text-amber-300 border border-amber-800/50">
                {list.length} Unverified Assumptions
              </span>
            </h3>
            <p className="text-xs text-slate-400 italic font-mono mt-0.5">
              "Confidence is not certainty." — ImpactLoop Uncertainty Matrix
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
            Model Uncertainty: <strong className="text-amber-400">14% Risk Margin</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-950/90 border border-amber-900/30 rounded-xl p-4 space-y-2 hover:border-amber-700/50 transition-all card-hover-effect"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Unverified Gap #{idx + 1}
              </span>
              <span className="text-[10px] font-mono text-slate-500">Requires Empirical Proof</span>
            </div>

            <p className="text-xs text-ivory-100 leading-relaxed font-sans">{item}</p>

            <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>Suggested Validation:</span>
              <span className="text-amber-300 font-semibold">Cohort Test</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
