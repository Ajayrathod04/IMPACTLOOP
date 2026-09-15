import React, { useState } from "react";
import {
  X,
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/Button";
import { CreateChangePayload } from "../../types";

export interface AnalyzeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateChangePayload) => Promise<void>;
}

export const AnalyzeModal: React.FC<AnalyzeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1);
  const [title, setTitle] = useState(
    "Change free trial from 14 days to 7 days",
  );
  const [category, setCategory] = useState("Pricing & Packaging");
  const [currentState, setCurrentState] = useState(
    "14-day full self-serve trial",
  );
  const [proposedState, setProposedState] = useState("7-day accelerated trial");
  const [targetMetric, setTargetMetric] = useState("Activation Rate");
  const [affectedSystemsInput, setAffectedSystemsInput] = useState(
    "Signup Conversion, Onboarding, Activation, Support Load, Revenue",
  );
  const [description, setDescription] = useState(
    "Shorten self-serve trial period to accelerate high-intent user conversion, increase sales team outreach velocity, and optimize pipeline throughput.",
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressStep, setProgressStep] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setProgressStep(1); // Reading change context

    try {
      await new Promise((r) => setTimeout(r, 400));
      setProgressStep(2); // Mapping dependencies

      await new Promise((r) => setTimeout(r, 400));
      setProgressStep(3); // Tracing downstream effects

      await new Promise((r) => setTimeout(r, 400));
      setProgressStep(4); // Surfacing uncertainty

      await onSubmit({
        title: title.trim(),
        category,
        description: description.trim() || undefined,
        intended_outcome: targetMetric.trim() || undefined,
        current_state: currentState.trim() || undefined,
        proposed_state: proposedState.trim() || undefined,
      });

      setProgressStep(5); // Preparing guardrails
      await new Promise((r) => setTimeout(r, 300));
      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
      setProgressStep(0);
      setFormStep(1);
    }
  };

  const progressMessages = [
    "Reading change context & target parameters",
    "Mapping downstream system dependencies",
    "Tracing multi-hop consequence propagation",
    "Surfacing unverified assumptions & uncertainties",
    "Preparing actionable guardrail recommendations",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#07090e]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0e17] border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden select-none">
        {/* Top Accent Light Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500" />

        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title & Step Indicator */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-amber-500/20">
            <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
          </div>
          <div>
            <h3 className="text-base font-bold text-ivory-100 font-sans tracking-tight">
              NEW IMPACT ANALYSIS INTAKE
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Deterministic evaluation engine • Local Analysis
            </p>
          </div>
        </div>

        {/* Staged Intake Step Indicator */}
        {!isSubmitting && (
          <div className="grid grid-cols-3 gap-2 mb-5 font-mono text-[10px]">
            <div
              className={`p-2 rounded text-center border ${formStep === 1 ? "bg-amber-950/80 border-amber-500 text-amber-300 font-bold" : "bg-[#07090e] border-slate-800 text-slate-500"}`}
            >
              STEP 01: DEFINE CHANGE
            </div>
            <div
              className={`p-2 rounded text-center border ${formStep === 2 ? "bg-amber-950/80 border-amber-500 text-amber-300 font-bold" : "bg-[#07090e] border-slate-800 text-slate-500"}`}
            >
              STEP 02: MAP CONTEXT
            </div>
            <div
              className={`p-2 rounded text-center border ${formStep === 3 ? "bg-amber-950/80 border-amber-500 text-amber-300 font-bold" : "bg-[#07090e] border-slate-800 text-slate-500"}`}
            >
              STEP 03: RUN ANALYSIS
            </div>
          </div>
        )}

        {isSubmitting ? (
          <div className="py-8 px-4 text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-400 flex items-center justify-center mx-auto animate-spin">
              <Loader2 className="w-6 h-6 text-amber-400" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-ivory-100 font-sans">
                Running Local Impact Engine
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                Evaluating system graph dependencies
              </p>
            </div>

            {/* Progress Sequence */}
            <div className="bg-[#07090e] border border-slate-800 rounded-lg p-4 space-y-2 text-left text-xs font-mono">
              {progressMessages.map((msg, idx) => {
                const stepNum = idx + 1;
                const isDone = progressStep > stepNum;
                const isCurrent = progressStep === stepNum;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-slate-300"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-800 shrink-0" />
                    )}
                    <span
                      className={
                        isCurrent
                          ? "text-amber-300 font-bold"
                          : isDone
                            ? "text-slate-400"
                            : "text-slate-600"
                      }
                    >
                      {msg}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            {formStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                    PROPOSED CHANGE STATEMENT{" "}
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Change free trial from 14 days to 7 days"
                    className="w-full bg-[#07090e] border border-slate-800 rounded px-3 py-2 text-xs text-ivory-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                      CATEGORY
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#07090e] border border-slate-800 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-amber-500 font-mono cursor-pointer"
                    >
                      <option value="Pricing & Packaging">
                        Pricing & Packaging
                      </option>
                      <option value="API Infrastructure">
                        API Infrastructure
                      </option>
                      <option value="Database Architecture">
                        Database Architecture
                      </option>
                      <option value="Feature Flag & UX">
                        Feature Flag & UX
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                      TARGET METRIC
                    </label>
                    <input
                      type="text"
                      value={targetMetric}
                      onChange={(e) => setTargetMetric(e.target.value)}
                      placeholder="e.g. Activation Rate"
                      className="w-full bg-[#07090e] border border-slate-800 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    onClick={() => setFormStep(2)}
                  >
                    NEXT: MAP CONTEXT
                  </Button>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 bg-[#07090e] p-3 rounded border border-slate-800/80 font-mono">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1">
                      CURRENT BASELINE STATE
                    </label>
                    <input
                      type="text"
                      value={currentState}
                      onChange={(e) => setCurrentState(e.target.value)}
                      className="w-full bg-[#0b0e17] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-amber-400 uppercase mb-1">
                      PROPOSED TARGET STATE
                    </label>
                    <input
                      type="text"
                      value={proposedState}
                      onChange={(e) => setProposedState(e.target.value)}
                      className="w-full bg-[#0b0e17] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                    AFFECTED SYSTEMS & DOMAINS
                  </label>
                  <input
                    type="text"
                    value={affectedSystemsInput}
                    onChange={(e) => setAffectedSystemsInput(e.target.value)}
                    placeholder="e.g. Signup, Billing, Onboarding, Support"
                    className="w-full bg-[#07090e] border border-slate-800 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setFormStep(1)}
                  >
                    BACK
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    onClick={() => setFormStep(3)}
                  >
                    NEXT: REVIEW & SUBMIT
                  </Button>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                    DESCRIPTION & CONTEXT RATIONALE
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#07090e] border border-slate-800 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-amber-500 font-sans resize-none"
                  />
                </div>

                <div className="p-3 rounded bg-amber-950/30 border border-amber-800/40 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-200/90 leading-relaxed font-sans">
                    Local Analysis Engine: Submitting evaluates system graph
                    dependencies, calculates risk scores, and generates
                    actionable guardrails deterministically.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setFormStep(2)}
                  >
                    BACK
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Sparkles className="w-4 h-4" />}
                    onClick={handleSubmit}
                  >
                    RUN IMPACT ANALYSIS
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
