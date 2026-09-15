import React from 'react';
import {
  AlertTriangle,
  GitBranch,
  HelpCircle,
  CheckSquare,
  ShieldAlert,
  Target,
  Brain,
  X,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Change } from '../../types';

export interface AnalysisDetailViewProps {
  change: Change;
  onClose: () => void;
}

export const AnalysisDetailView: React.FC<AnalysisDetailViewProps> = ({
  change,
  onClose,
}) => {
  const analysis = change.analysis_result;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative glow-warm">
        {/* Header Bar */}
        <div className="p-6 border-b border-slate-800/80 bg-slate-950/80 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              {change.is_demo ? <Badge type="demo" /> : <Badge type="status" status={change.status} />}
              <Badge type="risk" riskLevel={change.risk_level} />
              <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                {change.category}
              </span>
              <span className="text-xs font-mono text-slate-500">ID: {change.id}</span>
            </div>
            <h2 className="text-xl font-bold text-ivory-100 tracking-tight">{change.title}</h2>
            {change.description && (
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">{change.description}</p>
            )}
            {change.intended_outcome && (
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <Target className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-semibold text-slate-400">Intended Goal:</span>
                <span>{change.intended_outcome}</span>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Risk Score & Intelligence Summary Banner */}
          {analysis && (
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
                  <div className="text-center">
                    <span className="text-2xl font-black text-rose-400 font-mono">
                      {analysis.risk_score}
                    </span>
                    <span className="block text-[9px] font-mono text-slate-400 uppercase">/ 100 Risk</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-ivory-100">
                      Deterministic Consequence Score
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-800/50">
                      {Math.round(analysis.confidence_score * 100)}% Model Confidence
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                    {analysis.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge type="risk" riskLevel={analysis.risk_level} size="md" />
              </div>
            </div>
          )}

          {/* Affected Systems & Areas */}
          {analysis && analysis.affected_areas.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-amber-400" />
                Affected Core Systems ({analysis.affected_areas.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.affected_areas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-ivory-100 flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Downstream Impact Nodes */}
          {analysis && analysis.downstream_impacts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Predicted Downstream Consequences ({analysis.downstream_impacts.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysis.downstream_impacts.map((node) => (
                  <div
                    key={node.id}
                    className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 space-y-2 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-ivory-100">{node.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-800">
                        Hop Depth {node.depth}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{node.details}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-900 font-mono">
                      <span>Domain: {node.domain_type}</span>
                      <span className="text-emerald-400">
                        {Math.round(node.confidence_score * 100)}% Confidence
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assumptions & Unknowns */}
          {analysis && analysis.assumptions_unknowns.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Surfaced Assumptions & Unknowns ({analysis.assumptions_unknowns.length})
              </h3>
              <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4 space-y-2">
                {analysis.assumptions_unknowns.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-amber-200/90">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Mitigation Actions */}
          {analysis && analysis.recommended_actions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                Recommended Actionable Guardrails ({analysis.recommended_actions.length})
              </h3>
              <div className="space-y-2">
                {analysis.recommended_actions.map((act) => (
                  <div
                    key={act.id}
                    className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/40 shrink-0 mt-0.5">
                        <CheckSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-ivory-100">{act.title}</p>
                        {act.owner && (
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                            Assigned: <span className="text-amber-300">{act.owner}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-slate-900 text-slate-300 border border-slate-800">
                        {act.priority} priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Brain className="w-4 h-4 text-amber-400" />
            ImpactLoop Deterministic Analysis Engine v0.2.0
          </div>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Inspection
          </Button>
        </div>
      </div>
    </div>
  );
};
