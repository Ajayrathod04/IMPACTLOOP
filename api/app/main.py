"""Main FastAPI Application entrypoint for ImpactLoop.

Configures CORS, registers API routers, and sets up health check endpoints & optional frontend static serving.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from .api.health import router as health_router
from .api.changes import router as changes_router

app = FastAPI(
    title="ImpactLoop API",
    description="AI Change-Impact SaaS Platform Backend API",
    version="0.2.0",
)

# Configure CORS origins for local & production hosting
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes (both /api prefix and root prefix for serverless rewrites)
app.include_router(health_router, prefix="/api")
app.include_router(health_router)
app.include_router(changes_router, prefix="/api")
app.include_router(changes_router)


@app.get("/")
@app.get("/api")
async def root():
    """Root endpoint delivering basic API metadata."""
    return {
        "name": "ImpactLoop API",
        "status": "online",
        "documentation": "/docs",
        "health": "/api/health",
        "changes": "/api/changes",
    }


# Serve Frontend static assets if built dist directory exists under /app
frontend_dist = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist")
)

if os.path.exists(frontend_dist):
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        try:
            app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
        except Exception:
            pass

    @app.get("/app/{full_path:path}")
    async def serve_frontend(full_path: str):
        target_file = os.path.join(frontend_dist, full_path)
        if os.path.isfile(target_file):
            return FileResponse(target_file)
        return FileResponse(os.path.join(frontend_dist, "index.html"))

