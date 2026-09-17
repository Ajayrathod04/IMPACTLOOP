# IMPACTLOOP — Project README / Hackathon Handoff

Project
Name: ImpactLoop
Tagline: AI Change-Impact Decision Intelligence
Core message: See what your change sets in motion.

ImpactLoop is a decision-intelligence product for consequential SaaS, product, and engineering changes. It traces downstream consequences, makes evidence and uncertainty inspectable, supports scenario analysis, keeps the final release decision human-controlled, and closes the loop by comparing outcomes and storing organizational memory.

IMPORTANT CURRENT DEPLOYMENT STATUS
Verified working public UI:
[https://frontend-orpin-one-42.vercel.app/](https://frontend-orpin-one-42.vercel.app/)

Also deployed:
[https://frontend-raog0z1qa-ajayrofficiall-3809s-projects.vercel.app/](https://frontend-raog0z1qa-ajayrofficiall-3809s-projects.vercel.app/)

The root/API deployment:
[https://impactloop-eight.vercel.app/](https://impactloop-eight.vercel.app/)
currently responds at its root with {"detail":"Not Found"} rather than the ImpactLoop UI. Do NOT use this URL as the primary demo UI unless it is separately fixed.

The final public UI used for the demo/submission should therefore be:
[https://frontend-orpin-one-42.vercel.app/](https://frontend-orpin-one-42.vercel.app/)

GitHub:
The repository URL was not available/verified from the project source material available while preparing this document. Do not invent a GitHub URL. Add the actual public repository URL here if required:
[PASTE VERIFIED GITHUB REPOSITORY URL HERE]

## 1. Problem Statement
A small product or engineering change can create a large decision surface.

A change rarely stops at the team that owns it. Its consequences can spread across revenue, support, onboarding, billing, customer success, operations, and other connected systems.

The core problems are:
## 1. Hidden Dependencies — Downstream Impact Is Distributed Across Systems.
## 2. Fragmented Evidence — Decision-Makers Need Provenance, Confidence, And Context.
## 3. Unknowns — Unverified Assumptions Should Be Visible Before Release.
## 4. Lost Learning — Post-Ship Outcomes Should Feed The Next Decision.

Example change used in the demo:
"Change free trial from 14 days to 7 days."

## 2. Solution
ImpactLoop turns a change request into a traceable decision loop.

It provides:
- Downstream impact mapping
- Interactive impact/dependency graph
- Evidence with provenance and confidence
- Explicit unknowns and validation paths
- Expected/adverse scenario views
- Human decision gate and release guardrails
- Ship/observe/learn workflow
- Organizational memory
- Repeatable change intake

Core principle:
AI analyzes -> humans decide -> outcomes become organizational memory.

## 3. Product Workflow
PREDICT -> PROVE -> STRESS-TEST -> DECIDE -> SHIP -> OBSERVE -> LEARN

Detailed flow:
CHANGE INPUT
    |
    v
IMPACT GRAPH
    |
    v
EVIDENCE + UNKNOWNS
    |
    v
SCENARIOS
    |
    v
HUMAN DECISION GATE
    |
    v
SHIP + TELEMETRY
    |
    v
ORGANIZATIONAL MEMORY
    |
    +----> informs future decisions

## 4. What The Ui Shows
Landing / Impact Observatory:
- ImpactLoop identity
- "See what your change sets in motion."
- Decision-intelligence positioning
- Interactive spatial impact visualization

Impact graph:
- Change core
- Connected downstream systems
- Severity/risk signals
- Relationship/propagation view
- Example: 14 days -> 7 days
- Affected areas include revenue, support, onboarding, billing, and success

Evidence:
- Verified source records
- Confidence signals
- Provenance
- Affected node/context
- The reasoning behind a decision is inspectable rather than appearing as an unexplained score

Unknowns:
- Unverified assumptions are explicitly visible
- Unknowns have a validation/resolution path
- Known vs unknown information is separated

Scenarios:
- Expected scenario
- Adverse scenario
- Stress-testing of assumptions
- Scenario results feed the human decision gate

Human decision:
- Risk breadth, severity, and uncertainty are visible together
- Guardrails can be used as release conditions
- The final decision remains human-controlled

Close the loop:
- Ship the approved change
- Observe predicted vs actual outcomes/telemetry
- Learn from outcomes
- Store reusable organizational memory

Repeatability:
- New change intake captures the baseline, proposed state, target metric, and owner
- The same decision loop can be reused for another change

## 5. Demo Example
Change:
Free trial duration: 14 days -> 7 days

ImpactLoop demonstrates:
- What downstream systems may be affected
- Which areas have stronger risk signals
- What evidence supports the analysis
- What remains uncertain
- How expected and adverse scenarios differ
- What guardrails should be considered
- Where a human makes the release decision
- How post-release outcomes can become organizational memory

## 6. Output / Outcome
Primary output:
A traceable change-impact decision record rather than a single opaque AI answer.

The output exposes:
- Change being evaluated
- Impact/dependency graph
- Affected systems
- Evidence
- Confidence
- Provenance
- Unknowns
- Scenario outcomes
- Risk/guardrail information
- Human decision point
- Release/observation/learning path

Expected product outcome:
A team can understand the decision surface of a consequential change before shipping, see the basis and uncertainty behind the analysis, make the release decision deliberately, and reuse the resulting knowledge later.

## 7. Advantages
Compared with a normal ticket/dashboard workflow, ImpactLoop is designed to:
- Make downstream impact visible instead of isolated
- Make evidence inspectable instead of opaque
- Treat uncertainty as a first-class object
- Connect analysis to an explicit human release gate
- Connect release to observation and learning
- Preserve organizational memory
- Present the workflow spatially through an interactive impact graph
- Keep the product focused on decisions, not just analytics

## 8. Architecture
Current intended architecture:

    +-----------------------------+
    |       IMPACTLOOP UI         |
    | React + TypeScript + Vite   |
    | Tailwind + React Flow       |
    | Lucide React                |
    +-------------+---------------+
    |
    | /api/*
    v
    +-----------------------------+
    |          FASTAPI            |
    | Python 3.12 + Pydantic      |
    | API / domain services       |
    +-------------+---------------+
    |
    v
    +-----------------------------+
    |   DETERMINISTIC ANALYSIS    |
    | change / graph / evidence   |
    | scenarios / decision flow   |
    +-------------+---------------+
    |
    v
    +-----------------------------+
    | FUTURE AGENT LAYER          |
    | Strands / Bedrock direction |
    +-----------------------------+

Visual layer:
Interactive spatial/WebGL-style visualization and React Flow consequence mapping.

Architecture principle:
Frontend -> FastAPI -> analysis/domain layer -> future agent layer.

The project source specifically preserves:
- React + TypeScript architecture
- FastAPI backend
- Pydantic models
- Deterministic analysis engine
- React Flow as a central impact-graph component

## 9. Technology Stack
Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Flow
- Lucide React

Backend:
- Python 3.12
- FastAPI
- Pydantic
- uv

Development / verification:
- npm
- Vite production build
- pytest
- PowerShell / Windows
- Ubuntu 26.04 LTS via WSL2 was used during development/testing

Deployment:
- Vercel
- Vercel CLI

## 10. Verified Development Results
Backend tests:
python -m pytest backend/tests
Result: 7 passed

Frontend production build:
npm run build
Result: successful, 0 TypeScript/build errors
Recorded build: 45 modules transformed, built successfully.

API verification performed during local development:
GET /api/health -> HTTP 200 OK
GET /api/changes -> verified
GET /api/changes/{id} -> verified
POST /api/changes -> verified
POST /api/changes/{id}/analyze -> verified

Local integrated preview:
http://localhost:5173/

Local backend:
http://127.0.0.1:8000

Local API proxy:
Frontend /api/* -> http://127.0.0.1:8000

## 11. Production Deployment Notes
Successful Vercel CLI authentication was established.

Successful command used for a forced production deployment:
vercel --prod --yes --force

A direct frontend deployment was also created from:
frontend/

The working public frontend URL currently verified visually:
[https://frontend-orpin-one-42.vercel.app/](https://frontend-orpin-one-42.vercel.app/)

Another Vercel frontend deployment:
[https://frontend-raog0z1qa-ajayrofficiall-3809s-projects.vercel.app/](https://frontend-raog0z1qa-ajayrofficiall-3809s-projects.vercel.app/)

The root deployment:
[https://impactloop-eight.vercel.app/](https://impactloop-eight.vercel.app/)
is not currently the correct public UI endpoint because its root returned:
{"detail":"Not Found"}

Do not describe the root endpoint as the working frontend unless it is fixed and re-verified.

## 12. Important Deployment Configuration Note
The repository previously used a root Vercel configuration intended to:
- build frontend with npm --prefix frontend run build
- serve frontend/dist
- route /api/* to api/index.py

The API entrypoint was:
from backend.app.main import app

The project also contains:
api/requirements.txt

Dependencies recorded:
fastapi==0.110.0
pydantic==2.6.4
starlette==0.36.3
typing_extensions==4.10.0
httpx==0.27.0
anyio==4.3.0
aiofiles==23.2.1

## 13. Recommended Local Commands
From repository root:

Start frontend:
cd "D:\program files\IMPACTLOOP\frontend"
npm run dev

Frontend local URL:
http://localhost:5173/

Backend (when required):
python -m uvicorn app.main:app --reload --port 8000

Backend tests:
python -m pytest backend/tests

Frontend production build:
cd frontend
npm run build

Vercel production deployment:
cd "D:\program files\IMPACTLOOP"
vercel --prod --yes --force

Vercel authentication check:
vercel whoami

Vercel production logs:
vercel logs https://impactloop-aa2d.vercel.app --since 2h

## 14. Hackathon Demo Story
Opening:
"ImpactLoop is AI change-impact decision intelligence. It helps teams see what a change sets in motion before they ship it."

Problem:
"A small change can create a large decision surface. Dependencies are hidden, evidence is fragmented, unknowns are easy to miss, and learning gets lost after release."

Solution:
"ImpactLoop turns one change into a traceable decision loop: predict, prove, stress-test, decide, ship, observe, and learn."

Demo sequence:
## 1. Landing — Establish The Problem.
## 2. Impact Graph — Show Downstream Systems And Severity.
## 3. Evidence — Show Verified Sources, Confidence, And Provenance.
## 4. Unknowns — Show What Is Not Yet Verified.
## 5. Scenarios — Compare Expected And Adverse Outcomes.
## 6. Human Decision Gate — Show Risk And Guardrails.
## 7. Close Loop — Show Ship, Observe, And Learn.
## 8. Repeat — Enter Another Change.

Core closing line:
"AI analyzes. Humans decide. Outcomes become organizational memory."

## 15. Video / Youtube
Recommended YouTube title:
ImpactLoop — AI Change-Impact Decision Intelligence | Hackathon Demo

Alternative:
ImpactLoop | See What Your Change Sets in Motion | Hackathon Demo

Recommended filename:
ImpactLoop_AI_Change_Impact_Decision_Intelligence_Hackathon_Demo.mp4

Suggested YouTube description:
ImpactLoop is an AI change-impact decision intelligence product that traces downstream consequences, makes evidence and uncertainty inspectable, supports scenario stress-testing, keeps the final release decision human-controlled, and closes the loop through observation and organizational memory.

Live demo:
[https://frontend-orpin-one-42.vercel.app/](https://frontend-orpin-one-42.vercel.app/)

## 16. Google Vids Voiceover Speed Note
Google Vids currently does not provide a normal numeric playback-speed control for an already generated AI voiceover.

For AI voiceovers, Google documents an audio-tag workflow:
- Open Voiceover.
- Edit the scene script.
- Type "[" to open the audio-tag/modifier menu.
- Choose the pace modifier available in the menu.
- Regenerate/replace the voiceover.

If the generated voiceover is already too fast, the practical workaround is to regenerate with a slower pace modifier and add punctuation/pauses where needed.

Important:
The Vids teleprompter "Speed" slider controls how the script scrolls while recording; it is not the same thing as changing the generated AI voiceover's speech rate.

## 17. What Not To Claim
Do not claim:
- A fully autonomous AI agent is already deployed if it is not.
- The root Vercel URL is the working UI when it returns Not Found.
- A specific GitHub repository URL unless verified.
- Production backend/API integration is live unless the endpoint has been re-tested.
- Predictions are real-world guarantees.
- ImpactLoop replaces human release accountability.

Use accurate language:
- "decision intelligence"
- "impact analysis"
- "evidence and uncertainty"
- "scenario stress-testing"
- "human decision gate"
- "closed-loop learning"
- "deterministic analysis engine" where applicable
- "future agent layer" for planned Strands/Bedrock integration

## 18. Judge-Facing Value
ImpactLoop is positioned around a simple question:

"What happens if we make this change?"

Instead of returning only an AI answer, the product makes the decision surface visible:
CHANGE -> CONSEQUENCES -> EVIDENCE -> UNKNOWNS -> SCENARIOS -> HUMAN DECISION -> OUTCOME -> MEMORY

The strongest differentiators demonstrated by the product are:
- consequence mapping
- inspectable evidence
- explicit uncertainty
- scenario comparison
- human-controlled release gate
- closed-loop organizational learning
- spatial/interactive presentation

## 19. Links
PRIMARY LIVE DEMO:
[https://frontend-orpin-one-42.vercel.app/](https://frontend-orpin-one-42.vercel.app/)

SECONDARY FRONTEND DEPLOYMENT:
[https://frontend-raog0z1qa-ajayrofficiall-3809s-projects.vercel.app/](https://frontend-raog0z1qa-ajayrofficiall-3809s-projects.vercel.app/)

ROOT VERCEL DEPLOYMENT (CURRENTLY NOT THE UI):
[https://impactloop-eight.vercel.app/](https://impactloop-eight.vercel.app/)

GITHUB:
[[ADD VERIFIED PUBLIC GITHUB URL]](https://github.com/Ajayrathod04/IMPACTLOOP/)

LOCAL:
http://localhost:5173/
http://127.0.0.1:8000/

## 20. Final One-Line Description
ImpactLoop is an AI change-impact decision intelligence system that maps downstream consequences, proves the basis with evidence, surfaces uncertainty, stress-tests scenarios, keeps release decisions human-controlled, and learns from outcomes.
