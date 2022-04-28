import React from "react";
import { TodoListProps } from "../models/todo.model";

const TodoList: React.FC<TodoListProps> = ({ todoItems, handleDelete }) => {
  const todoList = todoItems.map((todo) => (
    <li key={todo.id}>
      <span>{todo.task}</span>
      <button onClick={handleDelete.bind(null, todo.id)}>Delete</button>
    </li>
  ));
  return <ol>{todoList}</ol>;
};

export default TodoList;
