# ImpactLoop System Architecture

ImpactLoop is an AI change-impact SaaS platform that helps product, SaaS, and engineering teams predict downstream consequences before shipping changes.

## System Workflow Loop

```
PREDICT ──> PROVE ──> SHIP ──> OBSERVE ──> LEARN
   │          │          │          │          │
   ▼          ▼          ▼          ▼          ▼
 Map Graph  Surface    Approve   Track vs   Update Org
 Impact     Evidence   Change    Actual     Memory
```

## Step 1 System Components

### 1. Frontend (React + Vite + TypeScript + Tailwind CSS)
- **Application Shell**: Modern dark-theme decision intelligence workspace.
- **Components**: Sidebar, Header, MetricCard, ChangeCard, EmptyState, Badge, Button, AnalyzeModal.
- **Graph Visualizer**: `@xyflow/react` integration point for graph networks.

### 2. Backend (Python 3.12 + FastAPI + Pydantic)
- **API Server**: FastAPI with CORS configuration for local Vite development (`http://localhost:5173`).
- **Health Check**: `GET /api/health` providing service operational telemetry.
- **Domain Models**: Typed Pydantic models for `Change`, `ImpactNode`, `Evidence`, `Risk`, `Action`, `Scenario`, `Outcome`.

### 3. Future Step 2–5 Extension Hooks
- `app/agents/`: Bedrock / Strands AI agent orchestration.
- `app/graph/`: Consequence graph network evaluation algorithms.
- `app/services/`: Persistence, learning loop, and organization memory engines.
