const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export function getToken() {
  return localStorage.getItem("todo_token");
}

export function setToken(token) {
  if (token) localStorage.setItem("todo_token", token);
  else localStorage.removeItem("todo_token");
}

export async function login(username, password) {
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);
  const res = await fetch(`${API_BASE}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Login failed");
  }
  const data = await res.json();
  return data.access_token;
}

export async function getTodos() {
  const res = await fetch(`${API_BASE}/todos`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Failed to load todos");
  }
  return res.json();
}

export async function createTodo(todo, token) {
  const res = await fetch(`${API_BASE}/todo/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Failed to create todo");
  }
  return res.json();
}
