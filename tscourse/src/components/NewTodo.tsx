import { useRef } from "react";
import { NewTodoProps } from "../models/todo.model";

const NewTodo: React.FC<NewTodoProps> = ({ addTodoHandler }) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enterdTodo = textInputRef.current!.value;
    addTodoHandler(enterdTodo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">Submit Todo</button>
    </form>
  );
};

export default NewTodo;
