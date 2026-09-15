import React from "react";
import {
  X,
  AlertTriangle,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Layers,
  Brain,
  HelpCircle,
  CheckSquare,
} from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ImpactNode } from "../../types";

export interface NodeDetailPanelProps {
  node: ImpactNode | null;
  onClose: () => void;
  onGuardrailAdd?: (actionTitle: string) => void;
}

export const NodeDetailPanel: React.FC<NodeDetailPanelProps> = ({
  node,
  onClose,
  onGuardrailAdd,
}) => {
  if (!node) return null;

  return (
    <div className="w-full md:w-96 bg-[#0d111a] border-l border-slate-800 flex flex-col h-full overflow-hidden shadow-2xl backdrop-blur-md animate-in slide-in-from-right-4 duration-200 z-40">
      {/* Analyst Console Header */}
      <div className="p-4 border-b border-slate-800/90 bg-[#07090e] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60 shadow-md">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-ivory-100 font-sans tracking-tight">
              {node.name}
            </h3>
            <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
              {node.domain_type}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          title="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Inspector Body */}
      <div className="p-4 overflow-y-auto space-y-5 flex-1 text-xs font-sans">
        {/* Unverified Assumptions Banner */}
        <div className="bg-amber-950/40 border border-amber-800/60 p-3 rounded-lg flex items-center gap-2.5 text-amber-200 text-xs font-mono">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {node.unverified_assumptions_count || 2} assumptions remain
            unverified
          </span>
        </div>

        {/* Severity & Model Confidence Telemetry */}
        <div className="bg-[#07090e] border border-slate-800/90 p-3.5 rounded-lg space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase">
              AFFECTED SYSTEM SEVERITY
            </span>
            <Badge type="risk" riskLevel={node.severity || "high"} size="sm" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase">
              PREDICTION CONFIDENCE
            </span>
            <span className="font-bold text-emerald-400 font-mono">
              {Math.round((node.confidence_score || 0.78) * 100)}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase">
              HOP DEPTH
            </span>
            <span className="text-slate-300">Level {node.depth}</span>
          </div>
        </div>

        {/* Why This is Affected */}
        <div className="space-y-1.5">
          <h4 className="font-mono font-bold text-amber-400 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            WHY THIS IS AFFECTED
          </h4>
          <p className="text-slate-200 leading-relaxed bg-[#07090e] p-3 rounded-lg border border-slate-800/80">
            {node.why_affected ||
              node.details ||
              "Shorter trial reduces the available time for users to reach the activation event."}
          </p>
        </div>

        {/* Empirical Evidence */}
        <div className="space-y-1.5">
          <h4 className="font-mono font-bold text-slate-300 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            EMPIRICAL EVIDENCE
          </h4>
          <ul className="space-y-1.5">
            {(
              node.evidence || [
                "Trial duration is directly upstream of activation opportunity.",
                "Historical cohort activation timing telemetry (2025-Q4)",
                "Onboarding setup dependency map",
              ]
            ).map((ev, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 bg-[#07090e] p-2.5 rounded border border-slate-800/60 text-slate-300 text-[11px]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{ev}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Predicted Consequence */}
        <div className="space-y-1.5">
          <h4 className="font-mono font-bold text-slate-300 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            PREDICTED CONSEQUENCE
          </h4>
          <p className="text-slate-200 leading-relaxed bg-[#07090e] p-3 rounded-lg border border-slate-800/80">
            {node.details ||
              "Activation conversion may decline before revenue impact becomes visible downstream."}
          </p>
        </div>

        {/* Recommended Guardrail */}
        <div className="space-y-2">
          <h4 className="font-mono font-bold text-emerald-400 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            RECOMMENDED GUARDRAIL
          </h4>
          <div className="bg-emerald-950/30 border border-emerald-800/50 p-3 rounded-lg text-emerald-200 leading-relaxed text-xs">
            {node.recommended_action ||
              "Run a cohort experiment before full global rollout."}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={<CheckSquare className="w-3.5 h-3.5" />}
            onClick={() =>
              onGuardrailAdd?.(
                node.recommended_action || "Run cohort experiment",
              )
            }
          >
            MARK REVIEWED
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<FileText className="w-3.5 h-3.5" />}
            onClick={() =>
              alert(
                `Evidence log for ${node.name}: Verified against 3 past cohorts.`,
              )
            }
          >
            VIEW EVIDENCE
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800/90 bg-[#07090e]">
        <Button
          variant="secondary"
          size="sm"
          className="w-full font-mono text-xs"
          onClick={onClose}
        >
          CLOSE INSPECTOR
        </Button>
      </div>
    </div>
  );
};
