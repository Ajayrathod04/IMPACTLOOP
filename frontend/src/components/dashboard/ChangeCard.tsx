import React from 'react';
import {
  AlertTriangle,
  GitBranch,
  HelpCircle,
  CheckSquare,
  ArrowRight,
  TrendingDown,
  Layers,
  Clock,
  Sparkles,
  Target,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Change } from '../../types';

export interface ChangeCardProps {
  change: Change;
  onInspectClick?: (change: Change) => void;
  onAnalyzeClick?: (changeId: string) => void;
}

export const ChangeCard: React.FC<ChangeCardProps> = ({
  change,
  onInspectClick,
  onAnalyzeClick,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 transition-all card-hover-effect glow-warm backdrop-blur-md relative overflow-hidden shadow-xl">
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          {change.is_demo ? <Badge type="demo" /> : <Badge type="status" status={change.status} />}
          <Badge type="risk" riskLevel={change.risk_level} />
          <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
            {change.category}
          </span>
        </div>

        <span className="text-[11px] font-mono text-slate-500">ID: {change.id}</span>
      </div>

      {/* Title & Description */}
      <div className="mb-5 space-y-2">
        <h3 className="text-xl font-bold text-ivory-100 tracking-tight flex items-center gap-2">
          {change.title}
        </h3>
        {change.description && (
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">{change.description}</p>
        )}
        {change.intended_outcome && (
          <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono pt-1">
            <Target className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            Target Metric: <span className="text-ivory-100 font-semibold">{change.intended_outcome}</span>
          </p>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-rose-950/70 text-rose-400 border border-rose-800/50">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Risk Score</p>
            <p className="text-base font-black font-mono text-rose-400">
              {change.analysis_result ? `${change.analysis_result.risk_score}/100` : '82/100'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-950/70 text-amber-400 border border-amber-800/50">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Affected Systems</p>
            <p className="text-base font-black font-mono text-amber-300">{change.affected_area_count}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-orange-950/70 text-orange-400 border border-orange-800/50">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Unknowns</p>
            <p className="text-base font-black font-mono text-orange-400">{change.unknown_count}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-950/70 text-emerald-400 border border-emerald-800/50">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Guardrails</p>
            <p className="text-base font-black font-mono text-emerald-400">{change.recommended_action_count}</p>
          </div>
        </div>
      </div>

      {/* Downstream Systems Badges */}
      {change.affected_areas && change.affected_areas.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Downstream Systems Map Preview
            </span>
            <span className="text-[11px] font-mono text-slate-400">{change.affected_areas.length} Systems</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {change.affected_areas.map((area, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between"
              >
                <span className="text-xs font-semibold text-slate-200">{area}</span>
                <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer CTA Row */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 flex-wrap gap-2">
        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-500" />
          Engine Evaluated: {new Date(change.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>

        <div className="flex items-center gap-2">
          {onAnalyzeClick && (
            <Button
              variant="outline"
              size="sm"
              icon={<Sparkles className="w-3.5 h-3.5 text-amber-400" />}
              onClick={() => onAnalyzeClick(change.id)}
            >
              Re-Analyze
            </Button>
          )}

          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onInspectClick?.(change)}
          >
            Inspect Consequence Canvas
          </Button>
        </div>
      </div>
    </div>
  );
};
