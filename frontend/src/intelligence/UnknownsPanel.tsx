import React from 'react';
import { X, HelpCircle, ShieldCheck } from 'lucide-react';
import { ExplicitUnknown } from '../types';

interface UnknownsPanelProps {
  unknowns: ExplicitUnknown[];
  onClose: () => void;
}

export const UnknownsPanel: React.FC<UnknownsPanelProps> = ({ unknowns, onClose }) => {
  return (
    <div className="absolute top-20 left-4 z-50 w-[420px] max-h-[calc(100vh-140px)] overflow-y-auto observatory-panel rounded-2xl p-5 text-[#F5F3EE] shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-left duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#8B7CFF]" />
          <div>
            <h3 className="font-outfit font-extrabold text-base text-[#F5F3EE]">EXPLICIT UNKNOWNS</h3>
            <span className="font-mono text-[10px] text-[#8B7CFF]">UNCERTAINTY BOUNDARY & RESOLUTION</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#8E9BAE] hover:text-[#F5F3EE]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 rounded-xl bg-[#8B7CFF]/10 border border-[#8B7CFF]/30 text-xs font-outfit text-[#F5F3EE]/90">
        ImpactLoop explicitly surfaces unverified assumptions and high-impact unknowns before shipping, allowing teams to de-risk changes intentionally.
      </div>

      <div className="flex flex-col gap-3">
        {unknowns.map((unk) => (
          <div
            key={unk.id}
            className="p-4 rounded-xl bg-[#0E1320] border border-[#8B7CFF]/30 hover:border-[#8B7CFF] transition-all flex flex-col gap-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-outfit font-bold text-xs text-[#F5F3EE]">{unk.title}</span>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#FF6B5E]/20 text-[#FF6B5E] border border-[#FF6B5E]/40 font-bold uppercase">
                {unk.impact_level} UNCERTAINTY
              </span>
            </div>

            <p className="text-xs text-[#F5F3EE]/80 leading-relaxed font-outfit">{unk.description}</p>

            <div className="p-2.5 rounded-lg bg-[#131826] border border-[#35D6C5]/30 flex flex-col gap-1">
              <span className="font-mono text-[9px] text-[#35D6C5] font-bold uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                HOW TO RESOLVE BEFORE SHIP
              </span>
              <p className="text-[11px] text-[#F5F3EE]/90 font-outfit">{unk.resolution_method}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
