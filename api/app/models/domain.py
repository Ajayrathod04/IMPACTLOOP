"""Domain Pydantic models for ImpactLoop change intelligence.

These models define the core domain contracts for predicting downstream
consequences, surfacing evidence, quantifying risk, recommending actions,
and learning from actual observed outcomes.
"""

from datetime import datetime, timezone
from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field


class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class ChangeStatus(str, Enum):
    DRAFT = "draft"
    ANALYZING = "analyzing"
    APPROVED = "approved"
    SHIPPED = "shipped"
    OBSERVING = "observing"
    LEARNED = "learned"


class ImpactNode(BaseModel):
    id: str = Field(..., description="Unique identifier for the impact node")
    change_id: str = Field(..., description="Associated change ID")
    name: str = Field(..., description="Affected feature or area name, e.g., Conversion Rate")
    domain_type: str = Field(..., description="Area domain: Product, Engineering, Revenue, Ops")
    depth: int = Field(default=1, description="Hop depth from root change")
    confidence_score: float = Field(default=0.8, ge=0.0, le=1.0, description="Confidence in prediction")
    details: Optional[str] = Field(default=None, description="Explanatory context")


class ImpactEdge(BaseModel):
    source_id: str = Field(..., description="Origin node ID")
    target_id: str = Field(..., description="Target node ID")
    relationship: str = Field(default="CAUSES", description="Relationship type")
    strength: float = Field(default=0.8, ge=0.0, le=1.0)
    confidence: float = Field(default=0.8, ge=0.0, le=1.0)
    provenance: str = Field(default="PROBABILISTIC_INFERENCE")


class ImpactGraph(BaseModel):
    graph_id: str = Field(..., description="Unique graph ID")
    change_id: str = Field(..., description="Associated change ID")
    nodes: List[ImpactNode] = Field(default_factory=list)
    edges: List[ImpactEdge] = Field(default_factory=list)


class Evidence(BaseModel):
    id: str = Field(..., description="Unique evidence ID")
    node_id: str = Field(..., description="Impact node ID this evidence supports")
    source: str = Field(..., description="Source system or artifact, e.g., Analytics / Mixpanel")
    text: str = Field(..., description="Summary statement of empirical evidence")
    evidence_type: str = Field(default="observed", description="'observed' if backed by telemetry/data, or 'hypothesis' if unverified assumption")
    strength_score: float = Field(default=0.75, ge=0.0, le=1.0, description="Evidence strength")
    confidence: float = Field(default=0.8, ge=0.0, le=1.0, description="Confidence level in this evidence")
    assumptions: List[str] = Field(default_factory=list, description="Underlying assumptions behind this evidence")
    unknowns: List[str] = Field(default_factory=list, description="Unknown variables requiring validation")
    validation_method: Optional[str] = Field(default=None, description="How this hypothesis/evidence will be validated")


class EvidenceRecord(BaseModel):
    id: str = Field(..., description="Unique evidence ID")
    title: str = Field(..., description="Evidence title")
    summary: str = Field(..., description="Evidence summary")
    source_type: str = Field(default="TELEMETRY")
    strength: float = Field(default=0.85, ge=0.0, le=1.0)
    confidence: float = Field(default=0.9, ge=0.0, le=1.0)
    node_id: Optional[str] = None


class Risk(BaseModel):
    id: str = Field(..., description="Unique risk ID")
    change_id: str = Field(..., description="Associated change ID")
    title: str = Field(..., description="Short description of risk")
    description: str = Field(..., description="Detailed explanation of potential risk impact")
    severity: RiskLevel = Field(default=RiskLevel.HIGH)
    likelihood: float = Field(default=0.7, ge=0.0, le=1.0)


