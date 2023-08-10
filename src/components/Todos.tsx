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
  function onDragStarted(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.classList.add("dragging");
  }

  function onDragEnded(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.classList.remove("dragging");
  }

  return (
    <li
      className={`item h-[52px] relative grid grid-rows-1 grid-cols-[4rem_1fr_4rem] border-b border-details last:border-none ${
        todo.isCompleted ? "line-through" : ""
      }`}
      draggable
      onDragStart={onDragStarted}
      onDragEnd={onDragEnded}
    >
      {todo.isCompleted ? (
        <button
          onClick={() => completeTodo(todo.id)}
          className="flex items-center justify-center"
        >
          <div className="w-6 h-6 bg-gradient rounded-full flex items-center justify-center">
            <FaCheck className="text-white text-[0.625rem]" />
          </div>
        </button>
      ) : (
        <button
          onClick={() => completeTodo(todo.id)}
          className="flex items-center justify-center"
        >
          <div className="w-6 h-6 border-2 border-details rounded-full"></div>
        </button>
      )}
      <button
        onClick={() => completeTodo(todo.id)}
        className={`text-left ${todo.isCompleted ? "opacity-25" : ""}`}
      >
        {todo.text}
      </button>
      <button
        onClick={() => removeTodo(todo.id)}
        className="flex items-center justify-center"
      >
        <IoClose className="text-3xl text-details" />
      </button>
    </li>
  );
}
