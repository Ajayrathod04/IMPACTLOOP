# 🔁 ImpactLoop — AI Change-Impact Decision Intelligence

> **See what your change sets in motion.**
>
> ImpactLoop is a decision-intelligence prototype for SaaS, product, and engineering teams. It helps a team understand the downstream consequences of a proposed change before shipping, connect those consequences to evidence, make uncertainty explicit, and place a human decision gate before release.

---

## 🚀 Live Project

| Resource | Link |
|---|---|
| 🌐 **Live frontend / demo** | https://frontend-orpin-one-42.vercel.app/ |
| 🌐 **Additional Vercel deployment** | https://frontend-raog0z1qa-ajayrofficiall-3809s-projects.vercel.app/ |
| 🔗 **Project repository** | https://github.com/Ajayrathod04/IMPACTLOOP |
| 🏠 **Root Vercel deployment** | https://impactloop-eight.vercel.app/ |

> **Recommended demo URL:** `https://frontend-orpin-one-42.vercel.app/`
>
> The root Vercel deployment is the backend/API-oriented deployment and may show `{"detail":"Not Found"}` at `/` when opened directly. Use the frontend URL for the product demonstration.

---

## 🎯 Problem

Modern SaaS changes rarely affect only the screen or service being edited.

A seemingly small change can propagate through:

- product workflows
- APIs and services
- data dependencies
- customer-facing surfaces
- operational processes
- release timelines
- downstream systems

The difficult question is not simply:

> **"Can we make this change?"**

It is:

> **"What else will this change affect, what evidence supports that conclusion, what remains unknown, and should we ship it?"**

Traditional change reviews often depend on scattered documentation, manual dependency tracing, and individual memory. This creates blind spots and makes important decisions difficult to reproduce.

---

## 💡 Solution

**ImpactLoop turns a proposed change into an observable decision workflow.**

The system is designed around five ideas:

1. 🔎 **Map impact** — identify downstream systems and surfaces affected by a proposed change.
2. 🕸️ **Visualize propagation** — show relationships as an impact graph instead of a flat checklist.
3. 📚 **Ground decisions in evidence** — connect conclusions to verified evidence and make unknowns explicit.
4. 🧑‍⚖️ **Keep humans in control** — present a clear decision gate before release.
5. 🔄 **Learn from outcomes** — preserve the decision/evidence trail so future changes can be reviewed with organizational context.

---

# 🧭 Product Flow

```text
┌──────────────────────┐
│  1. PROPOSE CHANGE   │
│  What is changing?   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  2. MAP IMPACT       │
│  Find downstream     │
│  systems & surfaces  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  3. REPLAY IMPACT    │
│  Explore propagation │
│  through the graph   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  4. VERIFY EVIDENCE  │
│  Evidence + unknowns │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  5. DECISION GATE    │
│ Approve / Review /   │
│ Hold                 │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  6. SHIP & OBSERVE   │
│  Record outcome and  │
│  learn for next time │
└──────────────────────┘
```

---

# 🏗️ Architecture

ImpactLoop is structured as a web application with a React/Vite frontend and a Python/FastAPI backend.

```text
                         ┌─────────────────────────┐
                         │        USER             │
                         │ Product / Eng / SaaS    │
                         └────────────┬────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │       React + Vite Frontend     │
                    │                                 │
                    │  • Impact visualization         │
                    │  • Change analysis UI           │
                    │  • Evidence / decision UI       │
                    │  • Demo workflow                 │
                    └───────────────┬─────────────────┘
                                    │ HTTP / API
                                    ▼
                    ┌─────────────────────────────────┐
                    │        FastAPI Backend           │
                    │                                 │
                    │  • API endpoints                 │
                    │  • Change-impact logic           │
                    │  • Decision workflow             │
                    │  • Evidence / result models      │
                    └───────────────┬─────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │       Impact Intelligence        │
                    │                                 │
                    │  Change → Relationships →       │
                    │  Impact → Evidence → Decision   │
                    └─────────────────────────────────┘
```

### Repository structure

