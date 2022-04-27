import React from "react";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const todos = [
    { id: 1, task: "Learn TypeScript" },
    { id: 2, task: "Learn Python" },
  ];

  return (
    <div className="App">
      <TodoList todoItems={todos} />
    </div>
  );
};

export default App;
