import React, { useState } from 'react';
import { HumanDecision, GuardrailRecommendation, ExplicitUnknown } from '../types';
import { submitDecision } from '../services/api';
import { ShieldCheck, X, CheckCircle2, AlertTriangle, PauseCircle, ArrowRight, Loader2 } from 'lucide-react';

interface DecisionPanelProps {
  changeId: string;
  currentDecision?: HumanDecision | null;
  recommendations: GuardrailRecommendation[];
  unknowns?: ExplicitUnknown[];
  onDecisionSubmitted: (decision: HumanDecision) => void;
  onClose: () => void;
}

export const DecisionPanel: React.FC<DecisionPanelProps> = ({
  changeId,
  currentDecision,
  recommendations,
  unknowns,
  onDecisionSubmitted,
  onClose
}) => {
  const [selectedStatus, setSelectedStatus] = useState<'APPROVED' | 'REVIEW_REQUIRED' | 'HOLD'>(
    currentDecision?.status || 'REVIEW_REQUIRED'
  );
  const [reviewer, setReviewer] = useState(currentDecision?.reviewer || 'Lead Product Architect');
  const [rationale, setRationale] = useState(
    currentDecision?.rationale || 'Conditional approval pending trial reduction guardrail implementation in onboarding flows.'
  );
  const [selectedGuardrails, setSelectedGuardrails] = useState<string[]>(
    currentDecision?.acknowledged_guardrails || recommendations.map(r => r.title)
  );
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(!!currentDecision);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const decisionData = {
        status: selectedStatus,
        reviewer,
        rationale,
        acknowledged_guardrails: selectedGuardrails,
        timestamp: new Date().toISOString()
      };
      const result = await submitDecision(changeId, decisionData);
      setSubmittedSuccess(true);
      onDecisionSubmitted(result.decision);
    } catch (err) {
      console.error('Failed to submit decision:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed right-4 top-24 bottom-24 z-50 w-full max-w-xl bg-[#0E1320]/95 border border-[#FF6B5E]/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-[#121829] pb-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#FF6B5E]" />
            <h3 className="font-mono text-base font-bold text-[#F5F3EE] uppercase tracking-wider">
              Human Decision Gate
            </h3>
            {unknowns && unknowns.length > 0 && (
              <span className="text-[10px] font-mono text-[#F4C95D] font-bold bg-[#F4C95D]/10 px-2 py-0.5 rounded border border-[#F4C95D]/30">
                {unknowns.length} UNKNOWNS
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Decision Selector Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setSelectedStatus('APPROVED')}
            className={`flex flex-col items-center p-3 rounded-xl border transition-all text-left font-mono ${
              selectedStatus === 'APPROVED'
                ? 'bg-[#35D6C5]/15 border-[#35D6C5] text-[#35D6C5] font-bold'
                : 'bg-[#121829] border-[#262838] text-slate-400 hover:border-slate-600'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 mb-1" />
            <span className="text-xs uppercase font-bold">APPROVE</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Proceed to ship</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('REVIEW_REQUIRED')}
            className={`flex flex-col items-center p-3 rounded-xl border transition-all text-left font-mono ${
              selectedStatus === 'REVIEW_REQUIRED'
                ? 'bg-[#F4C95D]/15 border-[#F4C95D] text-[#F4C95D] font-bold'
                : 'bg-[#121829] border-[#262838] text-slate-400 hover:border-slate-600'
            }`}
          >
            <AlertTriangle className="w-5 h-5 mb-1" />
            <span className="text-xs uppercase font-bold">REVIEW</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Requires mitigation</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('HOLD')}
            className={`flex flex-col items-center p-3 rounded-xl border transition-all text-left font-mono ${
              selectedStatus === 'HOLD'
                ? 'bg-[#FF6B5E]/15 border-[#FF6B5E] text-[#FF6B5E] font-bold'
                : 'bg-[#121829] border-[#262838] text-slate-400 hover:border-slate-600'
            }`}
          >
            <PauseCircle className="w-5 h-5 mb-1" />
            <span className="text-xs uppercase font-bold">HOLD</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Block deployment</span>
          </button>
        </div>

        {/* Rationale & Reviewer Input */}
        <div className="space-y-3 font-mono">
          <div>
            <label className="block text-xs text-slate-400 mb-1 uppercase">Decision Rationale</label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              rows={3}
              className="w-full bg-[#121829] border border-[#262838] rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-[#FF6B5E] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1 uppercase">Reviewer / Operator</label>
            <input
              type="text"
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
              className="w-full bg-[#121829] border border-[#262838] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#FF6B5E]"
            />
          </div>
        </div>

        {/* Guardrail Checklist */}
        {recommendations.length > 0 && (
          <div className="bg-[#121829] border border-[#262838] rounded-xl p-4 space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold block">
              Acknowledged Guardrails ({selectedGuardrails.length}/{recommendations.length})
            </span>
            {recommendations.map((rec) => (
              <label key={rec.id || rec.title} className="flex items-start space-x-2.5 cursor-pointer text-xs group">
                <input
                  type="checkbox"
                  checked={selectedGuardrails.includes(rec.title)}
                  onChange={() => {
                    if (selectedGuardrails.includes(rec.title)) {
                      setSelectedGuardrails(selectedGuardrails.filter(t => t !== rec.title));
                    } else {
                      setSelectedGuardrails([...selectedGuardrails, rec.title]);
                    }
                  }}
                  className="mt-0.5 rounded border-[#262838] bg-[#080B12] text-[#F4C95D] focus:ring-0"
                />
                <span className="text-slate-200 font-medium">{rec.title}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-[#121829] flex items-center justify-between">
        {submittedSuccess ? (
          <span className="text-xs font-mono text-[#35D6C5] flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Decision recorded in audit log.</span>
          </span>
        ) : (
          <span className="text-xs font-mono text-slate-500">Human override is logged with provenance.</span>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center space-x-2 bg-gradient-to-r from-[#F4C95D] to-[#FF6B5E] text-[#080B12] px-5 py-2.5 rounded-xl text-xs font-mono font-bold hover:scale-105 transition-all shadow-lg disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>RECORD DECISION</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
