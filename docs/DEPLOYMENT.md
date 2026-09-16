# ImpactLoop Production Deployment Guide (Vercel & Render)

ImpactLoop is configured for seamless deployment on Vercel as a unified single-URL production application, as well as on Render or Docker platforms.

## 1. Unified Vercel Deployment (Recommended Single Public URL)

ImpactLoop includes a pre-configured `vercel.json` and `api/index.py` serverless entrypoint that builds the Vite/React frontend and FastAPI Python backend under a single Vercel domain.

### Deployment Steps on Vercel Account (`ajayrofficiall-3809s-projects`):
1. Import repository `https://github.com/Ajayrathod04/IMPACTLOOP` into your Vercel Dashboard.
2. Vercel automatically detects `vercel.json`:
   - **Frontend**: Built via `@vercel/static-build` (`frontend/package.json`).
   - **Backend**: Built via `@vercel/python` (`api/index.py`).
   - **API Endpoint**: `https://<your-app>.vercel.app/api/health`
   - **Frontend App**: `https://<your-app>.vercel.app/`

### Environment Variables (Optional):
- `GEMINI_API_KEY`: (Optional) Provide to enable dynamic AI analysis mode; if omitted, ImpactLoop automatically falls back to deterministic change-impact analysis.

---

## 2. Render Single Web Service Deployment

Alternatively, ImpactLoop can be deployed as a single Python Web Service on Render using the included `render.yaml`:
- **Build Command**: `cd frontend && npm install && npm run build && cd ../backend && pip install -r pyproject.toml`
- **Start Command**: `python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Health Check Path**: `/api/health`

---

## 3. Verification & Acceptance Criteria
- `/api/health` returns `{"status": "ok", "service": "ImpactLoop API"}`.
- All frontend routes handle client-side refresh cleanly.
- Relative API fetching (`/api/changes/...`) works without hardcoded localhost URLs.
