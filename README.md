# IMPACTLOOP ⚡

> **AI Change-Impact Decision Intelligence Platform**  
> *"See what your change sets in motion — before you ship it."*  
> Built by **Team Shunya Code** for AI Builders Hackathon 2026.

---

## 🎯 The Core Problem

Product, SaaS, and engineering teams ship changes continuously—adjusting pricing tiers, modifying trial durations, updating API contracts, or refactoring core workflows.

However, every change introduces hidden downstream risks:
- Shortening a free trial might boost sales urgency but spike onboarding drop-offs and support ticket queues.
- Deprecating an API field might clean up tech debt but break third-party integration webhooks.
- Teams lack visibility into multi-hop systemic consequences until production metrics crash.

---

## 💡 The ImpactLoop Solution

**ImpactLoop** transforms change management into an interactive **Spatial Decision Observatory**. It traces downstream consequences across systems, surfaces audited evidence and explicit unknowns, and gives human operators an authoritative decision gate before release.

### System Workflow Pipeline

```
PREDICT ──> PROVE ──> DECIDE ──> SHIP ──> OBSERVE ──> LEARN
   │          │          │          │          │          │
   ▼          ▼          ▼          ▼          ▼          ▼
 Map Graph  Audit      Human      Phased    Telemetry   Update Org
 Impact     Evidence   Decision   Release   vs Predict  Memory
```

---

## 🌟 Key Features

1. **Cinematic Hero Landing**: Expressive display typography (`Syne` / `Space Grotesk`) with abstract 3D impact world backdrop.
2. **3D Spatial Decision Observatory**: WebGL scene built with Three.js and React Three Fiber featuring a crystalline Central Change Core (`14 DAYS → 7 DAYS`) and orbiting system nodes.
3. **Animated Causal Replay**: `[ REPLAY IMPACT ]` button animates causal pulse signals traveling through downstream system vector paths.
4. **2D Causal Graph Fallback**: Integrated React Flow canvas (`CausalGraph2D`) with zero-crash WebGL ErrorBoundary.
5. **System Risk Instrument**: Circular spatial risk gauge calculating breadth, severity, and uncertainty scores.
6. **Explicit Uncertainty Engine**: Surfaces unverified assumptions and high-impact unknowns with resolution methods.
7. **Human Decision Gate**: Authoritative human authorization interface (*AI Analyzes • Human Decides*) with release guardrails.
8. **Closed-Loop Post-Ship Learning**: Compares predicted vs observed metric telemetry and updates Organizational Memory.

---

## 🏗️ Technology Stack

### Frontend (`/frontend`)
- **Framework**: React 18 + Vite + TypeScript
- **3D Engine**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **2D Graph Engine**: React Flow (`@xyflow/react`)
- **Styling**: Tailwind CSS + Custom Spatial Glassmorphism Design System
- **Icons**: Lucide React (`lucide-react`)

### Backend (`/backend`)
- **Runtime**: Python 3.12+
- **API Framework**: FastAPI + Uvicorn + Pydantic v2
- **Testing Suite**: Pytest + HTTPX

---

## 🚀 Quickstart & One-Command Launcher

### 1. Launch Both Backend & Frontend (PowerShell)

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-preview.ps1
```

- **Frontend Observatory**: `http://localhost:5173`
- **FastAPI API Engine**: `http://localhost:8000`

### 2. Manual Backend Launch

```bash
cd backend
python -m uvicorn app.main:app --port 8000
```

### 3. Run Unit Tests

```bash
python -m pytest backend/tests
```

### 4. Build Frontend Bundle

```bash
cd frontend
npm run build
```

---

## 📜 Documentation Directory

- [ARCHITECTURE.md](file:///d:/program%20files/IMPACTLOOP/docs/ARCHITECTURE.md)
- [DEMO_SCRIPT.md](file:///d:/program%20files/IMPACTLOOP/docs/DEMO_SCRIPT.md)
- [PRESENTATION_OUTLINE.md](file:///d:/program%20files/IMPACTLOOP/docs/PRESENTATION_OUTLINE.md)
- [SECURITY.md](file:///d:/program%20files/IMPACTLOOP/docs/SECURITY.md)
- [DEPLOYMENT.md](file:///d:/program%20files/IMPACTLOOP/docs/DEPLOYMENT.md)
- [ASSET_SOURCES.md](file:///d:/program%20files/IMPACTLOOP/docs/ASSET_SOURCES.md)
- [aws-architecture.md](file:///d:/program%20files/IMPACTLOOP/infra/aws-architecture.md)

---

## 🏆 Hackathon Team Attribution

**Team**: Shunya Code  
**Submission**: AI Builders Hackathon 2026  
**License**: [MIT License](LICENSE)
