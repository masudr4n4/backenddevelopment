import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api.js";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const form = event.target;
    const data = new FormData(form);
    const username = data.get("username")?.toString().trim() || "";
    const password = data.get("password")?.toString().trim() || "";

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);
    try {
      const token = await login(username, password);
      setToken(token);
      setSuccess(true);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card items-center my-10">
      <h1 className="font-bold text-2xl bg-gradient-to-r from-fuchsia-800 to-fuchsia-200 mb-3">
        Welcome to the system!
      </h1>
      {error && (
        <div className="alert alert-error mb-3 text-sm">{error}</div>
      )}
      {success && (
        <div className="alert alert-success mb-3 text-sm">
          Logged in. You can add todos now.
        </div>
      )}
      <form
        className="form flex flex-col gap-3 w-72 md:w-76"
        onSubmit={submitHandler}
      >
        <label className="input validator" htmlFor="username">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="text"
            placeholder="Username"
            required
            id="username"
            name="username"
            autoComplete="username"
            disabled={loading}
          />
        </label>
        <div className="validator-hint hidden">Enter your username</div>
        <label className="input validator" htmlFor="password">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            required
            placeholder="Password"
            minLength={8}
            id="password"
            name="password"
            autoComplete="current-password"
            disabled={loading}
          />
        </label>
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br /> At least one number <br /> At least one lowercase letter{" "}
          <br /> At least one uppercase letter
        </p>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}
