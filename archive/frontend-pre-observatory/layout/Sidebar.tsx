import React from "react";
import {
  Activity,
  GitPullRequest,
  Sliders,
  CheckCircle2,
  Brain,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "../../lib/utils";

export interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  apiConnected?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  apiConnected = true,
}) => {
  const navItems = [
    { id: "overview", label: "Decision Room", icon: Activity },
    { id: "changes", label: "Changes", icon: GitPullRequest },
    { id: "scenarios", label: "Scenarios", icon: Sliders },
    { id: "outcomes", label: "Outcomes", icon: CheckCircle2 },
    { id: "org_memory", label: "Org Memory", icon: Brain },
  ];

  return (
    <aside className="w-16 md:w-60 bg-[#07090e] border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none py-4">
      <div className="space-y-6">
        {/* Brand & Subtitle */}
        <div className="px-4 hidden md:block">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 border border-amber-400">
              <Zap className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
            </div>
            <span className="font-extrabold text-ivory-100 tracking-tight text-sm font-sans">
              ImpactLoop
            </span>
          </div>
          <p className="text-[10px] font-mono text-amber-400/90 uppercase tracking-widest mt-1 font-semibold">
            Change Intelligence
          </p>
        </div>

        {/* Navigation Rail */}
        <nav className="space-y-1">
          <div className="px-4 pb-2 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider hidden md:block">
            Workspace
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                title={item.label}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 text-xs font-mono transition-all cursor-pointer group",
                  isActive
                    ? "border-l-2 border-amber-400 bg-amber-950/30 text-amber-300 font-semibold"
                    : "border-l-2 border-transparent text-slate-400 hover:text-ivory-100 hover:bg-slate-900/40",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive
                        ? "text-amber-400"
                        : "text-slate-500 group-hover:text-slate-300",
                    )}
                  />
                  <span className="hidden md:inline tracking-tight">
                    {item.label}
                  </span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-signal hidden md:inline-block" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Spec & Settings */}
      <div className="space-y-3 px-3">
        {/* Settings button */}
        <button
          onClick={() => onTabChange("settings")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-mono transition-colors cursor-pointer",
            activeTab === "settings"
              ? "text-amber-300 bg-slate-900 border border-slate-800"
              : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/30",
          )}
        >
          <Settings className="w-4 h-4 text-slate-500" />
          <span className="hidden md:inline">Settings</span>
        </button>

        <div className="h-[1px] bg-slate-800/80" />

        {/* Engine Status Block */}
        <div className="p-2.5 rounded bg-[#0d111a] border border-slate-800/90 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              ENGINE STATUS
            </span>
            <span
              className={`w-2 h-2 rounded-full ${apiConnected ? "bg-emerald-400 animate-pulse" : "bg-rose-500"}`}
            />
          </div>
          <p className="text-[10px] font-mono text-slate-400 mt-1">
            ● LOCAL ENGINE
          </p>
          <p className="text-[9px] font-mono text-slate-500 leading-tight">
            Deterministic analysis
          </p>
          <div className="mt-1.5 text-[10px] font-mono">
            <span
              className={
                apiConnected
                  ? "text-emerald-400 font-bold"
                  : "text-rose-400 font-bold"
              }
            >
              API {apiConnected ? "ONLINE (HTTP 200)" : "OFFLINE"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
