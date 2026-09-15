import React, { useState } from "react";
import { Brain, Search, ShieldCheck, Sparkles, Database } from "lucide-react";
import { Button } from "../ui/Button";

export const OrgMemoryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const memoryItems = [
    {
      id: "MEM-001",
      title: "Trial Length Sensitivity on Activation Latency",
      type: "VALIDATED ASSUMPTION",
      category: "Pricing & Packaging",
      date: "Aug 2026",
      source: "Mixpanel Cohort Telemetry (3 Experiments)",
      confidence: "94%",
      evidence_count: 3,
      key_finding:
        "Trial length strongly affects activation latency. Reducing duration from 14 to 7 days drops signup conversion by 5.2% unless paired with Day-3 email drips.",
      reusable_rule:
        "Trial duration changes historically affected activation more than top-of-funnel acquisition.",
      relevance: "High Impact",
    },
    {
      id: "MEM-002",
      title: "Stripe Billing Dependency on Pricing Changes",
      type: "KNOWN DEPENDENCY",
      category: "Billing & Infrastructure",
      date: "Jul 2026",
      source: "Stripe Webhook Event Bus Audit",
      confidence: "98%",
      evidence_count: 5,
      key_finding:
        "Billing dependency must be checked before pricing tier changes to prevent silent webhook failures.",
      reusable_rule:
        "Billing dependency must be checked before pricing changes.",
      relevance: "Critical Standard",
    },
    {
      id: "MEM-003",
      title: "Lifecycle Email Dependency Chain",
      type: "LESSONS LEARNED",
      category: "Customer Success",
      date: "Jun 2026",
      source: "Customer Success Ticket Review",
      confidence: "91%",
      evidence_count: 4,
      key_finding:
        "Lifecycle email sequence depends directly on trial-state event triggers.",
      reusable_rule:
        "Activation impact appears before revenue impact in customer support telemetry.",
      relevance: "Operational",
    },
    {
      id: "MEM-004",
      title: "2026 Pricing Experiment Telemetry",
      type: "PAST OUTCOME",
      category: "Revenue Operations",
      date: "May 2026",
      source: "Stripe Billing Telemetry",
      confidence: "96%",
      evidence_count: 2,
      key_finding:
        "Pricing experiment increased support volume by 18% during initial 14-day transition period.",
      reusable_rule: "Pricing experiment increased support volume.",
      relevance: "High Impact",
    },
    {
      id: "MEM-005",
      title: "HTTP Sunset Header 30-Day Window",
      type: "GUARDRAIL",
      category: "Developer Platform",
      date: "Apr 2026",
      source: "DevRel Incident Log",
      confidence: "99%",
      evidence_count: 6,
      key_finding:
        "Publishing HTTP Sunset headers 30 days prior prevents 75% of partner integration failures.",
      reusable_rule:
        "Mandate 30-day HTTP Sunset header window for breaking REST API updates.",
      relevance: "Critical Standard",
    },
  ];

  const filteredItems = memoryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.key_finding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reusable_rule.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-950/80 text-amber-300 text-xs font-mono font-bold border border-amber-800/60 mb-2">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            INSTITUTIONAL INTELLIGENCE VAULT
          </div>
          <h2 className="text-xl font-bold text-ivory-100 tracking-tight font-sans">
            Organization Memory & System Rules
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Search organizational rules, historical outcomes, known
            dependencies, and validated guardrails.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Sparkles className="w-4 h-4" />}
        >
          NEW RULE ENTRY
        </Button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0b0e17] p-3 rounded-xl border border-slate-800/90 font-mono text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rules, dependencies, evidence..."
            className="w-full bg-[#07090e] border border-slate-800 rounded pl-8 pr-3 py-1.5 text-xs text-ivory-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all font-mono"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {[
            "all",
            "VALIDATED ASSUMPTION",
            "KNOWN DEPENDENCY",
            "PAST OUTCOME",
            "LESSONS LEARNED",
            "GUARDRAIL",
          ].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded text-xs font-mono font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedType === type
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "bg-[#07090e] text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {type === "all" ? "All Rules" : type}
            </button>
          ))}
        </div>
      </div>

      {/* Institutional Memory Vault Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-5 space-y-3 hover:border-amber-500/50 transition-all shadow-xl"
          >
            <div className="flex items-center justify-between gap-2 font-mono">
              <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800/60 uppercase">
                {item.type}
              </span>
              <span className="text-xs text-slate-500">{item.date}</span>
            </div>

            <h3 className="text-base font-bold text-ivory-100 font-sans">
              {item.title}
            </h3>

            <div className="space-y-2 text-xs">
              <div className="bg-[#07090e] p-3 rounded border border-slate-800/90 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center justify-between">
                  <span>Empirical Finding</span>
                  <span className="text-emerald-400">
                    {item.confidence} Confidence
                  </span>
                </span>
                <p className="text-slate-300 leading-snug font-sans">
                  {item.key_finding}
                </p>
              </div>

              <div className="bg-emerald-950/20 p-3 rounded border border-emerald-900/40 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Reusable Guardrail
                  Rule
                </span>
                <p className="text-emerald-200 leading-snug font-sans font-medium">
                  {item.reusable_rule}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3 text-slate-500" />
                Evidence Base:{" "}
                <strong className="text-slate-200">
                  {item.evidence_count} Cohorts
                </strong>
              </span>
              <span className="text-amber-400 font-bold">{item.relevance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
