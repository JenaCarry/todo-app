import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface ListTasksProps {
  todos: Task[];
  setTodosAndSave: (newTodos: Task[]) => void;
}

export function ListTasks({ todos, setTodosAndSave }: ListTasksProps) {
  const [filter, setFilter] = useState("All");

  function handleDragEnd(event: any) {
    const { active, over } = event;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    setTodosAndSave(arrayMove(todos, oldIndex, newIndex));
  }

  return (
    <>
      <ul className="bg-main-bg rounded-md overflow-hidden">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            {todos.length > 0 &&
              todos
                .filter((todo) =>
                  filter === "All"
                    ? true
                    : filter === "Completed"
                    ? todo.isCompleted
                    : !todo.isCompleted
                )
                .map((todo) => (
                  <Task
                    key={todo.id}
                    todo={todo}
                    todos={todos}
                    setTodosAndSave={setTodosAndSave}
                  />
                ))}
          </SortableContext>
        </DndContext>
        <ClearTasks
          text="Clear Completed"
          todos={todos}
          setTodosAndSave={setTodosAndSave}
          filter={filter}
        />
      </ul>

      <ul>
        <OrderList filter={filter} setFilter={setFilter} />
      </ul>
    </>
  );
}

interface TasksProps {
  todos: Task[];
  todo: Task;
  setTodosAndSave: (newTodos: Task[]) => void;
}

export function Task({ todo, todos, setTodosAndSave }: TasksProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = (id: string) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    toast("task removed", { icon: "💀" });
    setTodosAndSave(filteredTodos);
  };

  const handleComplete = (id: string) => {
    console.log("click");
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodosAndSave(newTodos);
  };

  return (
    <li
      className={`w-full h-[3.25rem] grid grid-cols-[4rem_1fr_4rem] border-b border-border-bg ${
        todo.isCompleted ? "line-through" : ""
      }`}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {todo.isCompleted ? (
        <button
          className="flex items-center justify-center"
          onClick={() => handleComplete(todo.id)}
        >
          <div className="w-6 h-6 bg-gradient rounded-full flex items-center justify-center">
            <FaCheck className="text-white text-[0.625rem]" />
          </div>
        </button>
      ) : (
        <button
          className="flex items-center justify-center"
          onClick={() => handleComplete(todo.id)}
        >
          <div className="w-6 h-6 border border-border-bg rounded-full"></div>
        </button>
      )}

      <button
        onClick={() => handleComplete(todo.id)}
        className={`text-left ${todo.isCompleted ? "opacity-30" : ""}`}
      >
        {todo.text}
      </button>

      <button
        className="flex items-center justify-center"
        onClick={() => handleRemove(todo.id)}
      >
        <IoClose className="text-3xl text-complements" />
      </button>
    </li>
  );
}

interface ClearTasksProps {
  text: string;
  todos: Task[];
  setTodosAndSave: (newTodos: Task[]) => void;
  filter: string;
}

export function ClearTasks({
  text,
  todos,
  setTodosAndSave,
  filter,
}: ClearTasksProps) {
  const completedTodosLength = todos.filter((todo) =>
    filter === "All" || filter === "Active" ? !todo.isCompleted : ""
  ).length;

  const handleClearComplete = () => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
      todo.isCompleted ? null : todo
    );
    const todosCompleted = Math.abs(todos.length - filteredTodos.length);
    setTodosAndSave(filteredTodos);
    if (todosCompleted > 0)
      return toast.success(`${todosCompleted} tasks completed`);
  };

  return (
    <li className="w-full h-[3.25rem] flex items-center justify-between text-complements">
      <h2 className="pl-6">{completedTodosLength} items left</h2>
      <button
        className="h-full pr-6 hover:text-hover-bg"
        onClick={handleClearComplete}
      >
        {text}
      </button>
    </li>
  );
}

interface OrderListProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function OrderList({ filter, setFilter }: OrderListProps) {
  return (
    <ul className="flex justify-center gap-5 bg-main-bg text-complements font-bold py-3 rounded-md">
      <li>
        <button
          className={`hover:text-hover-bg ${
            filter === "All" ? "text-bright-blue" : ""
          }`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={`hover:text-hover-bg ${
            filter === "Active" ? "text-bright-blue" : ""
          }`}
          onClick={() => setFilter("Active")}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={`hover:text-hover-bg ${
            filter === "Completed" ? "text-bright-blue" : ""
          }`}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}