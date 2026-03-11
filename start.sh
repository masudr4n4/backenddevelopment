#!/usr/bin/env bash
# Start backend and frontend in one go. Prerequisites: .env present, Docker Postgres up.
# First time: pip install -r requirements.txt && (cd frontend/todo_app && npm install)

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "Checking prerequisites..."
echo ""

# 1. .env file exists
if [ ! -f .env ]; then
  echo "[ERROR] .env file is missing."
  echo "  Copy example.env to .env and set SECRET_KEY and DATABASE_URL."
  echo "  Example: cp example.env .env"
  exit 1
fi
echo "[OK] .env file found."

# 2. .env has required variables set (not empty, not placeholder)
if ! grep -q '^SECRET_KEY=.\+' .env || ! grep -q '^DATABASE_URL=.\+' .env; then
  echo "[ERROR] .env is missing or has empty SECRET_KEY or DATABASE_URL."
  echo "  Edit .env and set: SECRET_KEY=... and DATABASE_URL=..."
  exit 1
fi
if grep -q 'SECRET_KEY=xxx' .env || grep -q 'DATABASE_URL=.*xxxxxxxx' .env; then
  echo "[ERROR] .env still contains placeholder values (xxx...)."
  echo "  Set real values for SECRET_KEY and DATABASE_URL in .env."
  exit 1
fi
echo "[OK] .env has SECRET_KEY and DATABASE_URL set."

# 3. Docker daemon is running
if ! docker info >/dev/null 2>&1; then
  echo "[ERROR] Docker is not running or not available."
  echo "  Start Docker Desktop (or the Docker daemon), then run this script again."
  exit 1
fi
echo "[OK] Docker is running."

# 4. Postgres container is up (docker-compose db service)
if [ -f docker-compose.yml ]; then
  if ! docker compose ps -q 2>/dev/null | grep -q .; then
    echo "[ERROR] PostgreSQL container is not running."
    echo "  Start it with: docker compose up -d"
    echo "  Then run this script again."
    exit 1
  fi
  echo "[OK] PostgreSQL container (docker compose) is up."
else
  echo "[INFO] No docker-compose.yml found; skipping Postgres container check."
fi

echo ""
echo "Starting backend (http://localhost:8000) and frontend (http://localhost:5173)..."
echo "Press Ctrl+C to stop both."
echo ""

cleanup() {
  echo ""
  echo "Stopping backend and frontend..."
  [ -n "$BACKEND_PID" ] && kill "$BACKEND_PID" 2>/dev/null || true
  [ -n "$FRONTEND_PID" ] && kill "$FRONTEND_PID" 2>/dev/null || true
  exit 0
}
trap cleanup INT TERM

# Start backend (assumes venv activated or system Python has deps)
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Start frontend
(cd frontend/todo_app && npm run dev) &
FRONTEND_PID=$!

wait
