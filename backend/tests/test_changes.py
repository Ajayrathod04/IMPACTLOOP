"""Tests for Change Management and Impact Analysis endpoints."""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_list_changes_includes_demo():
    """Verify GET /api/changes lists seeded demo scenario."""
    response = client.get("/api/changes")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1

    # Check demo change presence
    demo = next((c for c in data if c["id"] == "CHG-DEMO-001"), None)
    assert demo is not None
    assert demo["title"] == "Free Trial: 14 days → 7 days"
    assert demo["is_demo"] is True
    assert demo["analysis_result"] is not None


def test_get_change_by_id_success():
    """Verify GET /api/changes/{id} returns details for existing change."""
    response = client.get("/api/changes/CHG-DEMO-001")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "CHG-DEMO-001"
    assert data["category"] == "Pricing & Packaging"
    assert data["analysis_result"]["risk_score"] == 82


def test_get_change_by_id_not_found():
    """Verify GET /api/changes/{id} returns 404 for invalid ID."""
    response = client.get("/api/changes/CHG-INVALID-999")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


def test_create_and_analyze_change_flow():
    """Verify POST /api/changes creation and subsequent POST /api/changes/{id}/analyze."""
    # 1. Create change
    payload = {
        "title": "Migrate Database Cluster to Postgres 16",
        "description": "Upgrade primary database engine and optimize JSONB query indexing.",
        "category": "Database & Infra",
        "intended_outcome": "Reduce query P99 latency by 35%.",
    }

    create_res = client.post("/api/changes", json=payload)
    assert create_res.status_code == 201
    created_data = create_res.json()
    change_id = created_data["id"]

    assert created_data["title"] == payload["title"]
    assert created_data["status"] == "draft"
    assert created_data["analysis_result"] is None

    # 2. Trigger analysis
    analyze_res = client.post(f"/api/changes/{change_id}/analyze")
    assert analyze_res.status_code == 200
    analyzed_data = analyze_res.json()

    assert analyzed_data["id"] == change_id
    assert analyzed_data["status"] == "analyzing"
    assert analyzed_data["analysis_result"] is not None
    assert analyzed_data["analysis_result"]["risk_score"] > 0
    assert len(analyzed_data["analysis_result"]["affected_areas"]) > 0
    assert len(analyzed_data["analysis_result"]["recommended_actions"]) > 0


def test_analyze_invalid_change_returns_404():
    """Verify analyzing non-existent change returns 404 Not Found."""
    response = client.post("/api/changes/CHG-NONEXISTENT/analyze")
    assert response.status_code == 404
