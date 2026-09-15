# ImpactLoop Single Development Preview Launcher
$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
Write-Host "ImpactLoop Root: $ProjectRoot" -ForegroundColor Cyan

# 1. Check Python virtual environment
$VenvPython = Join-Path $ProjectRoot ".venv\Scripts\python.exe"
if (-not (Test-Path $VenvPython)) {
    Write-Host "Using system Python..." -ForegroundColor Yellow
    $VenvPython = "python"
} else {
    Write-Host "Using virtual environment Python: $VenvPython" -ForegroundColor Green
}

# 2. Check if FastAPI backend (port 8000) is already running
$BackendRunning = $false
try {
    $HealthResp = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/health" -Method Get -ErrorAction SilentlyContinue
    if ($HealthResp.status -eq "ok") {
        $BackendRunning = $true
        Write-Host "FastAPI Backend is already running on http://127.0.0.1:8000" -ForegroundColor Green
    }
} catch {
    $BackendRunning = $false
}

if (-not $BackendRunning) {
    Write-Host "Starting FastAPI Backend Server on port 8000..." -ForegroundColor Yellow
    Start-Process -FilePath $VenvPython -ArgumentList "-m uvicorn app.main:app --reload --port 8000" -WorkingDirectory (Join-Path $ProjectRoot "backend") -WindowStyle Hidden
    
    # Wait for /api/health
    $Retries = 0
    while ($Retries -lt 15) {
        Start-Sleep -Seconds 1
        try {
            $Check = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/health" -Method Get -ErrorAction SilentlyContinue
            if ($Check.status -eq "ok") {
                Write-Host "FastAPI Backend is ONLINE (HTTP 200)!" -ForegroundColor Green
                break
            }
        } catch {
            $Retries++
            Write-Host "Waiting for FastAPI backend ($Retries/15)..." -ForegroundColor Gray
        }
    }
}

# 3. Check if Vite Frontend (port 5173) is already running
$FrontendRunning = $false
try {
    $FrontCheck = Invoke-WebRequest -Uri "http://localhost:5173" -Method Get -ErrorAction SilentlyContinue
    if ($FrontCheck.StatusCode -eq 200) {
        $FrontendRunning = $true
        Write-Host "Vite Frontend is already running on http://localhost:5173" -ForegroundColor Green
    }
} catch {
    $FrontendRunning = $false
}

if (-not $FrontendRunning) {
    Write-Host "Starting Vite Frontend Dev Server on port 5173..." -ForegroundColor Yellow
    Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run dev" -WorkingDirectory (Join-Path $ProjectRoot "frontend") -WindowStyle Hidden
    
    $Retries = 0
    while ($Retries -lt 15) {
        Start-Sleep -Seconds 1
        try {
            $Check = Invoke-WebRequest -Uri "http://localhost:5173" -Method Get -ErrorAction SilentlyContinue
            if ($Check.StatusCode -eq 200) {
                Write-Host "Vite Frontend is ONLINE!" -ForegroundColor Green
                break
            }
        } catch {
            $Retries++
            Write-Host "Waiting for Vite Frontend ($Retries/15)..." -ForegroundColor Gray
        }
    }
}

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "IMPACTLOOP DECISION INTELLIGENCE CONTROL ROOM READY" -ForegroundColor Amber
Write-Host "Single Preview URL: http://localhost:5173" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan

# Open default browser
Start-Process "http://localhost:5173"
