"""API routes for Change Management and Impact Analysis."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.domain import Change, CreateChangeRequest
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
