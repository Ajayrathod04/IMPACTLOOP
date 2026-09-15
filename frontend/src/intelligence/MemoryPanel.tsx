import React from 'react';
import { X, BookOpen, Brain, Sparkles } from 'lucide-react';
import { DEMO_LEARNING, DEMO_ORG_MEMORY } from '../data/demo';

interface MemoryPanelProps {
  changeId: string;
  onClose: () => void;
}

export const MemoryPanel: React.FC<MemoryPanelProps> = ({ onClose }) => {
  return (
    <div className="absolute top-20 right-4 z-50 w-[440px] max-h-[calc(100vh-140px)] overflow-y-auto observatory-panel rounded-2xl p-5 text-[#F5F3EE] shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#B8E986]" />
          <div>
            <h3 className="font-outfit font-extrabold text-base text-[#F5F3EE]">ORGANIZATIONAL MEMORY</h3>
            <span className="font-mono text-[10px] text-[#B8E986]">ACCUMULATED DECISION INTELLIGENCE</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#8E9BAE] hover:text-[#F5F3EE]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Learned Patterns from Current Outcome */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] text-[#B8E986] font-bold uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          SYSTEMIC MODEL LEARNINGS FROM CHG-001
        </span>
        {DEMO_LEARNING.map((learn, i) => (
          <div key={i} className="p-3 rounded-xl bg-[#0E1320] border border-[#B8E986]/30 text-xs flex flex-col gap-1.5">
            <span className="font-outfit font-bold text-[#F5F3EE]">{learn.learned_pattern}</span>
            <p className="text-[#8E9BAE] text-[11px] font-mono">{learn.model_update_summary}</p>
          </div>
        ))}
      </div>

      {/* Persistent Org Knowledge Base */}
      <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
        <span className="font-mono text-[10px] text-[#F5F3EE] font-bold uppercase tracking-wider flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-[#F4C95D]" />
          HISTORICAL DECISION MEMORY VAULT
        </span>
        {DEMO_ORG_MEMORY.map((mem) => (
          <div
            key={mem.id}
            className="p-3.5 rounded-xl bg-[#0E1320] border border-white/10 hover:border-[#B8E986]/50 transition-all flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#B8E986]/20 text-[#B8E986] font-bold uppercase">
                {mem.category}
              </span>
              <span className="font-mono text-[10px] text-[#8E9BAE]">{mem.timestamp}</span>
            </div>

            <h4 className="font-outfit font-bold text-xs text-[#F5F3EE]">{mem.title}</h4>
            <p className="text-xs text-[#F5F3EE]/80 leading-relaxed font-outfit">{mem.summary}</p>

            {mem.reusable_rule && (
              <div className="p-2.5 rounded-lg bg-[#131826] border border-[#F4C95D]/30 text-[11px] font-mono text-[#F4C95D]">
                💡 REUSABLE GUARDRAIL: {mem.reusable_rule}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
