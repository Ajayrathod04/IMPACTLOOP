"""Vercel Serverless Function entrypoint for ImpactLoop FastAPI Backend."""

import sys
import os

# Insert backend directory into sys.path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

from app.main import app

# Explicit top-level FastAPI instance variable for Vercel detector
app = app
