import React, { useState } from 'react';
import { X, UserCheck, CheckCircle2, AlertTriangle, PauseCircle, Lock } from 'lucide-react';
import { GuardrailRecommendation, HumanDecision, ExplicitUnknown } from '../types';
import { DEMO_RISK_ASSESSMENT } from '../data/demo';
import { RiskInstrument } from './RiskInstrument';

interface DecisionGateProps {
  changeId: string;
  currentDecision: HumanDecision | null;
  recommendations: GuardrailRecommendation[];
  unknowns: ExplicitUnknown[];
  onDecisionSubmitted: (decision: HumanDecision) => void;
  onClose: () => void;
}

export const DecisionGate: React.FC<DecisionGateProps> = ({
  currentDecision,
  recommendations,
  onDecisionSubmitted,
  onClose
}) => {
  const [selectedStatus, setSelectedStatus] = useState<'APPROVED' | 'REVIEW_REQUIRED' | 'HOLD'>(
    currentDecision?.status || 'APPROVED'
  );
  const [reviewer, setReviewer] = useState<string>(
    currentDecision?.reviewer || 'Head of Product Operations'
  );
  const [rationale, setRationale] = useState<string>(
    currentDecision?.rationale || 'Approved for 25% cohort rollout with automated 3-day extension guardrail enabled.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dec: HumanDecision = {
      status: selectedStatus,
      reviewer,
      rationale,
      acknowledged_guardrails: recommendations.map((r) => r.id),
      timestamp: new Date().toISOString()
    };
    onDecisionSubmitted(dec);
  };

  return (
    <div className="absolute top-20 right-4 z-50 w-[440px] max-h-[calc(100vh-140px)] overflow-y-auto observatory-panel-gold rounded-2xl p-5 text-[#F5F3EE] shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-[#F4C95D]/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#F4C95D]/20 border border-[#F4C95D] flex items-center justify-center text-[#F4C95D]">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg text-[#F4C95D] tracking-wide">👤 HUMAN DECISION GATE</h3>
            <span className="font-mono text-[10px] text-[#8E9BAE]">AI ANALYZES • HUMAN DECIDES</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#8E9BAE] hover:text-[#F5F3EE]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* System Risk Instrument Meter */}
      <RiskInstrument assessment={DEMO_RISK_ASSESSMENT} />

      {/* Guardrail Recommendations Checklist */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] text-[#F4C95D] font-bold uppercase tracking-wider">
          RECOMMENDED RELEASE GUARDRAILS ({recommendations.length})
        </span>
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-3 rounded-xl bg-[#0E1320] border border-[#F4C95D]/20 text-xs flex flex-col gap-1">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#F4C95D] font-bold">{rec.category}</span>
              <span className="text-[#FF6B5E] font-bold">{rec.priority} PRIORITY</span>
            </div>
            <span className="font-outfit font-bold text-[#F5F3EE]">{rec.title}</span>
            <p className="text-[#8E9BAE] text-[11px] font-outfit">{rec.rationale}</p>
          </div>
        ))}
      </div>

      {/* Human Decision Gate Actions */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-2 border-t border-white/10">
        <span className="font-mono text-[10px] text-[#F5F3EE] font-bold uppercase tracking-wider">
          RECORD AUTHORITATIVE HUMAN DECISION
        </span>

        <div className="grid grid-cols-3 gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setSelectedStatus('APPROVED')}
            className={`py-2.5 px-2 rounded-xl border font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
              selectedStatus === 'APPROVED'
                ? 'bg-[#35D6C5]/20 border-[#35D6C5] text-[#35D6C5] shadow-[0_0_15px_rgba(53,214,197,0.3)]'
                : 'bg-[#0E1320] border-white/10 text-[#8E9BAE]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>APPROVE</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('REVIEW_REQUIRED')}
            className={`py-2.5 px-2 rounded-xl border font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
              selectedStatus === 'REVIEW_REQUIRED'
                ? 'bg-[#F4C95D]/20 border-[#F4C95D] text-[#F4C95D] shadow-[0_0_15px_rgba(244,201,93,0.3)]'
                : 'bg-[#0E1320] border-white/10 text-[#8E9BAE]'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>REVIEW</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('HOLD')}
            className={`py-2.5 px-2 rounded-xl border font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
              selectedStatus === 'HOLD'
                ? 'bg-[#FF6B5E]/20 border-[#FF6B5E] text-[#FF6B5E] shadow-[0_0_15px_rgba(255,107,94,0.3)]'
                : 'bg-[#0E1320] border-white/10 text-[#8E9BAE]'
            }`}
          >
            <PauseCircle className="w-4 h-4" />
            <span>HOLD</span>
          </button>
        </div>

        <div className="flex flex-col gap-1 font-mono text-xs">
          <label className="text-[10px] text-[#8E9BAE]">DECISION REVIEWER TITLE / NAME</label>
          <input
            type="text"
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#0E1320] border border-white/10 text-[#F5F3EE] focus:border-[#F4C95D] outline-none font-outfit"
            required
          />
        </div>

        <div className="flex flex-col gap-1 font-mono text-xs">
          <label className="text-[10px] text-[#8E9BAE]">EXPLICIT DECISION RATIONALE</label>
          <textarea
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded-xl bg-[#0E1320] border border-white/10 text-[#F5F3EE] focus:border-[#F4C95D] outline-none font-outfit text-xs"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F4C95D] to-[#FF6B5E] text-[#080B12] font-outfit font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_20px_rgba(244,201,93,0.4)] flex items-center justify-center gap-2 mt-1 cursor-pointer"
        >
          <Lock className="w-4 h-4" />
          <span>SIGN & AUTHORIZE RELEASE</span>
        </button>
      </form>
    </div>
  );
};
