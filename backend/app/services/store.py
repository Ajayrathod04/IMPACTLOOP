"""Local development store for ImpactLoop changes.

Provides an isolated memory repository with pre-seeded demo data that can later be
replaced with PostgreSQL/SQLAlchemy without altering API handler contracts.
"""

import uuid
from datetime import datetime, timezone
from typing import Dict, List, Optional
from app.models.domain import (
    Change,
    ChangeStatus,
    RiskLevel,
    CreateChangeRequest,
    AnalysisResult,
)
from app.services.analysis_engine import LocalAnalysisEngine


class ChangeRepository:
    """In-memory repository store with seeded demo data."""

    def __init__(self):
        self._store: Dict[str, Change] = {}
        self._seed_demo_data()

    def _seed_demo_data(self):
        """Seed default demo scenario 'Free Trial: 14 days -> 7 days'."""
        demo_id = "CHG-DEMO-001"
        demo_req = CreateChangeRequest(
            title="Free Trial: 14 days → 7 days",
            description="Shorten self-serve trial period to accelerate high-intent user conversion, increase sales team outreach velocity, and optimize pipeline throughput.",
            category="Pricing & Packaging",
            intended_outcome="Accelerate self-serve sales velocity and improve 30-day expansion revenue.",
        )

        analysis = LocalAnalysisEngine._analyze_pricing_trial(demo_req, demo_id)

        demo_change = Change(
            id=demo_id,
            title=demo_req.title,
            description=demo_req.description,
            category=demo_req.category,
            intended_outcome=demo_req.intended_outcome,
            risk_level=analysis.risk_level,
            status=ChangeStatus.ANALYZING,
            affected_area_count=len(analysis.affected_areas),
            unknown_count=len(analysis.assumptions_unknowns),
            recommended_action_count=len(analysis.recommended_actions),
            affected_areas=analysis.affected_areas,
            is_demo=True,
            analysis_result=analysis,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc),
        )

        self._store[demo_id] = demo_change

    def get_all(self) -> List[Change]:
        """Return all changes sorted by updated_at descending."""
        return sorted(self._store.values(), key=lambda c: c.updated_at, reverse=True)

    def get_by_id(self, change_id: str) -> Optional[Change]:
        """Retrieve change by unique ID."""
        return self._store.get(change_id)

    def create(self, req: CreateChangeRequest) -> Change:
        """Create new change record in draft status."""
        change_id = f"CHG-{uuid.uuid4().hex[:8].upper()}"

        change = Change(
            id=change_id,
            title=req.title,
            description=req.description,
            category=req.category,
            intended_outcome=req.intended_outcome,
            risk_level=RiskLevel.MEDIUM,
            status=ChangeStatus.DRAFT,
            affected_area_count=0,
            unknown_count=0,
            recommended_action_count=0,
            affected_areas=[],
            is_demo=False,
            analysis_result=None,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc),
        )

        self._store[change_id] = change
        return change

    def analyze(self, change_id: str) -> Optional[Change]:
        """Run impact analysis engine on a change and update repository record."""
        change = self.get_by_id(change_id)
        if not change:
            return None

        # Build request model for engine
        req = CreateChangeRequest(
            title=change.title,
            description=change.description,
            category=change.category,
            intended_outcome=change.intended_outcome,
        )

        # Run analysis engine
        analysis = LocalAnalysisEngine.analyze(req, change_id)

        # Update change record
        change.status = ChangeStatus.ANALYZING
        change.risk_level = analysis.risk_level
        change.affected_area_count = len(analysis.affected_areas)
        change.unknown_count = len(analysis.assumptions_unknowns)
        change.recommended_action_count = len(analysis.recommended_actions)
        change.affected_areas = analysis.affected_areas
        change.analysis_result = analysis
        change.updated_at = datetime.now(timezone.utc)

        self._store[change_id] = change
        return change

    def analyze(self, change_id: str, preferred_provider: Optional[str] = None) -> Optional[Change]:
        """Run impact analysis engine on a change and update repository record."""
        change = self.get_by_id(change_id)
        if not change:
            return None

        # Build request model for service
        req = CreateChangeRequest(
            title=change.title,
            description=change.description,
            category=change.category,
            intended_outcome=change.intended_outcome,
            current_state=change.current_state,
            proposed_state=change.proposed_state,
            owner=change.owner,
        )

        # Run analysis via LocalAnalysisEngine
        analysis = LocalAnalysisEngine.analyze(req, change_id)

        # Update change record
        change.status = ChangeStatus.ANALYZING
        change.risk_level = analysis.risk_level
        change.affected_area_count = len(analysis.affected_areas)
        change.unknown_count = len(analysis.assumptions_unknowns)
        change.recommended_action_count = len(analysis.recommended_actions)
        change.affected_areas = analysis.affected_areas
        change.analysis_result = analysis
        change.updated_at = datetime.now(timezone.utc)

        self._store[change_id] = change
        return change

    def record_decision(
        self,
        change_id: str,
        decision: DecisionType,
        reason: str,
        reviewer: str = "Lead Architect",
        unresolved_risks: List[str] = None,
        selected_guardrails: List[str] = None,
    ) -> Optional[Change]:
        """Record human decision gate result on a change."""
        change = self.get_by_id(change_id)
        if not change:
            return None

        human_dec = DecisionGateService.record_decision(
            change_id=change_id,
            decision=decision,
            reason=reason,
            reviewer=reviewer,
            unresolved_risks=unresolved_risks,
            selected_guardrails=selected_guardrails,
        )

        change.human_decision = human_dec
        if decision == DecisionType.APPROVE:
            change.status = ChangeStatus.APPROVED
        elif decision == DecisionType.HOLD:
            change.status = ChangeStatus.DRAFT

        change.updated_at = datetime.now(timezone.utc)
        self._store[change_id] = change
        return change

    def record_outcome(
        self,
        change_id: str,
        metric: str,
        predicted_direction: str,
        observed_direction: str,
        predicted_value: Optional[str] = None,
        observed_value: Optional[str] = None,
        observation_window: str = "14 days post-ship",
        notes: Optional[str] = None,
    ) -> Optional[Change]:
        """Record post-shipment telemetry observation and compute learning loop delta."""
        change = self.get_by_id(change_id)
        if not change:
            return None

        obs = ObservationService.record_observation(
            change_id=change_id,
            metric=metric,
            predicted_direction=predicted_direction,
            observed_direction=observed_direction,
            predicted_value=predicted_value,
            observed_value=observed_value,
            observation_window=observation_window,
            notes=notes,
        )

        learn = LearningLoopService.compute_learning(
            change_id=change_id,
            observation=obs,
            analysis_result=change.analysis_result,
        )

        # Update organizational memory
        org_memory_service.add_from_learning(learn)

        change.observation = obs
        change.learning_record = learn
        change.status = ChangeStatus.LEARNED
        change.updated_at = datetime.now(timezone.utc)

        self._store[change_id] = change
        return change


# Singleton repository instance for FastAPI lifecycle
db_store = ChangeRepository()
