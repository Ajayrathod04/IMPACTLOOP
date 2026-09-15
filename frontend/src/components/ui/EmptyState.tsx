import React from 'react';
import { Network, Sparkles, PlusCircle } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  onAnalyzeClick?: () => void;
  onDemoClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onAnalyzeClick,
  onDemoClick,
}) => {
  return (
    <div className="border border-dashed border-slate-800 rounded-2xl p-8 text-center bg-slate-900/30 backdrop-blur-sm relative overflow-hidden">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 flex items-center justify-center mb-4 shadow-lg shadow-indigo-950/50">
          <Network className="w-6 h-6" />
        </div>

        <h3 className="text-base font-semibold text-slate-100 mb-1">
          No active impact analyses in progress
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          Submit a proposed pricing change, API migration, or feature modification to map downstream consequences before deploying to production.
        </p>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            icon={<PlusCircle className="w-4 h-4" />}
            onClick={onAnalyzeClick}
          >
            Analyze a Change
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={<Sparkles className="w-4 h-4 text-indigo-400" />}
            onClick={onDemoClick}
          >
            Load Sample Change
          </Button>
        </div>
      </div>
    </div>
  );
};
