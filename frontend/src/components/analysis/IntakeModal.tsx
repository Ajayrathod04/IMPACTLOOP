import React, { useState } from 'react';
import { ProposedChange } from '../../types';
import { analyzeChange, createChange } from '../../services/api';
import { Sparkles, X, ArrowRight, Loader2, Target, User, Tag } from 'lucide-react';

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisStarted: (change: ProposedChange) => void;
}

export const IntakeModal: React.FC<IntakeModalProps> = ({
  isOpen,
  onClose,
  onAnalysisStarted
}) => {
  const [title, setTitle] = useState('Reduce Free Trial Duration');
  const [description, setDescription] = useState('Shorten free trial from 14 days to 7 days to accelerate customer decision cycles and improve sales touchpoints.');
  const [category, setCategory] = useState<'PRICING' | 'FEATURE_FLAG' | 'ONBOARDING' | 'INFRASTRUCTURE'>('ONBOARDING');
  const [currentState, setCurrentState] = useState('14-day free trial');
  const [proposedState, setProposedState] = useState('7-day free trial');
  const [targetMetric, setTargetMetric] = useState('Trial-to-Paid Conversion Rate');
  const [owner, setOwner] = useState('Product Growth Team');

  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setError(null);

    try {
      const newChange = await createChange({
        title,
        description,
        category,
        current_state: currentState,
        proposed_state: proposedState,
        target_metric: targetMetric,
        owner
      });

      await analyzeChange(newChange.id);
      onAnalysisStarted(newChange);
      onClose();
    } catch (err: any) {
      console.error('Failed to run impact analysis:', err);
      setError(err.message || 'Failed to connect to ImpactLoop engine.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0E1320] border border-[#8B7CFF]/30 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden text-[#F5F3EE]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F4C95D] via-[#FF6B5E] to-[#8B7CFF]" />

        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#F4C95D]" />
              <h2 className="font-mono text-base font-bold uppercase tracking-wider">
                Propose New Product Change
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              ImpactLoop will simulate downstream consequence networks and calculate risk exposure.
            </p>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-[#FF6B5E]/15 border border-[#FF6B5E] rounded-lg p-3 text-xs font-mono text-[#FF6B5E]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono">
          <div>
            <label className="block text-xs text-slate-400 mb-1 uppercase">Change Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#121829] border border-[#262838] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#F4C95D]"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1 uppercase">Change Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#121829] border border-[#262838] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#F4C95D] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1 uppercase flex items-center">
                <Tag className="w-3.5 h-3.5 mr-1" /> Category
              </label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full bg-[#121829] border border-[#262838] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#F4C95D]"
              >
                <option value="ONBOARDING">ONBOARDING</option>
                <option value="PRICING">PRICING</option>
                <option value="FEATURE_FLAG">FEATURE FLAG</option>
                <option value="INFRASTRUCTURE">INFRASTRUCTURE</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1 uppercase flex items-center">
                <User className="w-3.5 h-3.5 mr-1" /> Owner / Squad
              </label>
              <input
                type="text"
                required
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full bg-[#121829] border border-[#262838] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#F4C95D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1 uppercase">Current State</label>
              <input
                type="text"
                required
                value={currentState}
                onChange={(e) => setCurrentState(e.target.value)}
                className="w-full bg-[#121829] border border-[#262838] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#F4C95D]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1 uppercase">Proposed State</label>
              <input
                type="text"
                required
                value={proposedState}
                onChange={(e) => setProposedState(e.target.value)}
                className="w-full bg-[#121829] border border-[#262838] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#F4C95D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1 uppercase flex items-center">
              <Target className="w-3.5 h-3.5 mr-1" /> Target Metric
            </label>
            <input
              type="text"
              required
              value={targetMetric}
              onChange={(e) => setTargetMetric(e.target.value)}
              className="w-full bg-[#121829] border border-[#262838] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#F4C95D]"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-[#262838]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 border border-[#262838]"
            >
              CANCEL
            </button>

            <button
              type="submit"
              disabled={analyzing}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#F4C95D] to-[#FF6B5E] text-[#080B12] px-5 py-2 rounded-xl font-mono font-bold text-xs hover:scale-105 transition-all shadow-lg disabled:opacity-50"
            >
              {analyzing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>RUN IMPACT ANALYSIS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
