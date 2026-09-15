# ImpactLoop Deployment Architecture & Guide

ImpactLoop is architected as a lightweight, reliable dual-tier application:

## Architecture
- **Frontend**: Vite + React + Three.js (Deployable on Vercel, Netlify, or Cloudflare Pages).
- **Backend**: FastAPI + Python 3.12 (Deployable on Render, Railway, Fly.io, or AWS ECS/App Runner).

## 1. Frontend Build & Deployment (Vercel / Netlify)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**: `VITE_API_BASE_URL=https://api.yourdomain.com`

## 2. Backend Deployment (Render / Railway / Docker)
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
- **Health Check Endpoint**: `/api/health`

## 3. Optional AWS Cloud Infrastructure Architecture
- Frontend: CloudFront CDN + S3 static bucket.
- Backend: AWS ECS Fargate or API Gateway + AWS Lambda.
- Auth (Optional): Amazon Cognito user pool (guest mode retained as default).
