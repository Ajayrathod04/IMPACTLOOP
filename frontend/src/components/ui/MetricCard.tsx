import React from 'react';
import { cn } from '../../lib/utils';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    positive?: boolean;
  };
  highlightColor?: 'red' | 'amber' | 'orange' | 'emerald' | 'slate';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  highlightColor = 'amber',
  className,
}) => {
  const borderAccents = {
    red: 'hover:border-rose-500/40',
    amber: 'hover:border-amber-500/40',
    orange: 'hover:border-orange-500/40',
    emerald: 'hover:border-emerald-500/40',
    slate: 'hover:border-slate-700',
  };

  const textAccents = {
    red: 'text-rose-400',
    amber: 'text-amber-400',
    orange: 'text-orange-400',
    emerald: 'text-emerald-400',
    slate: 'text-ivory-100',
  };

  return (
    <div
      className={cn(
        'bg-slate-900/80 border border-slate-800 rounded-2xl p-4 transition-all card-hover-effect relative overflow-hidden backdrop-blur-sm shadow-md',
        borderAccents[highlightColor],
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className="p-1.5 rounded-lg bg-slate-950 text-slate-400 border border-slate-800">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className={cn('text-2xl font-black font-mono tracking-tight', textAccents[highlightColor])}>
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              'text-xs font-medium font-mono',
              trend.positive ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400 line-clamp-1">{subtitle}</p>
      )}
    </div>
  );
};
