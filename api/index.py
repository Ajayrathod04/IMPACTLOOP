"""Vercel Serverless Function entrypoint for ImpactLoop FastAPI Backend."""

import sys
import os

# Insert workspace root and backend directory into sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(current_dir, ".."))
backend_dir = os.path.join(root_dir, "backend")

for path in [root_dir, backend_dir, current_dir, os.getcwd()]:
    if os.path.exists(path) and path not in sys.path:
        sys.path.insert(0, path)

try:
    from backend.app.main import app as app
except ImportError:
    from app.main import app as app
