"use client";

import { useState, FormEvent } from "react";

interface NewTodoProps {
  addTodo: (text: string) => void;
}

export function NewTodo({ addTodo }: NewTodoProps): JSX.Element {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  }

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-[4rem_1fr] bg-white overflow-hidden rounded-md"
      >
        <button className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 rounded-full"></div>
        </button>
        <input
          className="outline-none py-2.5 pr-3"
          name="todo"
          id="todo"
          value={value}
          placeholder="Create a new todo..."
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </section>
  );
}
