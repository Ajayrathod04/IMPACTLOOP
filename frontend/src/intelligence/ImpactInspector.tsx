import React from 'react';
import { X, ShieldAlert, FileText, Activity, CheckCircle2 } from 'lucide-react';
import { ImpactNode, EvidenceRecord } from '../types';

interface ImpactInspectorProps {
  node: ImpactNode;
  evidence: EvidenceRecord[];
  recommendations?: any[];
  onClose: () => void;
}

export const ImpactInspector: React.FC<ImpactInspectorProps> = ({
  node,
  evidence,
  onClose
}) => {
  const linkedEvidence = evidence.filter((e) => e.node_id === node.id || node.evidence_ids?.includes(e.id));

  return (
    <div className="absolute top-20 left-4 z-50 w-96 max-h-[calc(100vh-140px)] overflow-y-auto observatory-panel rounded-2xl p-5 text-[#F5F3EE] shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-left duration-300">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-white/10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4C95D] shadow-[0_0_10px_#F4C95D]" />
            <span className="font-mono text-[10px] text-[#8E9BAE] uppercase tracking-widest">
              SYSTEM INSPECTOR
            </span>
          </div>
          <h3 className="font-outfit font-extrabold text-lg text-[#F5F3EE]">
            {node.title || node.name}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#8E9BAE] hover:text-[#F5F3EE] transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Provenance Badge & Severity Score */}
      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
        <div className="p-2.5 rounded-xl bg-[#0E1320] border border-white/5 flex flex-col gap-1">
          <span className="text-[9px] text-[#8E9BAE]">PROVENANCE</span>
          <span className="font-bold text-[#35D6C5] flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#35D6C5]" />
            {node.provenance || 'VERIFIED_FACT'}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-[#0E1320] border border-white/5 flex flex-col gap-1">
          <span className="text-[9px] text-[#8E9BAE]">SEVERITY SCORE</span>
          <span className="font-bold text-[#FF6B5E] flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-[#FF6B5E]" />
            {node.severity_score ? `${node.severity_score} / 100` : 'HIGH'}
          </span>
        </div>
      </div>

      {/* Why Affected */}
      {node.why_affected && (
        <div className="p-3 rounded-xl bg-[#0E1320]/90 border border-[#8B7CFF]/20 flex flex-col gap-1.5">
          <span className="font-mono text-[10px] text-[#8B7CFF] uppercase font-bold tracking-wider">
            WHY THIS SYSTEM IS AFFECTED
          </span>
          <p className="text-xs text-[#F5F3EE]/90 leading-relaxed font-outfit">
            {node.why_affected}
          </p>
        </div>
      )}

      {/* Predicted Consequence */}
      {node.predicted_consequence && (
        <div className="p-3 rounded-xl bg-[#0E1320]/90 border border-[#F4C95D]/20 flex flex-col gap-1.5">
          <span className="font-mono text-[10px] text-[#F4C95D] uppercase font-bold tracking-wider">
            PREDICTED CONSEQUENCE
          </span>
          <p className="text-xs text-[#F5F3EE]/90 leading-relaxed font-outfit">
            {node.predicted_consequence}
          </p>
        </div>
      )}

      {/* Linked Evidence Records */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] text-[#35D6C5] uppercase font-bold tracking-wider flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          VERIFIED EVIDENCE ({linkedEvidence.length})
        </span>

        {linkedEvidence.length > 0 ? (
          linkedEvidence.map((ev) => (
            <div key={ev.id} className="p-2.5 rounded-xl bg-[#0E1320] border border-[#35D6C5]/20 text-xs flex flex-col gap-1">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#35D6C5] font-bold">{ev.source_type}</span>
                <span className="text-[#8E9BAE]">{Math.round(ev.confidence * 100)}% CONFIDENCE</span>
              </div>
              <p className="text-[#F5F3EE]/80 text-[11px] font-outfit">{ev.summary}</p>
            </div>
          ))
        ) : (
          <div className="p-2.5 rounded-xl bg-[#0E1320] border border-white/5 text-[11px] font-mono text-[#8E9BAE]">
            No direct telemetry link attached to this node. Derived via causal propagation.
          </div>
        )}
      </div>

      {/* Business Effect */}
      {node.business_effect && (
        <div className="p-3 rounded-xl bg-[#131826] border border-[#B8E986]/30 flex flex-col gap-1">
          <span className="font-mono text-[10px] text-[#B8E986] uppercase font-bold tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            BUSINESS OUTCOME EFFECT
          </span>
          <p className="text-xs text-[#F5F3EE]/90 font-outfit">{node.business_effect}</p>
        </div>
      )}
    </div>
  );
};