class Action(BaseModel):
    id: str = Field(..., description="Unique action ID")
    change_id: str = Field(..., description="Associated change ID")
    title: str = Field(..., description="Actionable recommendation title")
    action: Optional[str] = Field(default=None, description="Alias for title")
    owner: Optional[str] = Field(default=None, description="Assigned team or role")
    status: str = Field(default="pending", description="Status: pending, in_progress, completed")
    priority: str = Field(default="high", description="Priority: low, medium, high, urgent")
    reason: Optional[str] = Field(default=None, description="Rationale for this recommended guardrail")
    expected_benefit: Optional[str] = Field(default=None, description="Anticipated risk reduction or business benefit")
    validation_signal: Optional[str] = Field(default=None, description="Signal confirming guardrail success")


class Scenario(BaseModel):
    id: str = Field(..., description="Unique scenario ID")
    change_id: str = Field(..., description="Associated change ID")
    name: str = Field(..., description="Scenario title, e.g., Aggressive Growth vs Churn Spike")
    probability: float = Field(..., ge=0.0, le=1.0, description="Estimated probability of occurrence")
    impact_description: str = Field(..., description="Summary of expected impact in this scenario")
    affected_systems: List[str] = Field(default_factory=list, description="Systems affected under this scenario")
    risk_level: RiskLevel = Field(default=RiskLevel.HIGH)
    confidence: float = Field(default=0.8, ge=0.0, le=1.0, description="Confidence rating in this scenario")
    business_impact: Optional[str] = Field(default=None, description="Financial or metrics impact summary")
    key_assumptions: List[str] = Field(default_factory=list, description="Critical assumptions for scenario")
    recommended_guardrail: Optional[str] = Field(default=None, description="Recommended guardrail for scenario")
    activation_delta: Optional[str] = Field(default=None, description="Estimated activation rate change e.g. '-5%'")
    revenue_delta: Optional[str] = Field(default=None, description="Estimated revenue change e.g. '+12%'")
    support_delta: Optional[str] = Field(default=None, description="Estimated support ticket volume change e.g. '+25%'")


class Outcome(BaseModel):
    id: str = Field(..., description="Unique outcome ID")
    change_id: str = Field(..., description="Associated change ID")
    predicted_result: str = Field(..., description="Original prediction summary")
    actual_result: str = Field(..., description="Observed real-world result after shipping")
    delta: str = Field(..., description="Variance between predicted vs actual result")
    lessons_learned: List[str] = Field(default_factory=list, description="Extracted insights for org memory")


class ExplicitUnknown(BaseModel):
    id: str = Field(..., description="Unique unknown ID")
    title: str = Field(..., description="Unknown title")
    description: str = Field(..., description="Detailed description")
    resolution_method: str = Field(default="A/B Experiment")
    impact_level: str = Field(default="HIGH")


class RiskFactors(BaseModel):
    breadth: int = Field(default=3)
    downstream_depth: int = Field(default=4)
    severity: float = Field(default=0.82)
    uncertainty: float = Field(default=0.15)
    evidence_strength: float = Field(default=0.88)


class RiskAssessment(BaseModel):
    overall_risk_score: int = Field(..., ge=0, le=100)
    risk_level: RiskLevel = Field(default=RiskLevel.HIGH)
    model_confidence: float = Field(default=0.87, ge=0.0, le=1.0)
    risk_factors: RiskFactors = Field(default_factory=RiskFactors)
    explanation: str = Field(..., description="Risk narrative")


class GuardrailRecommendation(BaseModel):
    id: str = Field(..., description="Unique guardrail ID")
    title: str = Field(..., description="Guardrail title")
    rationale: str = Field(..., description="Why this guardrail is recommended")
    category: str = Field(default="ONBOARDING_GUARDRAIL")
    priority: str = Field(default="HIGH")


