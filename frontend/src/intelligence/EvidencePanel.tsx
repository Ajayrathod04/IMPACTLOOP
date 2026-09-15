import React from 'react';
import { X, FileText, Database, GitBranch, Activity } from 'lucide-react';
import { EvidenceRecord } from '../types';

interface EvidencePanelProps {
  evidence: EvidenceRecord[];
  onClose: () => void;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ evidence, onClose }) => {
  return (
    <div className="absolute top-20 left-4 z-50 w-[420px] max-h-[calc(100vh-140px)] overflow-y-auto observatory-panel rounded-2xl p-5 text-[#F5F3EE] shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-left duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#35D6C5]" />
          <div>
            <h3 className="font-outfit font-extrabold text-base text-[#F5F3EE]">CAUSAL EVIDENCE VAULT</h3>
            <span className="font-mono text-[10px] text-[#35D6C5]">VERIFIED PROVENANCE RECORDS</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#8E9BAE] hover:text-[#F5F3EE]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#35D6C5]/10 border border-[#35D6C5]/30">
        <span className="font-mono text-xs text-[#35D6C5] font-bold">DEMO EVIDENCE ACTIVE</span>
        <span className="font-mono text-[10px] text-[#8E9BAE]">4 AUDITED SOURCES</span>
      </div>

      <div className="flex flex-col gap-3">
        {evidence.map((rec) => (
          <div
            key={rec.id}
            className="p-3.5 rounded-xl bg-[#0E1320] border border-[#35D6C5]/20 hover:border-[#35D6C5]/50 transition-all flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-outfit font-bold text-xs text-[#F5F3EE]">{rec.title}</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#35D6C5]/20 text-[#35D6C5] border border-[#35D6C5]/40 font-bold">
                {Math.round(rec.confidence * 100)}% CONFIDENCE
              </span>
            </div>

            <p className="text-xs text-[#F5F3EE]/80 leading-relaxed font-outfit">{rec.summary}</p>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-[10px] text-[#8E9BAE]">
              <span className="flex items-center gap-1">
                {rec.source_type === 'TELEMETRY' && <Activity className="w-3 h-3 text-[#35D6C5]" />}
                {rec.source_type === 'AST_DEPENDENCY' && <GitBranch className="w-3 h-3 text-[#8B7CFF]" />}
                {rec.source_type === 'HISTORICAL_EXPERIMENT' && <Database className="w-3 h-3 text-[#F4C95D]" />}
                {rec.source_type}
              </span>
              <span>NODE: {rec.node_id || 'SYSTEM_CORE'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
