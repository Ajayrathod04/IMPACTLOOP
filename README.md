# IMPACTLOOP ⚡

> **AI Change-Impact Decision Intelligence Platform**  
> *"See what your change sets in motion — before you ship it."*  
> Built by **Team Shunya Code** for AI Builders Hackathon 2026.

---

## 1. What ImpactLoop Is

**ImpactLoop** is an AI Change-Impact Decision Intelligence platform designed for product, growth, and engineering leadership. It transforms traditional change management into an interactive **Spatial Decision Observatory** that predicts downstream consequences across systems, surfaces audited evidence and explicit unknowns, and provides an authoritative human decision gate before release.

---

## 2. The Core Problem

Product, SaaS, and engineering teams ship changes continuously—adjusting pricing tiers, modifying trial durations, updating API contracts, or refactoring core workflows.

However, every change introduces hidden downstream risks:
- Shortening a free trial might boost sales urgency but spike onboarding drop-offs and support ticket queues (+34%).
- Deprecating an API field might clean up tech debt but break third-party integration webhooks.
- Teams lack visibility into multi-hop systemic consequences until production metrics crash post-release.

---

## 3. How the Product Works

ImpactLoop maps proposed changes into a spatial 3D/2D consequence graph. It evaluates systemic risk factors (breadth, severity, uncertainty), links verified telemetry and dependency evidence, highlights explicit unknowns with resolution methods, and enforces human authorization before shipping.

### 4. Core Workflow Pipeline

```
PREDICT ──> PROVE ──> DECIDE ──> SHIP ──> OBSERVE ──> LEARN
   │          │          │          │          │          │
   ▼          ▼          ▼          ▼          ▼          ▼
 Map Graph  Audit      Human      Phased    Telemetry   Update Org
 Impact     Evidence   Decision   Release   vs Predict  Memory
```

1. **PREDICT**: Automatically map downstream consequence graphs across product, engineering, revenue, and support.
2. **PROVE**: Audit underlying telemetry evidence and surface unverified assumptions as explicit unknowns.
3. **DECIDE**: Authoritative Human Decision Gate (*AI Analyzes • Human Decides*) with release guardrails.
4. **SHIP**: Phased rollout strategy (25% → 50% → 100%) with automated guardrails enabled.
5. **OBSERVE**: Track predicted vs. observed real-world telemetry post-ship (e.g. activation delta).
6. **LEARN**: Feed outcome variance into Organizational Memory to continuously refine future model rules.

---

## 5. AI & Decision Engine Architecture

ImpactLoop utilizes an evidence-driven decision intelligence pipeline:
- **Causal Graph Engine**: Calculates depth, domain relationships, and severity scores across downstream systems.
- **Risk Instrument Engine**: Computes overall risk scores (0–100) based on downstream breadth, depth, severity index, uncertainty, and evidence strength.
- **Explicit Uncertainty Engine**: Surfacing unverified assumptions (e.g., impact on annual plan conversion) and pairing them with explicit pre-ship resolution methods.
- **Closed-Loop Memory Engine**: Adjusts model confidence scores post-ship based on observed vs. predicted variance.

---

## 6. Frontend & Backend Architecture

### Frontend (`/frontend`)
- **Framework**: React 18 + Vite + TypeScript
- **3D Spatial Engine**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **2D Causal Graph Engine**: React Flow (`@xyflow/react`)
- **Design System**: Friendly Premium Tech design system with custom CSS glassmorphism
- **Icons**: Lucide React (`lucide-react`)

### Backend (`/backend`)
- **Runtime**: Python 3.12+
- **Framework**: FastAPI + Uvicorn + Pydantic v2
- **Test Suite**: Pytest + HTTPX

---

## 7. How to Run Locally

### 1. Launch Both Backend & Frontend (One-Command PowerShell)

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-preview.ps1
```

- **Frontend Observatory**: `http://localhost:5173`
- **FastAPI Engine**: `http://localhost:8000`

### 2. Manual Backend Launch

```bash
cd backend
python -m uvicorn app.main:app --port 8000
```

### 3. Run Backend Unit Tests

```bash
python -m pytest backend/tests
```

### 4. Build Frontend Production Bundle

```bash
cd frontend
npm run build
```

---

## 8. Canonical Demo Scenario

The pre-seeded canonical demonstration change scenario is:
`FREE TRIAL: 14 DAYS → 7 DAYS`

- **Proposed State**: Reduce trial length from 14 days to 7 days to accelerate conversion velocity.
- **Affected Systems**: Signup, Onboarding, Activation, Support Queue, Billing & Stripe Webhooks, Revenue & ARR, Customer Success.
- **Surfaced Unknown**: Long-term annual plan conversion rate response.
- **Human Decision Gate**: Approved for 25% cohort rollout with automated 3-day extension guardrail active.

---

## 9. Known Limitations & Fallback Strategy

- **Guest Demo Mode**: Default experience (`OPEN → EXPLORE DEMO`) requires no signup or credentials for hackathon evaluation.
- **Deterministic Local Demo Fallback**: If the FastAPI backend is offline, the frontend seamlessly uses local deterministic intelligence snapshots to prevent blank screens or dead routes.
- **Optional Auth Hooks**: AWS Cognito hooks (`CognitoAuth.tsx`) require valid `.env` keys for multi-tenant production hosting.

---

## 10. Team Attribution

**Team**: Shunya Code  
**Submission**: AI Builders Hackathon 2026  
**License**: [MIT License](LICENSE)
