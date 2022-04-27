import React from "react";
import { TodoListProps } from "../models/todo.model";

const TodoList: React.FC<TodoListProps> = ({ todoItems }) => {
  const todoList = todoItems.map((todo) => <li key={todo.id}>{todo.task}</li>);
  return <ol>{todoList}</ol>;
};

export default TodoList;
