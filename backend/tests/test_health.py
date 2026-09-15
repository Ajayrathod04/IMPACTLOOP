"""Tests for ImpactLoop health endpoint."""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_endpoint():
    """Verify GET /api/health returns 200 OK and expected health payload."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "ImpactLoop API"
    assert data["version"] == "0.1.0"


def test_root_endpoint():
    """Verify GET / returns online metadata."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "ImpactLoop API"
    assert data["status"] == "online"
