import { useState } from "react";
import { Todo } from "./models/todo.model";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

const App: React.FC = () => {
  const originalTodos = [
    { id: 1, task: "Learn TypeScript" },
    { id: 2, task: "Learn Python" },
  ];
  const [todos, setTodos] = useState<Todo[]>(originalTodos);

  const addTodoHandler = (todo: string) => {
    const id = todos[todos.length - 1].id + 1;
    const newTodo = { id, task: todo };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleDelte = (id: number) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  return (
    <div className="App">
      <NewTodo addTodoHandler={addTodoHandler} />
      <TodoList handleDelete={handleDelte} todoItems={todos} />
    </div>
  );
};

export default App;
