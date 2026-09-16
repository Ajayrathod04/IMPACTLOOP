"""Health check API endpoint."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["Health"])


class HealthResponse(BaseModel):
    status: str = "healthy"
    service: str = "ImpactLoop API"
    version: str = "0.1.0"


@router.get("/health", response_model=HealthResponse)
async def get_health():
    """Return health status for monitoring and backend readiness verification."""
    return HealthResponse()
