"""Vercel Serverless Function entrypoint for ImpactLoop FastAPI Backend."""

import sys
import os

# Insert api directory into sys.path
api_dir = os.path.dirname(os.path.abspath(__file__))
if api_dir not in sys.path:
    sys.path.insert(0, api_dir)

from app.main import app as app
