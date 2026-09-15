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


class Evidence(BaseModel):
    id: str = Field(..., description="Unique evidence ID")
    node_id: str = Field(..., description="Impact node ID this evidence supports")
    source: str = Field(..., description="Source system or artifact, e.g., Analytics / Mixpanel")
    text: str = Field(..., description="Summary statement of empirical evidence")
    strength_score: float = Field(default=0.75, ge=0.0, le=1.0, description="Evidence strength")


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
    owner: Optional[str] = Field(default=None, description="Assigned team or role")
    status: str = Field(default="pending", description="Status: pending, in_progress, completed")
    priority: str = Field(default="high", description="Priority: low, medium, high, urgent")


class Scenario(BaseModel):
    id: str = Field(..., description="Unique scenario ID")
    change_id: str = Field(..., description="Associated change ID")
    name: str = Field(..., description="Scenario title, e.g., Aggressive Growth vs Churn Spike")
    probability: float = Field(..., ge=0.0, le=1.0, description="Estimated probability of occurrence")
    impact_description: str = Field(..., description="Summary of expected impact in this scenario")


class Outcome(BaseModel):
    id: str = Field(..., description="Unique outcome ID")
    change_id: str = Field(..., description="Associated change ID")
    predicted_result: str = Field(..., description="Original prediction summary")
    actual_result: str = Field(..., description="Observed real-world result after shipping")
    delta: str = Field(..., description="Variance between predicted vs actual result")
    lessons_learned: List[str] = Field(default_factory=list, description="Extracted insights for org memory")


class AnalysisResult(BaseModel):
    risk_level: RiskLevel = Field(..., description="Overall risk classification")
    risk_score: int = Field(..., ge=0, le=100, description="Numeric risk score (0-100)")
    confidence_score: float = Field(..., ge=0.0, le=1.0, description="Confidence in assessment (0.0-1.0)")
    affected_areas: List[str] = Field(default_factory=list, description="Affected core systems or domains")
    downstream_impacts: List[ImpactNode] = Field(default_factory=list, description="Likely downstream impact nodes")
    assumptions_unknowns: List[str] = Field(default_factory=list, description="Surfaced assumptions and unknowns")
    recommended_actions: List[Action] = Field(default_factory=list, description="Actionable recommendations")
    summary: str = Field(..., description="Engine summary assessment statement")
    analyzed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CreateChangeRequest(BaseModel):
    title: str = Field(..., min_length=3, max_length=200, description="Proposed change summary")
    description: Optional[str] = Field(default=None, description="Context, hypothesis, or PR link")
    category: str = Field(default="Pricing & Packaging", description="Category of change")
    intended_outcome: Optional[str] = Field(default=None, description="Expected outcome statement")


class Change(BaseModel):
    id: str = Field(..., description="Unique change ID")
    title: str = Field(..., description="Summary of proposed change")
    description: Optional[str] = Field(default=None, description="Detailed context or PR link")
    category: str = Field(default="Pricing & Packaging", description="Product / Infra / Pricing / Feature")
    intended_outcome: Optional[str] = Field(default=None, description="Desired goal or target metric")
    risk_level: RiskLevel = Field(default=RiskLevel.HIGH)
    status: ChangeStatus = Field(default=ChangeStatus.DRAFT)
    affected_area_count: int = Field(default=0)
    unknown_count: int = Field(default=0)
    recommended_action_count: int = Field(default=0)
    affected_areas: List[str] = Field(default_factory=list)
    is_demo: bool = Field(default=False, description="Flag indicating seeded demo scenario")
    analysis_result: Optional[AnalysisResult] = Field(default=None, description="Detailed impact analysis output")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
