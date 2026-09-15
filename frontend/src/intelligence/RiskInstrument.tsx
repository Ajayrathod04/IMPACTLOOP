import React from 'react';
import { RiskAssessment } from '../types';

interface RiskInstrumentProps {
  assessment: RiskAssessment;
}

export const RiskInstrument: React.FC<RiskInstrumentProps> = ({ assessment }) => {
  const { overall_risk_score, risk_level, risk_factors } = assessment;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
      case 'high':
        return '#FF6B5E';
      case 'medium':
        return '#F4C95D';
      default:
        return '#35D6C5';
    }
  };

  const color = getRiskColor(risk_level);
  const strokeDashoffset = 283 - (283 * overall_risk_score) / 100;

  return (
    <div className="p-4 rounded-2xl bg-[#0E1320] border border-[#8B7CFF]/20 backdrop-blur-md flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-[#8E9BAE] uppercase tracking-wider">SYSTEM RISK INSTRUMENT</span>
        <span 
          className="font-mono text-xs font-bold px-2 py-0.5 rounded border uppercase"
          style={{ backgroundColor: `${color}15`, color, borderColor: `${color}44` }}
        >
          {risk_level} RISK
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Radial Risk Gauge */}
        <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#131826"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke={color}
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-display text-2xl text-[#F5F3EE]">{overall_risk_score}</span>
            <span className="font-mono text-[9px] text-[#8E9BAE]">/100</span>
          </div>
        </div>

        {/* Breakdown Factors */}
        <div className="flex-1 flex flex-col gap-2 font-mono text-xs">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-[#F5F3EE]">
              <span>DOWNSTREAM BREADTH</span>
              <span>{Math.round(risk_factors.breadth * 100)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#131826] overflow-hidden">
              <div className="h-full bg-[#FF6B5E]" style={{ width: `${risk_factors.breadth * 100}%` }} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-[#F5F3EE]">
              <span>SEVERITY INDEX</span>
              <span>{Math.round(risk_factors.severity * 100)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#131826] overflow-hidden">
              <div className="h-full bg-[#F4C95D]" style={{ width: `${risk_factors.severity * 100}%` }} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-[#F5F3EE]">
              <span>UNCERTAINTY</span>
              <span>{Math.round(risk_factors.uncertainty * 100)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#131826] overflow-hidden">
              <div className="h-full bg-[#8B7CFF]" style={{ width: `${risk_factors.uncertainty * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
