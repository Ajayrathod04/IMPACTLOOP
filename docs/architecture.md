# ImpactLoop System Architecture

ImpactLoop is an AI Change-Impact Decision Intelligence platform designed to help product, growth, and engineering teams predict downstream consequences before shipping changes.

## System Intelligence Flow

```
   User Change Proposal
           │
           ▼
    ImpactLoop UI (Spatial Observatory & 2D Causal Graph)
           │
           ▼
    FastAPI Backend Engine (/api/*)
           │
           ├── Analysis & Risk Engine (Systemic Risk Instrument)
           ├── Downstream Consequence Graph Mapping (depth, severity, provenance)
           ├── Evidence Vault (Telemetry, AST Dependencies, Historical Experiments)
           └── Explicit Uncertainty Engine (surfacing unverified assumptions)
           │
           ▼
    Human Decision Gate (Approve / Review / Hold with guardrails)
           │
           ▼
    Observed Post-Ship Outcomes (Predicted vs Actual telemetry delta)
           │
           ▼
    Organizational Memory (Closed-loop model updates & reusable rules)
```

## Experience Architecture

1. **Landing Experience (`LandingExperience.tsx`)**:
   - Cinematic full-screen entry with 3D abstract "impact world" background.
   - Core value proposition: *"See what your change sets in motion — before you ship it."*
   - Immediate entry to canonical demo (`FREE TRIAL: 14 DAYS → 7 DAYS`) or intake modal.

2. **Spatial Decision Observatory (`ImpactObservatory.tsx`)**:
   - Hybrid 3D/2D spatial canvas.
   - **3D Mode (`ObservatoryScene.tsx`)**: Three.js / React Three Fiber central crystalline change core, orbiting particle field, floating system nodes (SIGNUP, ONBOARDING, ACTIVATION, SUPPORT, REVENUE, BILLING, CUSTOMER SUCCESS), and 3D causal vector links with animated pulse propagation (`ImpactReplay`).
   - **2D Mode (`CausalGraph2D.tsx`)**: React Flow fallback canvas ensuring zero-crash WebGL resilience.

3. **Command & Spatial Control HUD (`CommandHUD.tsx`, `SpatialControls.tsx`)**:
   - Floating non-traditional interface controls.
   - `REPLAY IMPACT`, `2D / 3D` toggle, `FIT VIEW`, and contextual intelligence surface triggers.

4. **Interactive Lifecycle Rail (`LifecycleRail.tsx`)**:
   - Visual stage strip: `PREDICT → PROVE → DECIDE → SHIP → OBSERVE → LEARN`.

5. **Contextual Intelligence Surfaces**:
   - `ImpactInspector`: System node breakdown, why affected, predicted consequence, verified evidence.
   - `EvidencePanel`: Audited evidence records (source type, confidence score, node mapping).
   - `UnknownsPanel`: Explicit unknowns and resolution methods.
   - `ScenarioPanel`: Predictive scenario lab (Conservative, Expected, Adverse).
   - `RiskInstrument`: Circular spatial risk gauge (0–100 score, breadth, severity, uncertainty).
   - `DecisionGate`: Authoritative human decision gate with release guardrail checklist.
   - `OutcomePanel`: Closed-loop telemetry validation (Predicted vs Observed vs Delta).
   - `MemoryPanel`: Organizational decision memory vault and systemic learning records.

## Resilience & Fallback Strategy

- **Deterministic Demo Data (`demo.ts`)**: Ensures that whether the backend FastAPI server is online or offline, the entire canonical demo functions seamlessly without blank screens, loading dead-ends, or crashes.
