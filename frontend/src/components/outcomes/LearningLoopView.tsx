import React from 'react';
import { RefreshCw, Brain, Activity, TrendingUp } from 'lucide-react';

export const LearningLoopView: React.FC = () => {
  const historicalOutcomes = [
    {
      id: 'OUT-2026-001',
      title: 'Free Trial: 14 days → 7 days',
      shipped_date: 'August 15, 2026',
      observed_date: 'September 10, 2026',
      predicted: 'Activation -8.0%',
      shipped: '7-day trial launched',
      observed: 'Activation -5.2%',
      learned: 'Prediction was 2.8pp more pessimistic than reality.',
      accuracy: '96.4%',
      lesson: 'ImpactLoop uses observed outcomes to validate or challenge assumptions used in future evaluations.',
    },
    {
      id: 'OUT-2026-002',
      title: 'Migrate API Gateway Auth to OAuth 2.0 PKCE',
      shipped_date: 'July 01, 2026',
      observed_date: 'August 01, 2026',
      predicted: 'Auth Latency +12ms',
      shipped: 'OAuth PKCE gateway deployed',
      observed: 'Auth Latency +8.5ms',
      learned: 'Prediction was 3.5ms more conservative than observed runtime.',
      accuracy: '94.1%',
      lesson: 'Redis token caching layer eliminated 40% of anticipated database lookup queries.',
    },
    {
      id: 'OUT-2026-003',
      title: 'Deprecate Legacy v1 Invoicing Webhook',
      shipped_date: 'June 10, 2026',
      observed_date: 'July 10, 2026',
      predicted: '15 Webhook Breakages',
      shipped: 'v1 Webhook sunset header enabled',
      observed: '4 Webhook Breakages',
      learned: 'HTTP Sunset headers prevented 11 anticipated partner integration failures.',
      accuracy: '91.8%',
      lesson: 'Publishing HTTP Sunset headers 30 days prior accelerated 75% of partner migration.',
    },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Telemetry Header */}
      <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-950/80 text-amber-300 text-xs font-mono font-bold border border-amber-800/60 mb-1">
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              CLOSED-LOOP LEARNING ENGINE
            </div>
            <h2 className="text-xl font-bold text-ivory-100 tracking-tight font-sans">
              Outcomes Telemetry & Model Calibration
            </h2>
          </div>

          {/* Model Calibration Metric */}
          <div className="bg-[#07090e] border border-emerald-800/50 p-3 rounded-lg flex items-center gap-3 font-mono">
            <div className="w-8 h-8 rounded bg-emerald-950 flex items-center justify-center border border-emerald-800/60 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block uppercase font-bold">MODEL CALIBRATION</span>
              <span className="text-sm font-bold text-emerald-400">Prediction Accuracy ↑ 12%</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-3xl">
          ImpactLoop uses observed outcomes to validate or challenge assumptions used in future evaluations. <strong className="text-amber-400 font-mono">Every completed change recalibrates decision weights automatically.</strong>
        </p>
      </div>

      {/* Signature Timeline Logs */}
      <div className="space-y-5">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400" />
          DECISION TELEMETRY TIMELINE LOGS
        </h3>

        {historicalOutcomes.map((item) => (
          <div key={item.id} className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-500">{item.id}</span>
                <h4 className="text-base font-bold text-ivory-100 font-sans tracking-tight">{item.title}</h4>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-400">Shipped: <strong className="text-slate-200">{item.shipped_date}</strong></span>
                <span className="px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-bold">
                  {item.accuracy} Accuracy
                </span>
              </div>
            </div>

            {/* Signature 4-Stage Timeline Stream */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono">
              <div className="bg-[#07090e] border border-slate-800/80 p-3 rounded-lg space-y-1">
                <span className="text-[9px] text-amber-400 font-bold block uppercase">1. PREDICTED</span>
                <p className="text-xs font-bold text-slate-200">{item.predicted}</p>
              </div>

              <div className="bg-[#07090e] border border-slate-800/80 p-3 rounded-lg space-y-1">
                <span className="text-[9px] text-slate-400 font-bold block uppercase">2. SHIPPED</span>
                <p className="text-xs font-bold text-slate-300">{item.shipped}</p>
              </div>

              <div className="bg-[#07090e] border border-slate-800/80 p-3 rounded-lg space-y-1">
                <span className="text-[9px] text-emerald-400 font-bold block uppercase">3. OBSERVED</span>
                <p className="text-xs font-bold text-emerald-400">{item.observed}</p>
              </div>

              <div className="bg-[#07090e] border border-amber-800/60 p-3 rounded-lg space-y-1">
                <span className="text-[9px] text-amber-400 font-bold block uppercase">4. LEARNED</span>
                <p className="text-xs font-bold text-amber-300">{item.learned}</p>
              </div>
            </div>

            {/* Explanatory telemetry calibration text */}
            <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded-lg flex items-start gap-3">
              <Brain className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                  ORGANIZATIONAL MODEL CALIBRATION
                </span>
                <p className="text-xs text-slate-200 mt-0.5 font-sans leading-relaxed">{item.lesson}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
