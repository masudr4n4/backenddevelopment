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
      <div className="w-full">
        <div className="h-6 w-56 mb-6 rounded-lg bg-base-300 animate-pulse" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-base-300 bg-base-200 overflow-hidden"
            >
              <div className="flex items-center gap-3 min-h-14 py-3 px-4">
                <div className="h-4 flex-1 rounded-md bg-base-300 animate-pulse" />
                <div className="h-6 w-14 rounded-full bg-base-300 animate-pulse shrink-0" />
                <div className="h-6 w-10 rounded-full bg-base-300 animate-pulse shrink-0" />
              </div>
              <div className="px-4 pb-4 pt-0 flex flex-col gap-2">
                <div className="h-3 w-full rounded bg-base-300 animate-pulse" />
                <div className="h-3 w-4/5 rounded bg-base-300 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-warning rounded-2xl border border-base-300" role="alert">
        <span>{error}</span>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-base-300 bg-base-200/50 px-8 py-14 text-center">
        <p className="text-base-content/60 text-sm max-w-sm mx-auto leading-relaxed">
          No todos yet. Create one above and it will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-1">
            Library
          </p>
          <h2 className="text-xl font-semibold text-base-content">Latest todos</h2>
        </div>
        <p className="text-sm text-base-content/50">Showing up to 20 · expand a row for details</p>
      </div>
      <div className="flex flex-col gap-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="collapse collapse-arrow rounded-2xl border border-base-300 bg-base-200 shadow-sm"
          >
            <input type="checkbox" name={`todo-${todo.id}`} />
            <div className="collapse-title font-medium flex flex-wrap items-center gap-2 min-h-14 py-3 pr-4 after:!end-4">
              <span className="flex-1 min-w-[12ch] text-left">{todo.title}</span>
              {todo.completed && (
                <span className="badge badge-success badge-sm whitespace-nowrap">Done</span>
              )}
              <span className="badge badge-ghost badge-sm border border-base-300 whitespace-nowrap">
                P{todo.priority ?? 0}
              </span>
            </div>
            <div className="collapse-content text-left !pb-4 pt-0">
              <p className="text-base-content/80 whitespace-pre-wrap text-sm leading-relaxed">
                {todo.description}
              </p>
              <p className="text-xs text-base-content/50 mt-3">
                Priority {todo.priority ?? 0}
                <span className="mx-2 opacity-40" aria-hidden>
                  ·
                </span>
                {todo.completed ? "Completed" : "Open"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
