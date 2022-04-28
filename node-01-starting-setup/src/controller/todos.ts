import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Created Todo", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const newText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((t) => t.id === todoId);
  if (todoIndex < 0) {
    throw new Error("could not find todo");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, newText);

  res.json({ message: "upadated", updateTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((t) => t.id === todoId);
  TODOS.splice(todoIndex, 1);

  res.json({ message: "deleted", TODOS });
};
