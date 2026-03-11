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
    <div className="card items-center my-10">
      <h1 className="font-bold text-2xl bg-gradient-to-r from-fuchsia-800 to-fuchsia-200 mb-3">
        Add new todo!
      </h1>
      {error && (
        <div className="alert alert-error mb-3 text-sm">
          {error}
        </div>
      )}
      {message && (
        <div className="alert alert-success mb-3 text-sm">
          {message}
        </div>
      )}
      <form
        className="form flex flex-col gap-3 w-72 md:w-76"
        onSubmit={submitHandler}
      >
        <label className="input" htmlFor="title">
          <input
            type="text"
            placeholder="Enter Title"
            required
            id="title"
            name="title"
            minLength={3}
            disabled={loading}
          />
        </label>
        <textarea
          className="textarea"
          placeholder="Enter Description"
          name="description"
          required
          minLength={3}
          disabled={loading}
        />
        <label className="input" htmlFor="priority">
          <input
            type="number"
            required
            id="priority"
            name="priority"
            placeholder="Enter task priority (0-5)"
            min={0}
            max={5}
            disabled={loading}
          />
        </label>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Adding…" : "Add"}
        </button>
      </form>
    </div>
  );
}
