import { useState } from "react";
import CreateTodo from "../componants/CreateTodo";
import TodoList from "../componants/TodoList";

export default function TodosPage() {
  const [listRefreshKey, setListRefreshKey] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <CreateTodo onSuccess={() => setListRefreshKey((k) => k + 1)} />
      <TodoList refreshKey={listRefreshKey} />
    </div>
  );
}
