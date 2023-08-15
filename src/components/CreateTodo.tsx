import { useState } from "react";
import toast from "react-hot-toast";

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface CreateTodoProps {
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function CreateTodo({ setTodos }: CreateTodoProps) {
  const [todo, setTodo] = useState<Task>({
    id: "",
    text: "",
    isCompleted: false,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (todo.text.length < 3) return toast.error("min 3 characters");
    if (todo.text.length > 100) return toast.error("max 100 characters");

    setTodos((prev) => {
      const list = [...prev, todo];

      localStorage.setItem("todos", JSON.stringify(list));

      return list;
    });

    toast.success("task created");

    setTodo({
      id: "",
      text: "",
      isCompleted: false,
    });
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo({ ...todo, id: crypto.randomUUID(), text: e.target.value });
  }

  return (
    <section className="shadow-xl">
      <h2 className="sr-only">Create todo</h2>
      <form
        className="w-full grid grid-cols-[4rem_1fr] bg-main-bg overflow-hidden rounded-md"
        onSubmit={handleSubmit}
      >
        <button className="flex items-center justify-center">
          <span className="w-6 h-6 border border-border-bg rounded-full"></span>
        </button>
        <input
          type="text"
          name="text"
          id="text"
          value={todo.text}
          placeholder="Create a new todo..."
          className="outline-none py-3 sm:py-4 pr-3 bg-main-bg text-text placeholder:text-complements"
          onChange={handleOnChange}
        />
      </form>
    </section>
  );
}
