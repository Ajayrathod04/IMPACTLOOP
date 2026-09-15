import React from 'react';
import { User, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Change } from '../../types';

export interface ChangeInvestigationHeaderProps {
  change: Change;
  onInspectClick?: () => void;
}

export const ChangeInvestigationHeader: React.FC<ChangeInvestigationHeaderProps> = ({
  change,
}) => {
  const analysis = change.analysis_result;
  const riskScore = analysis?.risk_score || 82;
  const confidence = analysis ? Math.round(analysis.confidence_score * 100) : 78;

  return (
    <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-4 shadow-xl select-none space-y-4">
      {/* Top Metadata Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          {change.is_demo ? <Badge type="demo" /> : <Badge type="status" status={change.status} />}
          <Badge type="risk" riskLevel={change.risk_level} />
          <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/50">
            {change.category}
          </span>
          <span className="text-xs font-mono text-slate-400">ID: {change.id}</span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-500" />
            Owner: <strong className="text-ivory-100 font-normal">{change.owner || 'Product Growth'}</strong>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Target: <strong className="text-amber-300 font-normal">Activation Rate</strong>
          </span>
        </div>
      </div>

      {/* Main Title & Horizontal Risk Signal Scale */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        <div className="space-y-1 max-w-xl">
          <h2 className="text-xl font-extrabold text-ivory-100 tracking-tight font-sans">
            {change.title}
          </h2>
          {change.description && (
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{change.description}</p>
          )}
        </div>

        {/* Section 9: Risk Exposure Scale & Information Dense Telemetry */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-[#07090e] p-3 rounded-lg border border-slate-800/90 font-mono shrink-0">
          {/* Risk Signal Scale */}
          <div className="space-y-1.5 px-2 sm:border-r border-slate-800/90 pr-4">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400">
              <span className="flex items-center gap-1 text-rose-400">
                <AlertTriangle className="w-3 h-3" />
                RISK EXPOSURE
              </span>
              <span className="text-rose-400 font-mono text-xs">{riskScore}/100 HIGH</span>
            </div>
            
            {/* Visual Signal Bar */}
            <div className="w-48 sm:w-56 h-2 bg-slate-900 rounded-full relative overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 w-full" />
              {/* Marker pin */}
              <div 
                className="absolute top-0 w-1.5 h-full bg-ivory-100 shadow-md transform -translate-x-1/2"
                style={{ left: `${riskScore}%` }}
              />
            </div>
            <div className="flex justify-between text-[8px] font-mono text-slate-500 uppercase tracking-tight">
              <span>LOW</span>
              <span>MODERATE</span>
              <span className="text-amber-400 font-bold">HIGH</span>
              <span>CRITICAL</span>
            </div>
          </div>

          {/* Compact Telemetry Counters */}
          <div className="grid grid-cols-4 gap-3 text-center text-xs font-mono">
            <div className="px-1">
              <span className="text-[9px] text-slate-500 block uppercase">Confidence</span>
              <span className="text-sm font-bold text-emerald-400">{confidence}%</span>
            </div>
            <div className="px-1">
              <span className="text-[9px] text-slate-500 block uppercase">Unknowns</span>
              <span className="text-sm font-bold text-amber-400">{change.unknown_count || 3}</span>
            </div>
            <div className="px-1">
              <span className="text-[9px] text-slate-500 block uppercase">Systems</span>
              <span className="text-sm font-bold text-slate-200">{change.affected_area_count || 7}</span>
            </div>
            <div className="px-1">
              <span className="text-[9px] text-slate-500 block uppercase">Guardrails</span>
              <span className="text-sm font-bold text-emerald-400">{change.recommended_action_count || 4}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
