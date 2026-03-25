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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="w-full max-w-md mx-auto px-4 min-h-[55vh] flex flex-col justify-center py-10">
      <div className="card bg-base-200 border border-base-300 shadow-sm rounded-2xl w-full">
        <div className="card-body gap-6 sm:p-8">
          <div className="text-center space-y-2">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Sign in
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome back
            </h1>
            <p className="text-sm text-base-content/70 leading-relaxed max-w-xs mx-auto">
              Enter your credentials to manage todos and continue where you left off.
            </p>
          </div>

          {error && (
            <div className="alert alert-error text-sm" role="alert">
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="alert alert-success text-sm" role="status">
              <span>Logged in. You can add todos now.</span>
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={submitHandler}>
            <div className="form-control w-full">
              <label className="label pt-0 pb-1" htmlFor="username">
                <span className="label-text font-medium">Username</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 bg-base-100 border-base-300 focus-within:border-primary">
                <svg
                  className="h-[1.1em] opacity-45 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  placeholder="Your username"
                  required
                  id="username"
                  name="username"
                  autoComplete="username"
                  disabled={loading}
                  className="grow min-w-0"
                />
              </label>
            </div>

            <div className="form-control w-full">
              <label className="label pt-0 pb-1" htmlFor="password">
                <span className="label-text font-medium">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 bg-base-100 border-base-300 focus-within:border-primary">
                <svg
                  className="h-[1.1em] opacity-45 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  minLength={8}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="grow min-w-0"
                />
                <button
                  type="button"
                  className="btn btn-ghost btn-xs btn-square shrink-0 -mr-1"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 opacity-70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 opacity-70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </label>
              <p className="label py-1">
                <span className="label-text-alt text-base-content/50">
                  Use at least 8 characters (same rules your account was created with).
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-1"
              disabled={loading}
            >
              {loading && <span className="loading loading-spinner loading-sm" />}
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
