import React, { useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ImpactNode, NodeTypeCategory } from "../../types";
import { HelpCircle, ShieldAlert } from "lucide-react";

export interface ImpactNetworkGraphProps {
  changeTitle: string;
  onNodeSelect: (node: ImpactNode) => void;
  selectedNodeId?: string;
  activeScenarioId?: string;
}

export const ImpactNetworkGraph: React.FC<ImpactNetworkGraphProps> = ({
  changeTitle,
  onNodeSelect,
  selectedNodeId,
  activeScenarioId = "expected",
}) => {
  const [filterMode, setFilterMode] = useState<
    "all" | "risk_only" | "unknowns_only"
  >("all");

  // Scenario impact weight modifiers
  const scenarioMultiplier =
    activeScenarioId === "adverse"
      ? 1.3
      : activeScenarioId === "conservative"
        ? 0.7
        : 1.0;

  const rawNodes: Node[] = useMemo(
    () => [
      {
        id: "root-change",
        data: {
          label: `🎯 CHANGE: ${changeTitle}`,
          category: "known" as NodeTypeCategory,
          details: "Root change proposal under active evaluation.",
        },
        position: { x: 50, y: 180 },
        sourcePosition: Position.Right,
        style: {
          background: "#241a08",
          color: "#fef3c7",
          border: "2px solid #f59e0b",
          borderRadius: "12px",
          padding: "12px 18px",
          fontWeight: 800,
          fontSize: "13px",
          boxShadow: "0 0 25px rgba(245, 158, 11, 0.25)",
        },
      },
      // Primary Flow Nodes
      {
        id: "node-conversion",
        data: {
          label: "📉 1. Signup Conversion Rate",
          category: "high_risk" as NodeTypeCategory,
          details: "Top-of-funnel trial signup velocity.",
        },
        position: { x: 280, y: 180 },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        style: {
          background:
            selectedNodeId === "node-conversion" ? "#331215" : "#141622",
          color: "#f87171",
          border: "1.5px solid #ef4444",
          borderRadius: "10px",
          padding: "10px 14px",
          fontSize: "12px",
          fontWeight: 700,
        },
      },
      {
        id: "node-onboarding",
        data: {
          label: "⚡ 2. Onboarding Flow",
          category: "assumed" as NodeTypeCategory,
          details: "Guided setup walkthrough completion.",
        },
        position: { x: 500, y: 180 },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        style: {
          background:
            selectedNodeId === "node-onboarding" ? "#2d1e0a" : "#141622",
          color: "#fbbf24",
          border: "1.5px solid #f59e0b",
          borderRadius: "10px",
          padding: "10px 14px",
          fontSize: "12px",
          fontWeight: 600,
        },
      },
      {
        id: "node-activation",
        data: {
          label: "🎯 3. Feature Activation",
          category: "high_risk" as NodeTypeCategory,
          details: "Users inviting team & completing key setup event.",
        },
        position: { x: 720, y: 180 },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        style: {
          background:
            selectedNodeId === "node-activation" ? "#331215" : "#141622",
          color: "#f87171",
          border: "2px solid #ef4444",
          borderRadius: "10px",
          padding: "10px 14px",
          fontSize: "12px",
          fontWeight: 700,
          boxShadow: "0 0 15px rgba(239, 68, 68, 0.2)",
        },
      },
      {
        id: "node-revenue",
        data: {
          label: "💰 4. ARR & Revenue Exposure",
          category: "observed" as NodeTypeCategory,
          details: "Net ARR impact & paid subscription conversion.",
        },
        position: { x: 940, y: 180 },
        targetPosition: Position.Left,
        style: {
          background: selectedNodeId === "node-revenue" ? "#0b261b" : "#141622",
          color: "#34d399",
          border: "1.5px solid #10b981",
          borderRadius: "10px",
          padding: "10px 14px",
          fontSize: "12px",
          fontWeight: 700,
        },
      },
      // Secondary Branch Nodes
      {
        id: "node-billing",
        data: {
          label: "💳 Stripe Trial Webhooks",
          category: "known" as NodeTypeCategory,
        },
        position: { x: 280, y: 60 },
        targetPosition: Position.Bottom,
        style: {
          background: "#141622",
          color: "#e4e2d8",
          border: "1px solid #383e54",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "11px",
        },
      },
      {
        id: "node-email",
        data: {
          label: "📧 Day-3 Drip Automation",
          category: "assumed" as NodeTypeCategory,
        },
        position: { x: 500, y: 300 },
        targetPosition: Position.Top,
        style: {
          background: "#141622",
          color: "#fbbf24",
          border: "1px solid #d97706",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "11px",
        },
      },
      {
        id: "node-support",
        data: {
          label: "🎧 Support Ticket Spike",
          category: "unknown" as NodeTypeCategory,
        },
        position: { x: 500, y: 60 },
        targetPosition: Position.Bottom,
        style: {
          background: "#241407",
          color: "#fb923c",
          border: "1.5px dashed #ea580c",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "11px",
        },
      },
      {
        id: "node-sales",
        data: {
          label: "💼 Enterprise Demo Pipeline",
          category: "unknown" as NodeTypeCategory,
        },
        position: { x: 720, y: 300 },
        targetPosition: Position.Top,
        style: {
          background: "#241407",
          color: "#fb923c",
          border: "1.5px dashed #ea580c",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "11px",
        },
      },
      {
        id: "node-analytics",
        data: {
          label: "📊 Mixpanel Funnel Telemetry",
          category: "known" as NodeTypeCategory,
        },
        position: { x: 280, y: 300 },
        targetPosition: Position.Top,
        style: {
          background: "#141622",
          color: "#e4e2d8",
          border: "1px solid #383e54",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "11px",
        },
      },
    ],
    [changeTitle, selectedNodeId],
  );

  const rawEdges: Edge[] = useMemo(
    () => [
      {
        id: "e-root-conv",
        source: "root-change",
        target: "node-conversion",
        animated: true,
        style: { stroke: "#ef4444", strokeWidth: 2.5 },
      },
      {
        id: "e-conv-onb",
        source: "node-conversion",
        target: "node-onboarding",
        animated: true,
        style: { stroke: "#f59e0b", strokeWidth: 2 },
      },
      {
        id: "e-onb-act",
        source: "node-onboarding",
        target: "node-activation",
        animated: true,
        style: { stroke: "#ef4444", strokeWidth: 2.5 },
      },
      {
        id: "e-act-rev",
        source: "node-activation",
        target: "node-revenue",
        animated: true,
        style: { stroke: "#10b981", strokeWidth: 2.5 },
      },
      // Secondary Branch Edges
      {
        id: "e-root-bill",
        source: "root-change",
        target: "node-billing",
        animated: false,
        style: { stroke: "#383e54", strokeDasharray: "4 4" },
      },
      {
        id: "e-onb-email",
        source: "node-onboarding",
        target: "node-email",
        animated: false,
        style: { stroke: "#d97706" },
      },
      {
        id: "e-onb-supp",
        source: "node-onboarding",
        target: "node-support",
        animated: false,
        style: { stroke: "#ea580c", strokeDasharray: "4 4" },
      },
      {
        id: "e-act-sales",
        source: "node-activation",
        target: "node-sales",
        animated: false,
        style: { stroke: "#ea580c", strokeDasharray: "4 4" },
      },
      {
        id: "e-conv-analytics",
        source: "node-conversion",
        target: "node-analytics",
        animated: false,
        style: { stroke: "#383e54", strokeDasharray: "4 4" },
      },
    ],
    [],
  );

  // Filter nodes based on toolbar state
  const displayedNodes = useMemo(() => {
    if (filterMode === "risk_only") {
      return rawNodes.filter(
        (n) => n.data.category === "high_risk" || n.id === "root-change",
      );
    }
    if (filterMode === "unknowns_only") {
      return rawNodes.filter(
        (n) => n.data.category === "unknown" || n.id === "root-change",
      );
    }
    return rawNodes;
  }, [rawNodes, filterMode]);

  // Node details lookup map for Contextual Inspector Panel
  const nodeDetailsMap: Record<string, ImpactNode> = {
    "root-change": {
      id: "root-change",
      change_id: "CHG-DEMO-001",
      name: changeTitle,
      domain_type: "Pricing & Growth",
      depth: 0,
      confidence_score: 1.0,
      severity: "high",
      details: "Root change statement submitted for evaluation.",
      why_affected: "Primary proposal initiated by Growth team.",
      evidence: [
        "Product Requirement Doc PRD-2026-04",
        "Historical trial length benchmarks",
      ],
      recommended_action:
        "Perform multi-hop graph evaluation across all 5 downstream tiers.",
      node_type: "known",
      business_effect: "Compresses user trial evaluation window to 7 days.",
      unverified_assumptions_count: 0,
    },
    "node-conversion": {
      id: "node-conversion",
      change_id: "CHG-DEMO-001",
      name: "Signup Conversion Rate",
      domain_type: "Product Revenue",
      depth: 1,
      confidence_score: 0.92,
      severity: "high",
      details:
        "Shorter trial window creates higher immediate urgency but lowers initial top-of-funnel signup volume by ~5.2%.",
      why_affected:
        "Self-serve visitors compare trial length against competitor 14-day defaults before completing sign-up.",
      evidence: [
        "Mixpanel conversion funnel audit v3.2",
        "Intercom user friction survey logs",
      ],
      recommended_action:
        "Set up 10% A/B traffic split cohort before 100% global rollout.",
      node_type: "high_risk",
      business_effect: "Immediate -5.2% top-of-funnel conversion drop.",
      unverified_assumptions_count: 1,
    },
    "node-onboarding": {
      id: "node-onboarding",
      change_id: "CHG-DEMO-001",
      name: "Onboarding Completion Flow",
      domain_type: "Product UX",
      depth: 2,
      confidence_score: 0.85,
      severity: "medium",
      details:
        "Users have 50% less calendar time to invite team members and set up integrations before trial expiration.",
      why_affected:
        "Shortened trial window accelerates friction during step-by-step onboarding walkthrough.",
      evidence: [
        "User onboarding milestone telemetry",
        "FullStory session replay recordings",
      ],
      recommended_action:
        "Deploy automated Day-3 re-engagement email drip campaign.",
      node_type: "assumed",
      business_effect:
        "User activation drop-off risk increases if onboarding setup is unguided.",
      unverified_assumptions_count: 1,
    },
    "node-activation": {
      id: "node-activation",
      change_id: "CHG-DEMO-001",
      name: "Feature Activation Milestone",
      domain_type: "Product Value",
      depth: 3,
      confidence_score: Math.min(0.78 * scenarioMultiplier, 0.98),
      severity: activeScenarioId === "adverse" ? "critical" : "high",
      details:
        "Activation rate risk increases by up to +18% if users do not invite 2+ team members within the first 72 hours.",
      why_affected:
        "Multi-user workspace collaboration requires multi-day coordination across team members.",
      evidence: [
        "Activation metric cohort report 2026-Q1",
        "Database workspace user count telemetry",
      ],
      recommended_action:
        "Add team invitation prompt on Day 1 of onboarding wizard.",
      node_type: "high_risk",
      business_effect:
        "Activation rate decline leads directly to lower trial-to-paid conversion.",
      unverified_assumptions_count: 2,
    },
    "node-revenue": {
      id: "node-revenue",
      change_id: "CHG-DEMO-001",
      name: "ARR & Revenue Exposure",
      domain_type: "Financial Operations",
      depth: 4,
      confidence_score: 0.88,
      severity: "critical",
      details:
        "Net ARR impact balances faster sales cycle velocity (+22%) against potential top-of-funnel conversion drop.",
      why_affected:
        "Directly impacts paid conversion velocity and initial contract size.",
      evidence: [
        "Stripe billing analytics engine",
        "Salesforce pipeline forecasting model",
      ],
      recommended_action:
        "Track 30-day post-launch expansion ARR vs baseline cohort.",
      node_type: "observed",
      business_effect:
        "Estimated net revenue delta +$68,000 / month under expected scenario.",
      unverified_assumptions_count: 0,
    },
    "node-support": {
      id: "node-support",
      change_id: "CHG-DEMO-001",
      name: "Support Ticket Spike",
      domain_type: "Customer Operations",
      depth: 2,
      confidence_score: 0.72,
      severity: "medium",
      details:
        "Expected 15% increase in trial extension requests submitted to customer support desk on Day 6.",
      why_affected:
        "Users reaching Day 6 require extra evaluation time for enterprise procurement approval.",
      evidence: [
        "Zendesk historical trial extension ticket tags",
        "Sales CS handoff logs",
      ],
      recommended_action:
        "Train support team on automated 3-day trial extension macro.",
      node_type: "unknown",
      business_effect: "Support queue load increases on Day 6 of user signup.",
      unverified_assumptions_count: 2,
    },
  };

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    const details = nodeDetailsMap[node.id] || {
      id: node.id,
      change_id: "CHG-DEMO-001",
      name: String(node.data.label),
      domain_type: "System Dependency",
      depth: 2,
      confidence_score: 0.82,
      severity: "medium",
      details: "Secondary system node affected by root change propagation.",
      why_affected: "Integrated via API webhooks or event bus telemetry.",
      evidence: ["System architecture diagram", "Event bus log telemetry"],
      recommended_action:
        "Monitor system telemetry for unexpected error spikes.",
      node_type: node.data.category || "known",
      business_effect: "Secondary operational impact.",
      unverified_assumptions_count: 1,
    };

    onNodeSelect(details);
  };

  return (
    <div className="w-full h-[520px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative shadow-2xl flex flex-col select-none">
      {/* Top Floating Observatory Canvas Toolbar */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg font-mono text-xs text-slate-300">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-bold text-ivory-100">
          Impact Consequence Canvas
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-amber-300">
          Scenario: {activeScenarioId.toUpperCase()}
        </span>
      </div>

      {/* Floating View Filter Controls */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-xl backdrop-blur-md shadow-lg text-xs font-mono">
        <button
          onClick={() => setFilterMode("all")}
          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
            filterMode === "all"
              ? "bg-amber-500 text-slate-950 font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          All Nodes
        </button>

        <button
          onClick={() => setFilterMode("risk_only")}
          className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
            filterMode === "risk_only"
              ? "bg-rose-500 text-white font-bold"
              : "text-slate-400 hover:text-rose-400"
          }`}
        >
          <ShieldAlert className="w-3 h-3" /> Risk Only
        </button>

        <button
          onClick={() => setFilterMode("unknowns_only")}
          className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
            filterMode === "unknowns_only"
              ? "bg-orange-500 text-white font-bold"
              : "text-slate-400 hover:text-orange-400"
          }`}
        >
          <HelpCircle className="w-3 h-3" /> Unknowns
        </button>
      </div>

      {/* Legend Bar at Bottom */}
      <div className="absolute bottom-3 left-3 z-20 flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl backdrop-blur-md text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400" /> Change Node
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-400" /> High Risk
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-400" /> Unknown
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400" /> Observed
        </span>
      </div>

      <ReactFlow
        nodes={displayedNodes}
        edges={rawEdges}
        onNodeClick={handleNodeClick}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1c1f2b" gap={24} size={1} />
        <Controls className="bg-slate-900 border-slate-800 fill-slate-300 rounded-xl" />
      </ReactFlow>
    </div>
  );
};
