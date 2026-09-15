/**
 * ImpactLoop Core Domain Types & Interfaces - Step 3 Impact Observatory
 */

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type ChangeStatus =
  | "draft"
  | "analyzing"
  | "approved"
  | "shipped"
  | "observing"
  | "learned";

export type NodeTypeCategory =
  | "known"
  | "assumed"
  | "unknown"
  | "high_risk"
  | "observed";

export interface ImpactNode {
  id: string;
  change_id: string;
  name: string;
  domain_type: string;
  depth: number;
  confidence_score: number;
  details?: string;
  severity?: RiskLevel;
  why_affected?: string;
  evidence?: string[];
  recommended_action?: string;
  node_type?: NodeTypeCategory;
  business_effect?: string;
  unverified_assumptions_count?: number;
}

export interface Evidence {
  id: string;
  node_id: string;
  source: string;
  text: string;
  strength_score: number;
}

export interface Risk {
  id: string;
  change_id: string;
  title: string;
  description: string;
  severity: RiskLevel;
  likelihood: number;
}

export interface Action {
  id: string;
  change_id: string;
  title: string;
  owner?: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
}

export interface Scenario {
  id: string;
  change_id: string;
  name: string;
  probability: number;
  impact_description: string;
  affected_systems: string[];
  risk_level: RiskLevel;
  confidence: number;
  activation_delta?: string;
  revenue_delta?: string;
  support_delta?: string;
}

export interface Outcome {
  id: string;
  change_id: string;
  metric_name: string;
  predicted_result: string;
  actual_result: string;
  delta: string;
  lessons_learned: string[];
  shipped_date: string;
  observed_date: string;
}

export interface AnalysisResult {
  risk_level: RiskLevel;
  risk_score: number;
  confidence_score: number;
  affected_areas: string[];
  downstream_impacts: ImpactNode[];
  assumptions_unknowns: string[];
  recommended_actions: Action[];
  summary: string;
  analyzed_at: string;
}

export interface CreateChangePayload {
  title: string;
  description?: string;
  category: string;
  intended_outcome?: string;
  current_state?: string;
  proposed_state?: string;
  affected_systems?: string[];
}

export interface Change {
  id: string;
  title: string;
  description?: string;
  category: string;
  intended_outcome?: string;
  current_state?: string;
  proposed_state?: string;
  owner?: string;
  risk_level: RiskLevel;
  status: ChangeStatus;
  affected_area_count: number;
  unknown_count: number;
  recommended_action_count: number;
  affected_areas: string[];
  is_demo: boolean;
  analysis_result?: AnalysisResult;
  created_at: string;
  updated_at: string;
}

export interface Workspace {
  id: string;
  name: string;
  organization: string;
  activeChangesCount: number;
}

export interface RiskStoryStep {
  step: number;
  label: string;
  title: string;
  description: string;
  iconType: "change" | "downstream" | "impact" | "guardrail";
}

export interface OrgMemoryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  key_finding: string;
  validated_assumption: string;
  reusable_rule: string;
  historical_outcome: string;
  impact_rating: string;
  source: string;
}

export interface ToastMessage {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  description?: string;
}
