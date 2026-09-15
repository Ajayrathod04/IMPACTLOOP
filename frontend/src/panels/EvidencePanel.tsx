import React from 'react';
import { EvidenceRecord } from '../types';
import { Sparkles, X, Database } from 'lucide-react';

interface EvidencePanelProps {
  evidence: EvidenceRecord[];
  onClose: () => void;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({
  evidence,
  onClose
}) => {
  return (
    <div className="fixed right-4 top-24 bottom-24 z-50 w-full max-w-lg bg-[#0E1320]/95 border border-[#8B7CFF]/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#121829] pb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#8B7CFF]" />
            <h3 className="font-mono text-base font-bold text-[#F5F3EE] uppercase tracking-wider">
              Verified Evidence Trails ({evidence.length})
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 font-sans">
          Empirical signals, historical cohort experiments, and AST codebase dependencies backing downstream graph nodes.
        </p>

        <div className="space-y-3">
          {evidence.map((item) => (
            <div key={item.id} className="bg-[#121829] border border-[#262838] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-200">
                  {item.title}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border bg-[#35D6C5]/10 text-[#35D6C5] border-[#35D6C5]/30">
                  {(item.strength * 100).toFixed(0)}% STRENGTH
                </span>
              </div>

              <p className="text-xs text-slate-300">
                {item.summary}
              </p>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-[#262838]">
                <div className="flex items-center space-x-1">
                  <Database className="w-3.5 h-3.5 text-[#8B7CFF]" />
                  <span>Source: {item.source_type}</span>
                </div>
                <span>Confidence: {(item.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[#121829] flex justify-end">
        <button onClick={onClose} className="bg-[#121829] hover:bg-[#1A2235] text-slate-200 border border-[#262838] px-4 py-2 rounded-xl text-xs font-mono">
          CLOSE EVIDENCE PANEL
        </button>
      </div>
    </div>
  );
};
