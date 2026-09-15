# ImpactLoop Security & Guest Mode Guidelines

## 1. Zero Mandatory Signup / Guest Demo Mode
- The application defaults to Guest Demo Mode upon loading (`OPEN → EXPLORE DEMO`).
- Judges and evaluators are never blocked by login, paywalls, or credential requirements.

## 2. Environment Variables & Secret Safety
- Secrets and private API keys are strictly excluded from source control.
- Configuration settings are loaded via environment variables (`.env.example` templates provided).

## 3. API Boundary & CORS Configuration
- Backend CORS middleware explicitly limits origins to local Vite development (`http://localhost:5173`, `http://127.0.0.1:5173`) or configured production domains.
- Data input forms sanitize user payloads before processing.

## 4. Production Security Recommendations
- Enable OAuth2 / JWT authentication when transitioning to multi-tenant production.
- Enforce TLS (HTTPS) on all API endpoints.
