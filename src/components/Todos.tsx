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
      className={`h-[52px] border-b last:border-none relative grid grid-rows-1 grid-cols-[4rem_1fr_4rem] ${
        todo.isCompleted ? "line-through" : ""
      }`}
    >
      {todo.isCompleted ? (
        <button
          onClick={() => completeTodo(todo.id)}
          className="flex items-center justify-center"
        >
          <FaCheck />
        </button>
      ) : (
        <button onClick={() => completeTodo(todo.id)}>?</button>
      )}
      <button onClick={() => completeTodo(todo.id)} className="text-left">
        {todo.text}
      </button>
      <button
        onClick={() => removeTodo(todo.id)}
        className="flex items-center justify-center"
      >
        <IoClose className="text-2xl" />
      </button>
    </li>
  );
}
