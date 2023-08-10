"use client";
import { Filter } from "./Filter";
import { Loading } from "./Loading";
import { NewTodo } from "./NewTodo";
import { Todos } from "./Todos";
import { useEffect, useRef, useState } from "react";

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

  const clearCompleted = () => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
      todo.isCompleted ? null : todo
    );
    setTodosAndSave(filteredTodos);
  };

  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const onDragStart = (e: React.DragEvent, index: number) => {
    e.currentTarget.classList.add("dragging");
    dragItem.current = index;
  };

  const onDragEnter = (e: React.DragEvent, index: number) => {
    dragOverItem.current = index;
  };

  const handleSort = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("dragging");
    let newTodos = [...todos];

    const draggedItemContent = newTodos.splice(dragItem.current, 1)[0];
    newTodos.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setTodosAndSave(newTodos);
  };

  return (
    <main className="flex flex-col gap-4 mx-auto">
      <NewTodo addTodo={addTodo} />
      <div className="bg-main-bg text-text rounded-md">
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
            .map((todo, index) => (
              <div
                key={todo.id}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragEnter={(e) => onDragEnter(e, index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                className="border-b border-details last:border-none"
              >
                <Todos
                  todo={todo}
                  removeTodo={removeTodo}
                  completeTodo={completeTodo}
                  index={index}
                />
              </div>
            ))
        )}
        <div className="h-[52px] flex items-center justify-between">
          <p className="pl-6">{completedTodosLength} items left</p>
          <button onClick={clearCompleted} className="h-full pr-6">
            Clear Completed
          </button>
        </div>
      </div>
      <Filter filter={filter} setFilter={setFilter} />
    </main>
  );
}
