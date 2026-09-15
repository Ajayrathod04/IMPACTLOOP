import React from 'react';
import { ImpactNode, EvidenceRecord, GuardrailRecommendation } from '../types';
import { X, Sparkles, ShieldAlert } from 'lucide-react';

interface ImpactInspectorProps {
  node: ImpactNode | null;
  evidence: EvidenceRecord[];
  recommendations: GuardrailRecommendation[];
  onClose: () => void;
}

export const ImpactInspector: React.FC<ImpactInspectorProps> = ({
  node,
  evidence,
  recommendations,
  onClose
}) => {
  if (!node) return null;

  const nodeEvidence = evidence.filter(e => e.node_id === node.id || evidence.length > 0);
  const severityScore = (node.severity_score || 0.5) * 100;

  return (
    <div className="fixed right-4 top-24 bottom-24 z-50 w-full max-w-md bg-[#0E1320]/95 border border-[#8B7CFF]/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#121829] pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase font-bold ${
                node.provenance === 'VERIFIED_FACT' ? 'bg-[#35D6C5]/10 text-[#35D6C5] border-[#35D6C5]/30' :
                node.provenance === 'EXPLICIT_UNKNOWN' ? 'bg-[#F4C95D]/10 text-[#F4C95D] border-[#F4C95D]/30' :
                'bg-[#8B7CFF]/10 text-[#8B7CFF] border-[#8B7CFF]/30'
              }`}>
                {(node.provenance || 'PROBABILISTIC_INFERENCE').replace('_', ' ')}
              </span>
              <span className="text-slate-400 font-mono text-xs">
                Hop Depth: <strong className="text-slate-200">{node.depth}</strong>
              </span>
            </div>

            <h3 className="font-mono text-lg font-bold text-[#F5F3EE] mt-2">
              {node.title}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              System Domain: <strong className="text-slate-200">{node.domain_type}</strong>
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-[#121829]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Risk & Confidence Gauge Ribbon */}
        <div className="grid grid-cols-2 gap-3 bg-[#121829] p-3 rounded-xl border border-[#262838] font-mono">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">CONSEQUENCE SEVERITY</span>
            <span className={`text-base font-bold mt-0.5 block ${severityScore >= 70 ? 'text-[#FF6B5E]' : 'text-[#F4C95D]'}`}>
              {severityScore.toFixed(0)}%
            </span>
          </div>
          <div className="border-l border-[#262838] pl-3">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">PREDICTION CONFIDENCE</span>
            <span className="text-base font-bold text-[#8B7CFF] mt-0.5 block">
              {(node.confidence_score * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Predicted Consequence Statement */}
        <div className="bg-[#121829] border border-[#262838] rounded-xl p-4 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">PREDICTED CONSEQUENCE</span>
          <p className="text-xs text-slate-200 font-sans leading-relaxed">
            {node.predicted_consequence || 'Potential operational friction and metric variance detected in this system area.'}
          </p>
        </div>

        {/* Linked Evidence Trails */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-mono text-xs font-bold text-[#8B7CFF]">
              <Sparkles className="w-4 h-4 text-[#F4C95D]" />
              <span>LINKED EVIDENCE ({nodeEvidence.length})</span>
            </div>
          </div>

          <div className="space-y-2">
            {nodeEvidence.slice(0, 2).map((item) => (
              <div key={item.id} className="bg-[#121829] border border-[#262838] rounded-lg p-3 space-y-1">
                <span className="text-xs font-mono font-bold text-slate-200 block">{item.title}</span>
                <p className="text-[11px] text-slate-400">{item.summary}</p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-[#262838]/50">
                  <span>Source: {item.source_type}</span>
                  <span className="text-[#35D6C5]">{(item.strength * 100).toFixed(0)}% Strength</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Validation / Guardrail */}
        {recommendations.length > 0 && (
          <div className="bg-[#B8E986]/10 border border-[#B8E986]/30 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-mono text-[#B8E986] uppercase font-bold flex items-center">
              <ShieldAlert className="w-3.5 h-3.5 mr-1" /> RECOMMENDED GUARDRAIL
            </span>
            <p className="text-xs font-mono text-slate-100 font-bold mt-1">
              {recommendations[0].title}
            </p>
            <p className="text-[11px] text-slate-300">
              {recommendations[0].rationale}
            </p>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-[#121829] flex justify-end">
        <button
          onClick={onClose}
          className="bg-[#121829] hover:bg-[#1A2235] text-slate-200 border border-[#262838] px-4 py-2 rounded-xl text-xs font-mono transition-all"
        >
          DISMISS INSPECTOR
        </button>
      </div>
    </div>
  );
};
