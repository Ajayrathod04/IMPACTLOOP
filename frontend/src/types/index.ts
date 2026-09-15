/**
 * ImpactLoop Core Domain Types & Interfaces - Step 3 & Step 4 Impact Observatory
 */

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type ChangeStatus =
  | "draft"
  | "analyzing"
  | "approved"
  | "shipped"
  | "observing"
  | "learned";

export type ProvenanceState = "VERIFIED_FACT" | "PROBABILISTIC_INFERENCE" | "EXPLICIT_UNKNOWN";

export type NodeTypeCategory = "known" | "assumed" | "unknown" | "high_risk" | "observed";

export type ActiveTab = "DECISION_ROOM" | "SCENARIOS" | "OUTCOMES" | "MEMORY" | "CHANGES";

export interface ImpactNode {
  id: string;
  change_id?: string;
  title?: string;
  name?: string;
  domain_type: string;
  depth: number;
  confidence_score: number;
  severity_score?: number;
  severity?: RiskLevel;
  why_affected?: string;
  predicted_consequence?: string;
  recommended_validation?: string;
  recommended_action?: string;
  provenance?: ProvenanceState;
  evidence_ids?: string[];
  evidence?: string[];
  details?: string;
  node_type?: NodeTypeCategory | string;
  business_effect?: string;
  unverified_assumptions_count?: number;
}

export interface ImpactEdge {
  id?: string;
  source_id: string;
  target_id: string;
  relationship: string;
  strength: number;
  confidence: number;
  provenance?: ProvenanceState;
}

export interface Action {
  id: string;
  change_id: string;
  title: string;
  owner?: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
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

export interface ImpactGraph {
  graph_id: string;
  change_id: string;
  nodes: ImpactNode[];
  edges: ImpactEdge[];
  risk_assessment?: RiskAssessment;
  unknowns?: ExplicitUnknown[];
}

export interface EvidenceRecord {
  id: string;
  title: string;
  summary: string;
  source_type: string;
  strength: number;
  confidence: number;
  node_id?: string;
}

export interface ExplicitUnknown {
  id: string;
  title: string;
  description: string;
  resolution_method: string;
  impact_level: string;
}

export interface RiskFactors {
  breadth: number;
  downstream_depth: number;
  severity: number;
  uncertainty: number;
  evidence_strength: number;
}

export interface RiskAssessment {
  overall_risk_score: number;
  risk_level: RiskLevel;
  model_confidence: number;
  risk_factors: RiskFactors;
  explanation: string;
}

export interface GuardrailRecommendation {
  id: string;
  title: string;
  rationale: string;
  category: string;
  priority: string;
}

export interface HumanDecision {
  status: "APPROVED" | "REVIEW_REQUIRED" | "HOLD";
  reviewer: string;
  rationale: string;
  acknowledged_guardrails: string[];
  timestamp: string;
}

export interface MetricObservation {
  metric_name: string;
  predicted_change: number;
  observed_change: number;
  variance: number;
  confidence_score: number;
  timestamp: string;
}

export interface LearningRecord {
  learned_pattern: string;
  confidence_adjustment: number;
  model_update_summary: string;
  timestamp: string;
}

export interface OrgMemoryItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  confidence: number;
  source_change_id: string;
  provenance: string;
  timestamp: string;
  tags?: string[];
  date?: string;
  key_finding?: string;
  validated_assumption?: string;
  reusable_rule?: string;
  historical_outcome?: string;
  impact_rating?: string;
  source?: string;
}

export interface CreateChangePayload {
  title: string;
  description?: string;
  category: string;
  intended_outcome?: string;
  current_state?: string;
  proposed_state?: string;
  target_metric?: string;
  owner?: string;
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
  target_metric?: string;
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

export type ProposedChange = Change;

export interface ToastMessage {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  description?: string;
}
