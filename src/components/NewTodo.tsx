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
    <section className="relative flex items-center">
      <form onSubmit={handleSubmit}>
        <input
          className="w-full outline-none rounded-md py-2.5 pl-14"
          name="todo"
          id="todo"
          value={value}
          placeholder="Create a new todo..."
          onChange={(e) => setValue(e.target.value)}
        />
        <div></div>
      </form>
    </section>
  );
}
