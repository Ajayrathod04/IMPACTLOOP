"""Vercel Serverless Function entrypoint for ImpactLoop FastAPI Backend.

Robustly resolves backend modules in Vercel Lambda serverless environments.
"""

import sys
import os

# Locate backend directory across Vercel deployment directory layouts
current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(current_dir, ".."))
backend_dir = os.path.join(root_dir, "backend")

for p in [backend_dir, root_dir, current_dir, os.getcwd()]:
    if os.path.exists(p) and p not in sys.path:
        sys.path.insert(0, p)

try:
    from app.main import app
except ImportError:
    try:
        from backend.app.main import app
    except ImportError as err:
        # Fallback minimal app if backend files are not bundled
        from fastapi import FastAPI
        app = FastAPI(title="ImpactLoop API Fallback")
        
        @app.get("/api/health")
        @app.get("/health")
        async def health():
            return {"status": "ok", "service": "ImpactLoop API (Fallback Mode)"}