class HumanDecision(BaseModel):
    status: str = Field(..., description="APPROVED | REVIEW_REQUIRED | HOLD")
    reviewer: str = Field(..., description="Reviewer role/name")
    rationale: str = Field(..., description="Decision rationale")
    acknowledged_guardrails: List[str] = Field(default_factory=list)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class MetricObservation(BaseModel):
    """Post-shipment outcome measurement record."""
    outcome_id: str = Field(..., description="Unique outcome ID")
    change_id: str = Field(..., description="Associated change ID")
    metric: str = Field(..., description="KPI or system metric being tracked")
    predicted_direction: str = Field(..., description="Predicted change value or direction e.g. +14% ARR")
    observed_direction: str = Field(..., description="Actual real-world observed value or direction e.g. +12% ARR")
    predicted_value: Optional[str] = Field(default=None, description="Original quantitative prediction")
    observed_value: Optional[str] = Field(default=None, description="Actual quantitative measurement")
    variance: str = Field(..., description="Calculated variance between predicted vs observed outcome")
    observation_window: str = Field(default="14 days post-ship", description="Timeframe of observation")
    status: str = Field(default="completed", description="Status: observing | completed | variance_detected")
    notes: Optional[str] = Field(default=None, description="Qualitative operational notes")


class LearningRecord(BaseModel):
    """Learning loop comparison delta between prediction vs actual observation."""
    learning_id: str = Field(..., description="Unique learning record ID")
    change_id: str = Field(..., description="Associated change ID")
    prediction_accuracy: float = Field(..., ge=0.0, le=1.0, description="Overall prediction accuracy rating (0.0 to 1.0)")
    directional_correctness: bool = Field(..., description="True if primary direction was correctly predicted")
    variance_summary: str = Field(..., description="Summary of variance between predicted and actual outcome")
    calibration_signal: str = Field(..., description="Feedback calibration signal for org memory")
    previous_assumption: str = Field(..., description="Original assumption made prior to shipping")
    observed_reality: str = Field(..., description="Real-world metric behavior after shipping")
    learned_insight: str = Field(..., description="Re-usable organizational insight derived from learning loop")


class OrgMemoryItem(BaseModel):
    """Persistent organizational memory item for cross-change decision intelligence."""
    memory_id: str = Field(..., description="Unique organizational memory item ID")
    statement: str = Field(..., description="Key learned rule, pattern, or outcome statement")
    category: str = Field(default="validated_rule", description="Category: validated_rule | historical_outcome | dependency | assumption | learned_pattern | guardrail")
    confidence: float = Field(default=0.85, ge=0.0, le=1.0, description="Confidence rating based on empirical validation")
    provenance: str = Field(default="Observed Post-Ship Outcome", description="Origin of this memory record")
    created_from_change: str = Field(..., description="Change ID that produced this organizational memory")
    validation_status: str = Field(default="validated", description="Status: validated | hypothetical | deprecated")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NormalizedChange(BaseModel):
    title: str = Field(..., description="Title of proposed change")
    description: Optional[str] = None
    category: str = Field(default="ONBOARDING")
    current_state: Optional[str] = None
    proposed_state: Optional[str] = None
    target_metric: Optional[str] = None
    owner: Optional[str] = None


