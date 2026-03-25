import { useState } from "react";
import { getToken, createTodo } from "../api.js";

export default function CreateTodo({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const token = getToken();
    if (!token) {
      setError("Please log in first (Login page) to add a todo.");
      return;
    }

    const form = event.target;
    const data = new FormData(form);
    const title = data.get("title")?.toString().trim() || "";
    const description = data.get("description")?.toString().trim() || "";
    const priority = Number(data.get("priority")) || 0;

    if (title.length < 3 || description.length < 3) {
      setError("Title and description must be at least 3 characters.");
      return;
    }

    setLoading(true);
    try {
      const result = await createTodo(
        { title, description, completed: false, priority },
        token
      );
      setMessage(`Todo created (id: ${result.todo_id}).`);
      form.reset();
      onSuccess?.();
    } catch (err) {
      setError(err.message || "Failed to create todo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card bg-base-200 border border-base-300 shadow-sm rounded-2xl w-full max-w-xl mx-auto lg:mx-0">
      <div className="card-body gap-6 sm:p-8">
        <div className="text-center md:text-left space-y-1">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            New entry
          </p>
          <h3 className="text-xl font-semibold text-base-content">Add a todo</h3>
          <p className="text-sm text-base-content/70">
            Title and description need at least 3 characters. Priority is 0 (lowest) through 5.
          </p>
        </div>

        {error && (
          <div className="alert alert-error text-sm" role="alert">
            <span>{error}</span>
          </div>
        )}
        {message && (
          <div className="alert alert-success text-sm" role="status">
            <span>{message}</span>
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={submitHandler}>
          <div className="form-control w-full">
            <label className="label pt-0 pb-1" htmlFor="title">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              type="text"
              placeholder="What needs doing?"
              required
              id="title"
              name="title"
              minLength={3}
              disabled={loading}
              className="input input-bordered w-full bg-base-100 border-base-300 focus:border-primary"
            />
          </div>

          <div className="form-control w-full">
            <label className="label pt-0 pb-1" htmlFor="description">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              id="description"
              className="textarea textarea-bordered w-full bg-base-100 border-base-300 focus:border-primary min-h-24"
              placeholder="Add context, links, or acceptance criteria…"
              name="description"
              required
              minLength={3}
              disabled={loading}
            />
          </div>

          <div className="form-control w-full">
            <label className="label pt-0 pb-1" htmlFor="priority">
              <span className="label-text font-medium">Priority</span>
              <span className="label-text-alt text-base-content/50">0–5     :</span>
            </label>
            <input
              type="number"
              required
              id="priority"
              name="priority"
              placeholder="0"
              min={0}
              max={5}
              disabled={loading}
              className="input input-bordered w-full bg-base-100 border-base-300 focus:border-primary max-w-[8rem]"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto sm:min-w-[10rem]"
            disabled={loading}
          >
            {loading && <span className="loading loading-spinner loading-sm" />}
            {loading ? "Adding…" : "Add todo"}
          </button>
        </form>
      </div>
    </div>
  );
}
