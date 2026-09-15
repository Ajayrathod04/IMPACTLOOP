import React, { useState } from "react";
import { Sliders, CheckCircle2, Sparkles, BarChart2 } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export interface ScenarioComparisonViewProps {
  onSelectScenario?: (scenarioId: string) => void;
}

export const ScenarioComparisonView: React.FC<ScenarioComparisonViewProps> = ({
  onSelectScenario,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<string>("expected");

  const scenarios = [
    {
      id: "conservative",
      title: "CONSERVATIVE TRACK",
      probability: "25%",
      risk_level: "medium" as const,
      risk_score: 58,
      confidence: "92%",
      activation_delta: "-3.0%",
      revenue_impact: "+$42,000 / mo",
      support_load: "+4.0%",
      affected_systems_count: 3,
      estimated_impact:
        "Minimal activation drop (-3%). Conversion velocity increases by 15%.",
      recommendation:
        "Direct 100% rollout with automated trial extension fallback.",
      border:
        "border-emerald-800/60 bg-emerald-950/20 hover:border-emerald-500/60",
    },
    {
      id: "expected",
      title: "EXPECTED BASELINE",
      probability: "55%",
      risk_level: "high" as const,
      risk_score: 82,
      confidence: "88%",
      activation_delta: "-8.0%",
      revenue_impact: "+$68,000 / mo",
      support_load: "+12.0%",
      affected_systems_count: 7,
      estimated_impact:
        "Temporary -8.0% activation drop balanced by +22% sales outreach velocity.",
      recommendation:
        "Deploy 10% A/B cohort rollout with Day-3 email re-engagement.",
      border: "border-amber-800/60 bg-amber-950/20 hover:border-amber-500/60",
    },
    {
      id: "adverse",
      title: "ADVERSE STRESS TRACK",
      probability: "20%",
      risk_level: "critical" as const,
      risk_score: 94,
      confidence: "75%",
      activation_delta: "-15.0%",
      revenue_impact: "-$15,000 / mo",
      support_load: "+28.0%",
      affected_systems_count: 9,
      estimated_impact:
        "Severe -15% activation drop and 28% increase in Zendesk support volume.",
      recommendation:
        "Implement instant 14-day trial extension button on Day 6 exit prompt.",
      border: "border-rose-800/60 bg-rose-950/20 hover:border-rose-500/60",
    },
  ];

  const handleSelect = (id: string) => {
    setSelectedScenario(id);
    onSelectScenario?.(id);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header Console */}
      <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-950/80 text-amber-300 text-xs font-mono font-bold border border-amber-800/60 mb-2">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            SCENARIO LAB SIMULATION CONSOLE
          </div>
          <h2 className="text-xl font-bold text-ivory-100 tracking-tight font-sans">
            Decision Range Simulation: Free Trial (14d → 7d)
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Compare conservative, expected baseline, and adverse stress outcomes
            before rollout approval.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Sparkles className="w-4 h-4" />}
        >
          RUN CUSTOM MODEL
        </Button>
      </div>

      {/* Decision Range Visual Range Bar */}
      <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1 text-amber-400 font-bold uppercase">
            <BarChart2 className="w-3.5 h-3.5" />
            ACTIVATION IMPACT DECISION RANGE
          </span>
          <span>Baseline Model Accuracy: 88%</span>
        </div>

        <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs">
          <div className="bg-emerald-950/40 p-2 rounded border border-emerald-800/40">
            <span className="text-[9px] text-slate-400 block uppercase">
              CONSERVATIVE
            </span>
            <span className="text-emerald-400 font-bold text-sm">
              -3% Activation
            </span>
          </div>
          <div className="bg-amber-950/40 p-2 rounded border border-amber-800/40">
            <span className="text-[9px] text-slate-400 block uppercase">
              EXPECTED BASELINE
            </span>
            <span className="text-amber-400 font-bold text-sm">
              -8% Activation
            </span>
          </div>
          <div className="bg-rose-950/40 p-2 rounded border border-rose-800/40">
            <span className="text-[9px] text-slate-400 block uppercase">
              ADVERSE STRESS
            </span>
            <span className="text-rose-400 font-bold text-sm">
              -15% Activation
            </span>
          </div>
        </div>
      </div>

      {/* 3 Scenario Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {scenarios.map((sc) => {
          const isSelected = selectedScenario === sc.id;
          return (
            <div
              key={sc.id}
              onClick={() => handleSelect(sc.id)}
              className={`border rounded-xl p-5 space-y-4 transition-all cursor-pointer relative ${sc.border} ${
                isSelected
                  ? "ring-2 ring-amber-400 shadow-2xl scale-[1.01]"
                  : "opacity-90 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <Badge type="risk" riskLevel={sc.risk_level} />
                <span className="text-xs font-mono font-bold text-amber-300 bg-[#07090e] px-2.5 py-0.5 rounded border border-slate-800">
                  {sc.probability} Probability
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-ivory-100 font-mono tracking-tight">
                  {sc.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-mono">
                  <span>
                    Risk Score:{" "}
                    <strong className="text-ivory-100">
                      {sc.risk_score}/100
                    </strong>
                  </span>
                  <span>
                    Confidence:{" "}
                    <strong className="text-emerald-400">
                      {sc.confidence}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Metric Delta Table */}
              <div className="grid grid-cols-3 gap-2 bg-[#07090e] p-2.5 rounded border border-slate-800/90 text-[11px] font-mono text-center">
                <div>
                  <span className="text-[9px] text-slate-500 block uppercase">
                    Activation
                  </span>
                  <span className="font-bold text-amber-400">
                    {sc.activation_delta}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block uppercase">
                    Revenue
                  </span>
                  <span className="font-bold text-emerald-400">
                    {sc.revenue_impact.split(" ")[0]}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block uppercase">
                    Support
                  </span>
                  <span className="font-bold text-orange-400">
                    {sc.support_load}
                  </span>
                </div>
              </div>

              <div className="space-y-1 bg-[#07090e] p-3 rounded border border-slate-800/80 text-xs font-sans">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                  Estimated Consequence
                </span>
                <p className="text-slate-200 leading-snug">
                  {sc.estimated_impact}
                </p>
              </div>

              <div className="space-y-1 text-xs pt-2 border-t border-slate-800/80 font-mono">
                <span className="text-[10px] uppercase text-amber-400 block font-bold">
                  Recommended Strategy
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                  {sc.recommendation}
                </p>
              </div>

              {isSelected && (
                <div className="absolute top-3 right-3 text-amber-400">
                  <CheckCircle2 className="w-5 h-5 fill-slate-950 text-amber-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