```text
IMPACTLOOP/
├── api/                    # Vercel API entrypoint
├── backend/                # FastAPI backend
│   └── app/
├── frontend/               # React + Vite application
├── demo/                   # Demo material / product walkthrough
├── docs/                   # Documentation
├── infra/                  # Infrastructure / deployment material
├── submission/
│   └── screenshots/        # Competition screenshots
├── package.json
├── pyproject.toml
├── requirements.txt
├── runtime.txt
├── vercel.json
└── README.md
```

---

# 🖥️ What the UI Shows

## 1. Landing / Product Positioning

The landing screen introduces ImpactLoop as an **AI Change-Impact Decision Intelligence** system.

The primary message is:

> **SEE WHAT YOUR CHANGE SETS IN MOTION.**

The visual centerpiece represents the change-impact graph and downstream propagation.

The user can enter the product through:

- **Explore the Impact**
- **Analyze a Change**

---

## 2. Spatial Impact Graph

The impact graph turns a proposed change into a visual network.

It communicates:

```text
Change
  │
  ├──► System A
  │      ├──► Surface A1
  │      └──► Surface A2
  │
  ├──► System B
  │
  └──► System C
          └──► Customer-facing surface
```

Instead of reading a long dependency list, a reviewer can visually understand how the change propagates.

---

## 3. Impact Replay

The replay view makes propagation observable.

The graph animation demonstrates that a change is not an isolated edit — it can travel through connected systems and surfaces.

This makes the concept easier to inspect during a decision review.

---

## 4. Predict → Prove → Decide

ImpactLoop separates three important stages:

```text
PREDICT
   ↓
What could be affected?

PROVE
   ↓
What evidence supports the impact?

DECIDE
   ↓
What should the team do before release?
```

The decision stage keeps a human in control instead of treating an automated prediction as an unquestionable release decision.

---

## 5. Decision Gate

The workflow presents explicit actions such as:

```text
┌──────────────┐
│   APPROVE    │
└──────────────┘

┌──────────────┐
│    REVIEW    │
└──────────────┘

┌──────────────┐
│     HOLD     │
└──────────────┘
```

This makes the product useful as a release-review mechanism rather than only as an analytics screen.

---

## 6. Evidence → Organizational Memory

A decision should not disappear after the release.

ImpactLoop's concept is to preserve:

```text
Evidence
   ↓
Decision
   ↓
Release
   ↓
Observed outcome
   ↓
Organizational memory
   ↓
Better future decisions
```

This creates the **ImpactLoop**: decisions become reusable context instead of isolated one-time reviews.

---

# 📊 Example Outcome

For a change such as:

```text
Change:
14-day trial → 7-day trial
```

ImpactLoop can present the change as an impact-analysis problem rather than simply a UI edit.

The reviewer can inspect:

```text
Trial policy change
        │
        ├──► Signup / onboarding
        ├──► Billing / conversion logic
        ├──► Product messaging
        ├──► Customer lifecycle
        └──► Analytics / reporting
```

The important outcome is a **structured decision view**:

```text
PROPOSED CHANGE
      ↓
DOWNSTREAM IMPACTS
      ↓
EVIDENCE + UNKNOWNS
      ↓
HUMAN DECISION
      ↓
RELEASE
      ↓
LEARN
```

---

# ✨ Key Advantages

### 🔎 Impact visibility
Makes downstream consequences easier to see before release.

### 🧠 Decision intelligence
Moves the workflow beyond simple dependency visualization toward an explicit decision process.

### 📚 Evidence-aware
Separates supported conclusions from areas where information is still unknown.

### 🧑‍⚖️ Human-in-the-loop
The system supports the decision; the human remains the final decision-maker.

### 🔄 Continuous learning
Decisions and outcomes can become organizational memory for future changes.

### 🕸️ Visual reasoning
A graph and replay model make complex propagation easier to understand than a flat list.

### ⚡ Faster change review
A structured workflow can reduce the manual effort required to reason through a change.

---

# 🛠️ Technology Stack

| Layer | Technology | Role |
|---|---|---|
| 🎨 Frontend | React | Product UI |
| ⚡ Build tool | Vite | Frontend development/build |
| 🎨 Styling | Tailwind CSS | UI styling |
| 🐍 Backend | Python | Application/backend logic |
| 🚀 API | FastAPI | HTTP API |
| 📋 Validation | Pydantic | Data/request models |
| ☁️ Deployment | Vercel | Web deployment |
| 🔀 Source control | Git + GitHub | Version control |
| 🧪 Testing | Pytest | Backend validation |