class AnalysisResult(BaseModel):
    risk_level: RiskLevel = Field(..., description="Overall risk classification")
    risk_score: int = Field(..., ge=0, le=100, description="Numeric risk score (0-100)")
    confidence_score: float = Field(..., ge=0.0, le=1.0, description="Confidence in assessment (0.0-1.0)")
    affected_areas: List[str] = Field(default_factory=list, description="Affected core systems or domains")
    affected_systems: List[str] = Field(default_factory=list, description="Alias for affected_areas")
    downstream_impacts: List[ImpactNode] = Field(default_factory=list, description="Likely downstream impact nodes")
    impact_nodes: List[ImpactNode] = Field(default_factory=list, description="Alias for downstream_impacts")
    impact_graph: Optional[ImpactGraph] = Field(default=None, description="Structured graph with nodes and relationship edges")
    evidence: List[Evidence] = Field(default_factory=list, description="Empirical evidence & hypothesis items")
    evidence_records: List[EvidenceRecord] = Field(default_factory=list, description="Typed evidence records")
    explicit_unknowns: List[ExplicitUnknown] = Field(default_factory=list, description="Typed explicit unknown objects")
    risk_assessment: Optional[RiskAssessment] = Field(default=None, description="Explainable risk calculation breakdown")
    assumptions_unknowns: List[str] = Field(default_factory=list, description="Surfaced assumptions and unknowns")
    assumptions: List[str] = Field(default_factory=list, description="Explicit assumptions")
    unknowns: List[str] = Field(default_factory=list, description="Explicit unknowns requiring validation")
    scenarios: List[Scenario] = Field(default_factory=list, description="3 scenarios: CONSERVATIVE, EXPECTED, ADVERSE")
    recommended_actions: List[Action] = Field(default_factory=list, description="Actionable recommendations")
    recommendations: List[Action] = Field(default_factory=list, description="Alias for recommended_actions")
    guardrail_recommendations: List[GuardrailRecommendation] = Field(default_factory=list, description="Typed guardrail recommendations")
    normalized_change: Optional[NormalizedChange] = Field(default=None, description="Normalized intake representation")
    business_impact: str = Field(default="", description="High-level business impact assessment")
    summary: str = Field(..., description="Engine summary assessment statement")
    analysis_status: str = Field(default="completed", description="Status: 'completed' | 'fallback' | 'failed'")
    analysis_provider: str = Field(default="deterministic_fallback", description="Provider: 'bedrock_strands' or 'deterministic_fallback'")
    analyzed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CreateChangeRequest(BaseModel):
    title: str = Field(..., min_length=3, max_length=200, description="Proposed change summary")
    description: Optional[str] = Field(default=None, description="Context, hypothesis, or PR link")
    category: str = Field(default="Pricing & Packaging", description="Category of change")
    intended_outcome: Optional[str] = Field(default=None, description="Expected outcome statement / target metric")
    current_state: Optional[str] = Field(default=None, description="Baseline metric or state prior to change")
    proposed_state: Optional[str] = Field(default=None, description="Target metric or state after change")
    target_metric: Optional[str] = Field(default=None, description="Primary KPI target")
    owner: Optional[str] = Field(default=None, description="Change owner or team")
    business_goal: Optional[str] = Field(default=None, description="Strategic business motivation")
    scope: Optional[str] = Field(default=None, description="Deployment scope")
    affected_systems: List[str] = Field(default_factory=list, description="Optional specified affected systems")


class Change(BaseModel):
    id: str = Field(..., description="Unique change ID")
    title: str = Field(..., description="Summary of proposed change")
    description: Optional[str] = Field(default=None, description="Detailed context or PR link")
    category: str = Field(default="Pricing & Packaging", description="Product / Infra / Pricing / Feature")
    intended_outcome: Optional[str] = Field(default=None, description="Desired goal or target metric")
    current_state: Optional[str] = Field(default=None, description="Current baseline state")
    proposed_state: Optional[str] = Field(default=None, description="Proposed target state")
    owner: Optional[str] = Field(default=None, description="Change owner or team")
    risk_level: RiskLevel = Field(default=RiskLevel.HIGH)
    status: ChangeStatus = Field(default=ChangeStatus.DRAFT)
    affected_area_count: int = Field(default=0)
    unknown_count: int = Field(default=0)
    recommended_action_count: int = Field(default=0)
    affected_areas: List[str] = Field(default_factory=list)
    is_demo: bool = Field(default=False, description="Flag indicating seeded demo scenario")
    analysis_result: Optional[AnalysisResult] = Field(default=None, description="Detailed impact analysis output")
    human_decision: Optional[HumanDecision] = Field(default=None, description="Human decision gate record")
    observation: Optional[MetricObservation] = Field(default=None, description="Post-ship observation outcome record")
    learning_record: Optional[LearningRecord] = Field(default=None, description="Prediction vs observation learning record")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
