import { useState } from "react";
import CreateTodo from "../componants/CreateTodo";
import TodoList from "../componants/TodoList";

export default function TodosPage() {
  const [listRefreshKey, setListRefreshKey] = useState(0);

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <p className="text-sm font-medium uppercase tracking-wide text-primary mb-2">
          Tasks
        </p>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
          Todos
        </h1>
        <p className="text-base-content/70 text-sm max-w-xl leading-relaxed">
          Add a task with a title, details, and priority. Your list refreshes when a new todo is
          saved.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        <section aria-labelledby="add-todo-heading">
          <h2 id="add-todo-heading" className="sr-only">
            Add a new todo
          </h2>
          <CreateTodo onSuccess={() => setListRefreshKey((k) => k + 1)} />
        </section>

        <section aria-labelledby="todo-list-heading" className="border-t border-base-300 pt-10">
          <h2 id="todo-list-heading" className="sr-only">
            Your todo list
          </h2>
          <TodoList refreshKey={listRefreshKey} />
        </section>
      </div>
    </div>
  );
}
