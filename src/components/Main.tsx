"use client";
import { Loading } from "./Loading";
import { NewTodo } from "./NewTodo";
import { Todos } from "./Todos";
import { useEffect, useState } from "react";

interface TodosProps {
  id: string;
  text: string;
  isCompleted: boolean;
}

export function Main() {
  const [todos, setTodos] = useState<TodosProps[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
    const timer = setTimeout(() => {
      setVisible(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  function setTodosAndSave(newTodos: TodosProps[]) {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  const addTodo = (text: string) => {
    const newTodos = [
      ...todos,
      {
        id: crypto.randomUUID(),
        text,
        isCompleted: false,
      },
    ];
    setTodosAndSave(newTodos);
  };

  const removeTodo = (id: string) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setTodosAndSave(filteredTodos);
  };

  const completeTodo = (id: string) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodosAndSave(newTodos);
  };

  return (
    <main className="flex flex-col gap-4 mx-auto">
      <NewTodo addTodo={addTodo} />
      <ul className="bg-main-bg text-text rounded-md">
        {visible ? (
          <Loading />
        ) : (
          todos.map((todo) => (
            <Todos
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))
        )}
      </ul>
    </main>
  );
}
