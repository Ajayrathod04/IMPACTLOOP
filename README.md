# ImpactLoop ⚡

> **AI Change-Impact SaaS Platform for SaaS, Product & Engineering Teams.**  
> *Understand what your next change could break before it does.*

---

## 🎯 The Problem

Product and engineering teams in modern SaaS companies ship changes continuously—adjusting pricing tiers, modifying trial durations, updating API contracts, or refactoring core workflows. 

However, every change introduces hidden downstream risks:
- Shortening a trial might boost sales urgency but spike onboarding drop-offs.
- Deprecating an API field might unblock infra cleanup but break 3rd-party integrations.
- Teams lack visibility into multi-hop consequences until production metrics crash.

---

## 💡 The Product Concept

**ImpactLoop** is a decision-intelligence workspace designed for product and engineering leadership to evaluate proposed changes across five core stages:

```
PREDICT ──> PROVE ──> SHIP ──> OBSERVE ──> LEARN
```

1. **PREDICT**: Automatically map downstream consequences across product, engineering, revenue, and customer ops.
2. **PROVE**: Surface underlying evidence and identify critical unknown assumptions.
3. **SHIP**: Empower human operators to approve changes with confidence and actionable risk mitigation guardrails.
4. **OBSERVE**: Track predicted vs actual real-world outcomes post-deployment.
5. **LEARN**: Feed delta analysis into Organization Memory to continuously refine future predictions.

---

## 🏗️ Architecture & Technology Stack

### Frontend (`/frontend`)
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS (Dark SaaS Design System)
- **Graph Visualizer**: React Flow (`@xyflow/react`)
- **Icons**: Lucide React (`lucide-react`)
- **Utilities**: `clsx`, `tailwind-merge`

### Backend (`/backend`)
- **Runtime**: Python 3.12+ (managed with `uv`)
- **API Framework**: FastAPI + Uvicorn
- **Data Validation**: Pydantic v2
- **Testing Suite**: Pytest + HTTPX

---

## ⚡ Step 1 Scope & Features

- [x] Production-grade monorepo layout (`frontend/`, `backend/`, `docs/`, `demo/`).
- [x] FastAPI application with CORS middleware enabled for local Vite development.
- [x] Health telemetry endpoint: `GET /api/health`.
- [x] Pytest suite covering backend routes (`backend/tests/test_health.py`).
- [x] Typed domain models for `Change`, `ImpactNode`, `Evidence`, `Risk`, `Action`, `Scenario`, `Outcome`.
- [x] Modern dark-theme application shell with Sidebar, Header, Metric Cards, and Change Cards.
- [x] Interactive change submit modal ("Analyze Proposed Change").
- [x] First demonstration change card: `"Free Trial: 14 days → 7 days"`.
- [x] Initial React Flow graph network visualization foundation for Step 3 readiness.

---

## 🚀 Local Setup & Quickstart

### Prerequisites
- Node.js (v18+) & npm
- Python (3.12+) & `uv` (or standard `pip`)

### 1. Run Backend Server
```bash
cd backend
python -m pip install -e .[dev]
# or: uv pip install -e .[dev]

# Start FastAPI server
python -m uvicorn app.main:app --reload --port 8000
```
- API Endpoint: `http://localhost:8000`
- Swagger Docs: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/api/health`

#### Run Backend Tests
```bash
python -m pytest backend/tests
```

---

## 2. Run Frontend Application
```bash
cd frontend
npm install

# Start Vite dev server
npm run dev
```
- Local URL: `http://localhost:5173`

#### Build Frontend
```bash
cd frontend
npm run build
```

---

## 🛣️ 5-Step Roadmap

- **Step 1 (Current)**: Monorepo Foundation, FastAPI Backend, React/TS Shell & Domain Models.
- **Step 2**: Strands / Bedrock AI Agent Layer integration for automatic change extraction.
- **Step 3**: Consequence Graph Engine & Interactive React Flow Network Inspector.
- **Step 4**: Evidence, Unknowns, and Action Recommendation Engine.
- **Step 5**: Observe & Learn Loop (Predicted vs. Actual metrics & Organization Memory).

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