---

# 🔧 Development Setup

## Prerequisites

```bash
Node.js
npm
Python 3.12+
Git
```

## Clone

```bash
git clone https://github.com/Ajayrathod04/IMPACTLOOP.git
cd IMPACTLOOP
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will provide the local frontend URL.

## Backend

From the repository root:

```bash
python -m venv .venv
```

### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn backend.app.main:app --reload
```

### Linux / WSL

```bash
source .venv/bin/activate
pip install -r requirements.txt
uvicorn backend.app.main:app --reload
```

---

# 🧪 Testing

Run backend tests with:

```bash
pytest
```

For the frontend:

```bash
cd frontend
npm run build
```

A successful production build should generate:

```text
frontend/dist/
```

---

# ☁️ Deployment

## Frontend deployment

From the repository root:

```powershell
vercel frontend --prod --yes --force
```

## Root deployment

```powershell
vercel --prod --yes --force
```

> The frontend deployment is the URL intended for judges/users to open the ImpactLoop interface.

---

# 🔗 Public Links

### 🌐 Live Demo

https://frontend-orpin-one-42.vercel.app/

### 🌐 Alternate Frontend Deployment

https://frontend-raog0z1qa-ajayrofficiall-3809s-projects.vercel.app/

### 💻 GitHub

https://github.com/Ajayrathod04/IMPACTLOOP

### ☁️ Root Vercel Deployment

https://impactloop-eight.vercel.app/

---

# 🎥 Competition Demo Flow

A concise judge-facing walkthrough:

```text
01  LANDING
    ↓
02  SHOW IMPACT GRAPH
    ↓
03  REPLAY PROPAGATION
    ↓
04  PREDICT → PROVE → DECIDE
    ↓
05  APPROVE / REVIEW / HOLD
    ↓
06  EVIDENCE → ORGANIZATIONAL MEMORY
    ↓
07  ANALYZE A NEW CHANGE
```

### Recommended example

Use:

```text
14-day trial → 7-day trial
```

Then show how the change is analyzed across downstream systems and surfaces.

---

# 🧩 Core Product Concept

ImpactLoop is built around a simple principle:

> **A change is not complete when it is implemented. It is complete when its consequences are understood, its evidence is visible, the decision is explicit, and the outcome can be learned from.**

The product therefore closes the loop:

```text
┌────────────┐
│   CHANGE   │
└─────┬──────┘
      ↓
┌────────────┐
│   IMPACT   │
└─────┬──────┘
      ↓
┌────────────┐
│  EVIDENCE  │
└─────┬──────┘
      ↓
┌────────────┐
│  DECISION  │
└─────┬──────┘
      ↓
┌────────────┐
│   SHIP     │
└─────┬──────┘
      ↓
┌────────────┐
│  OUTCOME   │
└─────┬──────┘
      │
      └──────────────► ORGANIZATIONAL MEMORY
                              │
                              └──► future decisions
```

---

# 📁 Project Documentation

Relevant repository areas:

```text
docs/
demo/
submission/screenshots/
frontend/
backend/
api/
infra/
```

---

# 🏆 What Was Built

ImpactLoop delivers a competition-ready prototype demonstrating:

- ✅ AI change-impact decision intelligence concept
- ✅ Interactive product landing experience
- ✅ Spatial impact visualization
- ✅ Impact replay concept
- ✅ Predict → Prove → Decide workflow
- ✅ Evidence-aware decision framing
- ✅ Human decision gate
- ✅ Organizational-memory concept
- ✅ Change-analysis workflow
- ✅ React/Vite frontend
- ✅ FastAPI backend
- ✅ Production deployment through Vercel
- ✅ Public GitHub repository
- ✅ Judge-facing live demonstration

---

# 👤 Project

**ImpactLoop**

AI Change-Impact Decision Intelligence

Built by **Ajay Rathod**

GitHub:  
https://github.com/Ajayrathod04/IMPACTLOOP

Live Demo:  
https://frontend-orpin-one-42.vercel.app/

---

## 📜 License

See the repository `LICENSE` file for the project's license terms.
