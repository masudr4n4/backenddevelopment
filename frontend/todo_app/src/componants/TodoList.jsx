import { useState, useEffect } from "react";
import { getTodos } from "../api.js";

export default function TodoList({ refreshKey = 0 }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getTodos()
      .then((data) => {
        if (!cancelled) setTodos(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load todos");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto my-8">
        <div className="h-7 w-48 mb-4 rounded bg-base-300 animate-pulse" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-base-200 rounded-box border border-base-300 overflow-hidden"
            >
              <div className="flex items-center gap-2 min-h-12 py-3 px-4">
                <div className="h-4 flex-1 rounded bg-base-300 animate-pulse" />
                <div className="h-5 w-12 rounded bg-base-300 animate-pulse shrink-0" />
                <div className="h-5 w-8 rounded bg-base-300 animate-pulse shrink-0" />
              </div>
              <div className="px-4 pb-3 pt-0 flex flex-col gap-2">
                <div className="h-3 w-full rounded bg-base-300 animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-base-300 animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-base-300 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-8 alert alert-warning">
        {error}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="my-8 text-center text-base-content/70">
        No todos yet. Create one above.
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <h2 className="text-xl font-semibold mb-4">Latest 20 todos</h2>
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="collapse collapse-arrow bg-base-200 rounded-box border border-base-300"
          >
            <input type="checkbox" defaultChecked={false} />
            <div className="collapse-title font-medium flex items-center gap-2 min-h-12 py-3">
              <span className="flex-1">{todo.title}</span>
              {todo.completed && (
                <span className="badge badge-success badge-sm">Done</span>
              )}
              <span className="badge badge-ghost badge-sm">
                P{todo.priority ?? 0}
              </span>
            </div>
            <div className="collapse-content">
              <p className="text-base-content/80 whitespace-pre-wrap">
                {todo.description}
              </p>
              <p className="text-sm text-base-content/60 mt-2">
                Priority: {todo.priority ?? 0} · {todo.completed ? "Completed" : "Not completed"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
