import React from 'react';
import { ExplicitUnknown } from '../types';
import { HelpCircle, X } from 'lucide-react';

interface UnknownsPanelProps {
  unknowns: ExplicitUnknown[];
  onClose: () => void;
}

export const UnknownsPanel: React.FC<UnknownsPanelProps> = ({
  unknowns,
  onClose
}) => {
  return (
    <div className="fixed right-4 top-24 bottom-24 z-50 w-full max-w-lg bg-[#0E1320]/95 border border-[#F4C95D]/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#121829] pb-4">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-[#F4C95D]" />
            <h3 className="font-mono text-base font-bold text-[#F5F3EE] uppercase tracking-wider">
              Explicit System Unknowns ({unknowns.length})
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 font-sans">
          Unresolved hypotheses and unverified variables that require pre-ship guardrails or targeted validation.
        </p>

        <div className="space-y-3">
          {unknowns.map((unk) => (
            <div key={unk.id} className="bg-[#121829] border border-[#262838] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#F4C95D]">
                  {unk.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-[#FF6B5E]/10 text-[#FF6B5E] border-[#FF6B5E]/30">
                  IMPACT: {unk.impact_level}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-sans">
                {unk.description}
              </p>

              <div className="bg-[#080B12] p-2.5 rounded-lg border border-[#262838] text-[11px] font-mono text-slate-400">
                <strong className="text-[#F4C95D]">Validation Method:</strong> {unk.resolution_method}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[#121829] flex justify-end">
        <button onClick={onClose} className="bg-[#121829] hover:bg-[#1A2235] text-slate-200 border border-[#262838] px-4 py-2 rounded-xl text-xs font-mono">
          CLOSE UNKNOWNS PANEL
        </button>
      </div>
    </div>
  );
};
