"use client";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface TodosProps {
  todo: Todo;
  removeTodo: (id: string) => void;
  completeTodo: (id: string) => void;
}

export function Todos({
  todo,
  removeTodo,
  completeTodo,
}: TodosProps): JSX.Element {
  return (
    <li
      className={`h-[52px] border-b relative grid grid-rows-1 grid-cols-[4rem_1fr_4rem] ${
        todo.isCompleted ? "line-through" : ""
      }`}
    >
      <button onClick={() => completeTodo(todo.id)}>
        <FaCheck />
      </button>
      <button className="text-left">{todo.text}</button>
      <button
        onClick={() => removeTodo(todo.id)}
        className="flex items-center justify-center"
      >
        <IoClose className="text-2xl" />
      </button>
    </li>
  );
}

{
  /* <div className="w-6 h-6 bg-green-200 relative rounded-full isolate overflow-auto after:absolute after:inset-0 after:bg-gradient after:-z-10 after:opacity-0 after:transition-all after:duration-300 after:ease-in-out after:group-hover:opacity-100">
  <div className="w-[23px] h-[23px] absolute bg-white rounded-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
</div>; */
}
