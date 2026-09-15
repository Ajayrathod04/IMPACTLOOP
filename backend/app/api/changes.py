"""API routes for Change Management and Impact Analysis."""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Query
from app.models.domain import (
    Change, 
    CreateChangeRequest, 
    ImpactGraph, 
    EvidenceRecord, 
    RiskAssessment, 
    GuardrailRecommendation, 
    HumanDecision, 
    MetricObservation, 
    LearningRecord, 
    OrgMemoryItem, 
    Scenario
)
from app.services.change_service import ChangeService

router = APIRouter(prefix="/changes", tags=["Changes"])


@router.post("", response_model=Change, status_code=status.HTTP_213_CREATED if hasattr(status, 'HTTP_213_CREATED') else status.HTTP_201_CREATED)
async def create_change(payload: CreateChangeRequest):
    """Create a new proposed change intake record."""
    change = ChangeService.create_change(payload)
    return change


@router.get("", response_model=List[Change])
async def list_changes():
    """List all change records including seeded demo scenarios."""
    return ChangeService.list_changes()


@router.get("/{change_id}", response_model=Change)
async def get_change(change_id: str):
    """Retrieve detailed change intelligence record by ID."""
    change = ChangeService.get_change(change_id)
    if not change:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Change with ID '{change_id}' not found.",
        )
    return change


@router.post("/{change_id}/analyze", response_model=Change)
async def analyze_change(change_id: str):
    """Trigger deterministic local impact analysis on a change."""
    change = ChangeService.analyze_change(change_id)
    if not change:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cannot analyze: Change with ID '{change_id}' not found.",
        )
    return change

@router.get("", response_model=List[Change])
async def list_changes():
    """List all change records including seeded demo scenarios."""
    return ChangeService.list_changes()


@router.get("/{change_id}", response_model=Change)
async def get_change(change_id: str):
    """Retrieve detailed change intelligence record by ID."""
    change = ChangeService.get_change(change_id)
    if not change:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Change with ID '{change_id}' not found.",
        )
    return change


@router.post("/{change_id}/analyze", response_model=Change)
async def analyze_change(
    change_id: str,
    provider: Optional[str] = Query(default=None, description="Preferred provider: 'bedrock_strands' or 'deterministic_fallback'"),
):
    """Trigger decision intelligence impact analysis on a change."""
    change = ChangeService.analyze_change(change_id, preferred_provider=provider)
    if not change:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cannot analyze: Change with ID '{change_id}' not found.",
        )
    return change


@router.get("/{change_id}/impact-graph", response_model=ImpactGraph)
async def get_impact_graph(change_id: str):
    """Retrieve multi-hop consequence graph representation for change."""
    change = ChangeService.get_change(change_id)
    if not change:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Change '{change_id}' not found.")
    if not change.analysis_result or not change.analysis_result.impact_graph:
        change = ChangeService.analyze_change(change_id)
    return change.analysis_result.impact_graph


@router.get("/{change_id}/evidence", response_model=List[EvidenceRecord])
async def get_evidence(change_id: str):
    """Retrieve empirical and hypothetical evidence items for change."""
    change = ChangeService.get_change(change_id)
    if not change or not change.analysis_result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Change '{change_id}' not found or unanalyzed.")
    return change.analysis_result.evidence_records


@router.get("/{change_id}/scenarios", response_model=List[Scenario])
async def get_scenarios(change_id: str):
    """Retrieve 3 coherent scenarios (CONSERVATIVE, EXPECTED, ADVERSE) for change."""
    change = ChangeService.get_change(change_id)
    if not change or not change.analysis_result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Change '{change_id}' not found or unanalyzed.")
    return change.analysis_result.scenarios


@router.get("/{change_id}/recommendations", response_model=List[GuardrailRecommendation])
async def get_recommendations(change_id: str):
    """Retrieve actionable pre-ship and post-ship guardrail recommendations for change."""
    change = ChangeService.get_change(change_id)
    if not change or not change.analysis_result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Change '{change_id}' not found or unanalyzed.")
    return change.analysis_result.guardrail_recommendations


@router.post("/{change_id}/decision", response_model=Change)
async def record_decision(change_id: str, payload: DecisionRequest):
    """Record human operator approval/review decision gate for change."""
    change = db_store.record_decision(
        change_id=change_id,
        decision=payload.decision,
        reason=payload.reason,
        reviewer=payload.reviewer,
        unresolved_risks=payload.unresolved_risks,
        selected_guardrails=payload.selected_guardrails,
    )
    if not change:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Change '{change_id}' not found.")
    return change


@router.post("/{change_id}/outcome", response_model=Change)
async def record_outcome(change_id: str, payload: OutcomeRequest):
    """Record post-shipment real-world metric observation and execute learning loop."""
    change = db_store.record_outcome(
        change_id=change_id,
        metric=payload.metric,
        predicted_direction=payload.predicted_direction,
        observed_direction=payload.observed_direction,
        predicted_value=payload.predicted_value,
        observed_value=payload.observed_value,
        observation_window=payload.observation_window,
        notes=payload.notes,
    )
    if not change:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Change '{change_id}' not found.")
    return change


@router.get("/{change_id}/learning", response_model=LearningRecord)
async def get_learning(change_id: str):
    """Retrieve prediction vs observation learning delta record for change."""
    change = ChangeService.get_change(change_id)
    if not change or not change.learning_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No learning record found for change '{change_id}'.")
    return change.learning_record
