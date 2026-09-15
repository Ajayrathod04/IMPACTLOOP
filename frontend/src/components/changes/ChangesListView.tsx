import React, { useState } from "react";
import {
  Search,
  ArrowUpDown,
  GitPullRequest,
  Sparkles,
  User,
} from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Change } from "../../types";

export interface ChangesListViewProps {
  changes: Change[];
  onSelectChange: (change: Change) => void;
  onAnalyzeChange?: (changeId: string) => void;
  onNewAnalysisClick: () => void;
}

export const ChangesListView: React.FC<ChangesListViewProps> = ({
  changes,
  onSelectChange,
  onNewAnalysisClick,
}) => {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"updated" | "risk">("updated");

  const filteredChanges = changes
    .filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        (c.description &&
          c.description.toLowerCase().includes(search.toLowerCase())) ||
        c.category.toLowerCase().includes(search.toLowerCase());

      const matchesRisk = riskFilter === "all" || c.risk_level === riskFilter;
      const matchesCat =
        categoryFilter === "all" || c.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;

      return matchesSearch && matchesRisk && matchesCat && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "risk") {
        const order = { critical: 4, high: 3, medium: 2, low: 1 };
        return order[b.risk_level] - order[a.risk_level];
      }
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });

  return (
    <div className="space-y-6 select-none">
      {/* Header Console */}
      <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-950/80 text-amber-300 text-xs font-mono font-bold border border-amber-800/60 mb-2">
            <GitPullRequest className="w-3.5 h-3.5 text-amber-400" />
            OPERATIONAL DECISION REGISTRY
          </div>
          <h2 className="text-xl font-bold text-ivory-100 tracking-tight font-sans">
            Change Evaluations Registry ({changes.length})
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Operational registry of proposed product and engineering changes.
            Select any row to inspect decision intelligence.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Sparkles className="w-4 h-4" />}
          onClick={onNewAnalysisClick}
        >
          ANALYZE A CHANGE
        </Button>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-[#0b0e17] p-3 rounded-xl border border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search change proposals..."
            className="w-full bg-[#07090e] border border-slate-800 rounded pl-8 pr-3 py-1.5 text-xs text-ivory-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all font-mono"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#07090e] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer font-mono"
          >
            <option value="all">All Categories</option>
            <option value="Pricing & Packaging">Pricing & Packaging</option>
            <option value="API Infrastructure">API Infrastructure</option>
            <option value="Database Architecture">Database Architecture</option>
            <option value="Feature Flag & UX">Feature Flag & UX</option>
          </select>

          {/* Risk Level Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-[#07090e] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer font-mono"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical Risk</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#07090e] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer font-mono"
          >
            <option value="all">All Statuses</option>
            <option value="analyzing">Analyzing</option>
            <option value="approved">Approved</option>
            <option value="shipped">Shipped</option>
            <option value="observing">Observing</option>
            <option value="learned">Learned</option>
          </select>

          {/* Sort By Filter */}
          <button
            onClick={() => setSortBy(sortBy === "updated" ? "risk" : "updated")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#07090e] border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            Sort: {sortBy === "updated" ? "Recently Updated" : "Highest Risk"}
          </button>
        </div>
      </div>

      {/* Registry Table (Section 14 Columns: CHANGE | OWNER | RISK | AFFECTED SYSTEMS | CONFIDENCE | STATUS | UPDATED) */}
      <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-sans">
            <thead className="bg-[#07090e] text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">CHANGE</th>
                <th className="p-4">OWNER</th>
                <th className="p-4">RISK</th>
                <th className="p-4">AFFECTED SYSTEMS</th>
                <th className="p-4">CONFIDENCE</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right">UPDATED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {filteredChanges.length > 0 ? (
                filteredChanges.map((change) => (
                  <tr
                    key={change.id}
                    onClick={() => onSelectChange(change)}
                    className="hover:bg-slate-900/60 transition-colors cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="space-y-0.5 font-sans">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ivory-100">
                            {change.title}
                          </span>
                          {change.is_demo && <Badge type="demo" size="sm" />}
                        </div>
                        {change.description && (
                          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                            {change.description}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-slate-300">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-500" />
                        <span>{change.owner || "Product Growth"}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <Badge
                        type="risk"
                        riskLevel={change.risk_level}
                        size="sm"
                      />
                    </td>

                    <td className="p-4 text-slate-300">
                      {change.affected_area_count || 7} Systems
                    </td>

                    <td className="p-4 text-emerald-400 font-bold">
                      {change.analysis_result
                        ? `${Math.round(change.analysis_result.confidence_score * 100)}%`
                        : "78%"}
                    </td>

                    <td className="p-4">
                      <Badge type="status" status={change.status} size="sm" />
                    </td>

                    <td className="p-4 text-right text-slate-400 text-[11px]">
                      {new Date(change.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-slate-500 font-mono text-xs"
                  >
                    No matching changes found in registry.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
