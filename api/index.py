"""Vercel Serverless Function entrypoint for ImpactLoop FastAPI Backend."""

import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure api directory is in sys.path
api_dir = os.path.dirname(os.path.abspath(__file__))
if api_dir not in sys.path:
    sys.path.insert(0, api_dir)

from app.api.health import router as health_router
from app.api.changes import router as changes_router

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
@app.get("/api/index")
@app.get("/api/index.py")
async def root():
    return {
        "name": "ImpactLoop API",
        "status": "online",
        "health": "/api/health",
        "changes": "/api/changes",
    }
