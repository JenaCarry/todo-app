"use client";
import { Filter } from "./Filter";
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
  const [filter, setFilter] = useState("All");
  const completedTodosLength = todos.filter((todo) =>
    filter === "All" || filter === "Active" ? !todo.isCompleted : ""
  ).length;

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
    const timer = setTimeout(() => {
      setVisible(false);
    }, 100);
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

  const clearCompleted = () => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
      todo.isCompleted ? null : todo
    );
    setTodosAndSave(filteredTodos);
  };

  function getNewPosition(
    column: HTMLElement,
    posY: number
  ): HTMLElement | null {
    const cards = column.querySelectorAll<HTMLElement>(".item:not(.dragging)");
    let result: HTMLElement | null = null;
    cards.forEach((referCard) => {
      const box = referCard.getBoundingClientRect();
      const boxCenterY = box.y + box.height / 2;

      if (posY >= boxCenterY) result = referCard;
    });
    return result;
  }

  function onDragOvered(e: React.DragEvent<HTMLElement>) {
    const dragging = document.querySelector<HTMLElement>(".dragging");
    const applyAfter = getNewPosition(e.currentTarget, e.clientY);

    if (applyAfter) {
      if (dragging) {
        applyAfter.insertAdjacentElement("afterend", dragging);
      }
    } else if (dragging) {
      e.currentTarget.prepend(dragging);
    }
  }

  return (
    <main className="flex flex-col gap-4 mx-auto">
      <NewTodo addTodo={addTodo} />
      <ul className="bg-main-bg text-text rounded-md" onDragOver={onDragOvered}>
        {visible ? (
          <Loading />
        ) : (
          todos
            .filter((todo) =>
              filter === "All"
                ? true
                : filter === "Completed"
                ? todo.isCompleted
                : !todo.isCompleted
            )
            .map((todo) => (
              <Todos
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                completeTodo={completeTodo}
              />
            ))
        )}
        <li className="h-[52px] flex items-center justify-between">
          <p className="pl-6">{completedTodosLength} items left</p>
          <button onClick={clearCompleted} className="h-full pr-6">
            Clear Completed
          </button>
        </li>
      </ul>
      <Filter filter={filter} setFilter={setFilter} />
    </main>
  );
}
