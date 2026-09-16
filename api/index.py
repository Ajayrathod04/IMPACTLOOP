"""Vercel Serverless Function entrypoint for ImpactLoop FastAPI Backend."""

import sys
import os

# Ensure all possible module paths are in sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, ".."))
backend_dir = os.path.abspath(os.path.join(parent_dir, "backend"))
app_dir = os.path.join(current_dir, "app")

for path in [current_dir, app_dir, parent_dir, backend_dir]:
    if os.path.exists(path) and path not in sys.path:
        sys.path.insert(0, path)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

try:
    from app.api.health import router as health_router
    from app.api.changes import router as changes_router
except ImportError:
    try:
        from api.health import router as health_router
        from api.changes import router as changes_router
    except ImportError:
        from backend.app.api.health import router as health_router
        from backend.app.api.changes import router as changes_router

app = FastAPI(
    title="ImpactLoop API",
    description="AI Change-Impact SaaS Platform Backend API",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(health_router)
app.include_router(changes_router, prefix="/api")
app.include_router(changes_router)


@app.get("/")
@app.get("/api")
@app.get("/health")
@app.get("/api/health")
async def root():
    return {
        "status": "healthy",
        "service": "ImpactLoop API",
        "version": "0.1.0",
    }
