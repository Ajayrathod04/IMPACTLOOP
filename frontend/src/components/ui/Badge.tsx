import React from "react";
import { cn } from "../../lib/utils";
import { RiskLevel, ChangeStatus } from "../../types";

export interface BadgeProps {
  type?: "risk" | "status" | "demo" | "default";
  riskLevel?: RiskLevel;
  status?: ChangeStatus;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  type = "default",
  riskLevel,
  status,
  children,
  className,
  size = "md",
}) => {
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  if (type === "demo") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider rounded px-2 py-0.5 bg-amber-950/80 text-amber-300 border border-amber-800/60 shadow-sm",
          className,
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Demo Scenario
      </span>
    );
  }

  if (type === "risk" && riskLevel) {
    const riskStyles = {
      low: "bg-emerald-950/70 text-emerald-400 border-emerald-800/50",
      medium: "bg-amber-950/70 text-amber-300 border-amber-800/50",
      high: "bg-rose-950/70 text-rose-400 border-rose-800/50",
      critical:
        "bg-purple-950/70 text-purple-300 border-purple-800/50 animate-pulse",
    };

    const riskLabels = {
      low: "Low Risk",
      medium: "Medium Risk",
      high: "High Risk",
      critical: "Critical Risk",
    };

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wide uppercase rounded-md border",
          sizeClasses,
          riskStyles[riskLevel],
          className,
        )}
      >
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            riskLevel === "low" && "bg-emerald-400",
            riskLevel === "medium" && "bg-amber-400",
            riskLevel === "high" && "bg-rose-400",
            riskLevel === "critical" && "bg-purple-400",
          )}
        />
        {riskLabels[riskLevel]}
      </span>
    );
  }

  if (type === "status" && status) {
    const statusStyles = {
      draft: "bg-slate-900 text-slate-300 border-slate-750",
      analyzing: "bg-amber-950/70 text-amber-300 border-amber-800/50",
      approved: "bg-emerald-950/70 text-emerald-300 border-emerald-800/50",
      shipped: "bg-slate-800 text-ivory-100 border-slate-700",
      observing: "bg-amber-950/70 text-amber-300 border-amber-800/50",
      learned: "bg-slate-800 text-amber-300 border-slate-700",
    };

    const statusLabels = {
      draft: "Draft",
      analyzing: "Analyzing",
      approved: "Decision Approved",
      shipped: "Shipped",
      observing: "Observing",
      learned: "Learned",
    };

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wide uppercase rounded-md border",
          sizeClasses,
          statusStyles[status],
          className,
        )}
      >
        {statusLabels[status]}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full bg-slate-900 text-slate-300 border border-slate-800",
        sizeClasses,
        className,
      )}
    >
      {children}
    </span>
  );
};
