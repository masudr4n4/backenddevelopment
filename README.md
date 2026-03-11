# Todo Project — Full Stack

A full-stack **Todo** app with user authentication, todos CRUD, and follow/followers. Backend is FastAPI + PostgreSQL; frontend is React (Vite) with Tailwind and DaisyUI.

## Features

- **Authentication** — Register users, login (JWT), protected routes
- **Todos** — Create, read, update, delete todos (requires login)
- **Follow / Followers** — Follow users and list who you follow / who follows you
- **API docs** — Interactive Swagger UI at `/docs`

## Tech Stack

| Layer    | Stack |
|----------|--------|
| Backend  | Python 3, FastAPI, SQLAlchemy, PostgreSQL, JWT (python-jose), bcrypt |
| Frontend | React 19, Vite 6, Tailwind CSS 4, DaisyUI, React Hook Form |

## Prerequisites

- **Python 3.10+**
- **Node.js 18+** and npm
- **Docker** (for local PostgreSQL; or use your own Postgres)

---

## Quick start (Docker + backend + frontend)

Your `.env` is already set to use the Docker database. To run everything:

1. **Start Docker Desktop** (or the Docker daemon).
2. **Start PostgreSQL:**
   ```bash
   docker compose up -d
   ```
3. **Terminal 1 — Backend:** from project root:
   ```bash
   pip install -r requirements.txt   # once
   uvicorn main:app --reload
   ```
4. **Terminal 2 — Frontend:**
   ```bash
   cd frontend/todo_app && npm install && npm run dev
   ```
5. **Open in browser:**
   - App: **http://localhost:5173**
   - API docs: **http://localhost:8000/docs**

---

## Option A: PostgreSQL with Docker (easiest)

If you don’t have PostgreSQL installed or your cloud DB (e.g. AWS RDS) is unavailable:

1. **Start Docker** — Make sure Docker Desktop (or the Docker daemon) is running on your machine.

2. **Start PostgreSQL in Docker** (from project root):

   ```bash
   docker compose up -d
   ```

   This creates a database `todoapp` with user `postgres` / password `postgres` on port 5432.

3. **Use the Docker database in `.env`** — set:

   ```env
   DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/todoapp
   ```

4. Then follow **Running Locally** below (backend + frontend). Tables are created on first backend run.

To stop: `docker compose down`.

---

## Running Locally

### 1. Backend setup

From the **project root** (where `main.py` and `requirements.txt` are):

```bash
# Create and use a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Environment variables

Backend needs `SECRET_KEY` and `DATABASE_URL`. Use the example file:

```bash
cp example.env .env
```

Edit `.env` and set:

- **SECRET_KEY** — A long random string (e.g. for JWT signing). Example:
  ```bash
  SECRET_KEY=your-super-secret-key-at-least-32-chars-long
  ```
- **DATABASE_URL** — Your PostgreSQL connection string.

**Local PostgreSQL example:**

```env
DATABASE_URL=postgresql+psycopg2://postgres:yourpassword@localhost:5432/your_database_name
```

Create the database first (e.g. `createdb your_database_name`). Tables (`users`, `todos`, followers) are created automatically on first run.

**Using the existing AWS RDS URL:**  
If you use the URL from `example.env`, keep the same format and only replace the placeholder values with your real secret and credentials.

### 3. Start the backend

From the **project root**:

```bash
uvicorn main:app --reload
```

- API: **http://localhost:8000**
- Swagger docs: **http://localhost:8000/docs**

**Admin user for Swagger:** To log in from the docs (Authorize button), create an admin user once (with venv activated):

```bash
python scripts/create_admin_user.py
```

Then in Swagger UI click **Authorize**, and use username `admin` and password `admin123`.

### 4. Frontend setup and run

In a **second terminal**:

```bash
cd frontend/todo_app
npm install
npm run dev
```

- App: **http://localhost:5173** (or the port Vite prints)

To call the backend from the frontend, use `http://localhost:8000` as the API base (e.g. in `fetch` or axios). CORS is allowed for all origins in development.

---

## Quick reference

### Backend (project root)

```bash
pip install -r requirements.txt
# Set .env (SECRET_KEY, DATABASE_URL) then:
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend/todo_app
npm install
npm run dev
```

### API overview

| Area   | Prefix / Path      | Notes |
|--------|--------------------|--------|
| Auth   | `/auth`            | `POST /auth/create_user`, `POST /auth/token`, `GET /auth/get_users` |
| Todos  | (no prefix)        | `GET /`, `GET /todo/{id}`, `POST /todo/create`, `PUT /todo/{id}`, `DELETE /todo/{id}` (auth required for write) |
| Follow | (see router)       | Follow user, list followed, list followers (auth required) |

OpenAPI JSON: **http://localhost:8000/api/openapi.json**

---

## Project structure (high level)

```
backenddevelopment/
├── main.py              # FastAPI app, CORS, routers
├── database.py          # SQLAlchemy engine, session, auth dependency
├── requirements.txt
├── example.env          # Copy to .env and fill SECRET_KEY, DATABASE_URL
├── auths/               # User model, auth routes, JWT helper
├── todos/               # Todo model and CRUD routes
├── fan_followers/       # Follow/followers model and routes
└── frontend/
    └── todo_app/        # React + Vite app
        ├── src/
        │   ├── App.jsx
        │   └── componants/   # Login, CreateTodo, etc.
        ├── package.json
        └── vite.config.js
```

---

## Troubleshooting

- **`SECRET_KEY environment variable not set`** — Create `.env` from `example.env` and set `SECRET_KEY`.
- **Database connection errors** — Check `DATABASE_URL` in `.env`, that PostgreSQL is running, and the database exists.
- **CORS errors in browser** — Backend allows all origins in dev; ensure you’re calling `http://localhost:8000` from the frontend.
- **401 on todo/follow endpoints** — Use `POST /auth/token` with username/password to get an access token and send it in the `Authorization: Bearer <token>` header.
