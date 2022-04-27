import React from "react";

interface TodoListProps {
  todoItems: { id: number; task: string }[];
}

const TodoList: React.FC<TodoListProps> = ({ todoItems }) => {
  const todoList = todoItems.map((todo) => <li key={todo.id}>{todo.task}</li>);
  return <ul>{todoList}</ul>;
};

export default TodoList;
