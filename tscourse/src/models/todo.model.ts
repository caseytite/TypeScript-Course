export interface Todo {
  id: number;
  task: string;
}

export interface TodoListProps {
  todoItems: { id: number; task: string }[];
  handleDelete: (id: number) => void;
}

//how to do this with a type rather then an interface
export type NewTodoProps = {
  addTodoHandler: (todo: string) => void;
};
// export interface NewTodoProps {
//   addTodoHandler: Function;
// }
