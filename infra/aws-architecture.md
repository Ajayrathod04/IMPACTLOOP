# ImpactLoop AWS Production Infrastructure Architecture

This document describes the optional deployment architecture for hosting ImpactLoop on AWS cloud infrastructure.

## Architectural Overview

```
                      [ Users / Judges ]
                              │
                              ▼
                   [ AWS CloudFront CDN ]
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
   [ S3 Static Web Bucket ]        [ AWS API Gateway ]
    (React / Vite Bundle)                    │
                                             ▼
                                  [ AWS ECS Fargate Task ]
                                  (FastAPI App Container)
                                             │
                       ┌─────────────────────┼─────────────────────┐
                       ▼                     ▼                     ▼
               [ Amazon Bedrock ]   [ AWS Secrets Manager ] [ Amazon CloudWatch ]
              (AI Risk Inference)      (Environment Keys)     (App Telemetry)
```

## Infrastructure Components

1. **Frontend Hosting**:
   - **AWS CloudFront**: Global CDN with edge SSL/TLS termination.
   - **Amazon S3**: Static website hosting bucket for the React Vite build artifacts (`dist/`).

2. **Backend API Service**:
   - **AWS ECS Fargate**: Serverless container execution for the FastAPI backend (`backend/Dockerfile`).
   - **Application Load Balancer (ALB)** or **API Gateway**: Public HTTP/HTTPS interface with CORS restriction.

3. **Authentication Hooks**:
   - **Amazon Cognito**: User Pools and Identity Pools for enterprise user authentication.
   - **Guest Mode Default**: The frontend retains Guest Demo Mode as the default state for hackathon evaluation (`VITE_DEMO_MODE=true`).

4. **AI & Storage**:
   - **Amazon Bedrock**: Foundation model integration for risk scoring and uncertainty resolution agents.
   - **Amazon DynamoDB / PostgreSQL**: Persistent storage for organizational memory and historical outcome graphs.
