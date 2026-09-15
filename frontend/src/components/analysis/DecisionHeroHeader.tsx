import React from "react";
import { Sparkles, Play } from "lucide-react";
import { Button } from "../ui/Button";

export interface DecisionHeroHeaderProps {
  onAnalyzeClick: () => void;
  onExploreDemoClick: () => void;
}

export const DecisionHeroHeader: React.FC<DecisionHeroHeaderProps> = ({
  onAnalyzeClick,
  onExploreDemoClick,
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800/90 bg-[#0b0e17] p-6 md:p-8 bg-tech-grid shadow-2xl">
      {/* Subtle radial light ambient background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-4">
        {/* Micro Category Tag */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-signal" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400">
            CHANGE INTELLIGENCE • DECISION ROOM
          </span>
        </div>

        {/* Editorial Headline */}
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-ivory-100 font-sans leading-tight">
          &ldquo;Understand what your next change{" "}
          <br className="hidden sm:inline" />
          <span className="text-amber-400 font-mono">could break</span> before
          it does.&rdquo;
        </h1>

        {/* Explanatory Context */}
        <p className="text-xs md:text-sm text-slate-300 max-w-2xl font-sans leading-relaxed">
          ImpactLoop traces downstream consequences across your product,
          surfaces uncertainty before rollout, and learns from what actually
          happened.
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            variant="primary"
            size="md"
            icon={<Sparkles className="w-4 h-4" />}
            onClick={onAnalyzeClick}
          >
            ANALYZE CHANGE
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={<Play className="w-4 h-4 text-amber-400" />}
            onClick={onExploreDemoClick}
          >
            EXPLORE LIVE EXAMPLE
          </Button>
        </div>
      </div>

      {/* Decorative Technical Dependency Lines */}
      <div className="absolute right-6 bottom-6 hidden lg:flex items-center gap-3 opacity-30 select-none pointer-events-none">
        <div className="text-[10px] font-mono text-slate-400 space-y-1 text-right">
          <div>CHANGE INTAKE → ACTIVE</div>
          <div>RISK TRACE: 82/100</div>
          <div>SYSTEM HOPS: 4</div>
        </div>
        <div className="w-12 h-[1px] bg-amber-400/60" />
        <div className="w-3 h-3 rounded-full border border-amber-400 bg-amber-500/20" />
      </div>
    </div>
  );
};
