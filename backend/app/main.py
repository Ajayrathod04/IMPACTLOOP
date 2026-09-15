"""Main FastAPI Application entrypoint for ImpactLoop.

Configures CORS, registers API routers, and sets up health check endpoints.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.health import router as health_router
from app.api.changes import router as changes_router

app = FastAPI(
    title="ImpactLoop API",
    description="AI Change-Impact SaaS Platform Backend API",
    version="0.2.0",
)

# Configure CORS origins for local Vite frontend development
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(health_router, prefix="/api")
app.include_router(changes_router, prefix="/api")


@app.get("/")
async def root():
    """Root endpoint delivering basic API metadata."""
    return {
        "name": "ImpactLoop API",
        "status": "online",
        "documentation": "/docs",
        "health": "/api/health",
        "changes": "/api/changes",
    }
