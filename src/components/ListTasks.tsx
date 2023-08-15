import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
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

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    setTodosAndSave(arrayMove(todos, oldIndex, newIndex));
  }

  return (
    <>
      <section className="bg-main-bg rounded-md overflow-hidden shadow-xl">
        <h2 className="sr-only">Todo list</h2>
        <div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={todos}
              strategy={verticalListSortingStrategy}
            >
              {todos.length > 0 ? (
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
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center py-4 border-b border-border-bg">
                  <img
                    src="addTodo.svg"
                    alt="Add Todo"
                    width="390"
                    height="369"
                    className="w-1/2"
                  />
                  <p>Add some todos...</p>
                </div>
              )}
            </SortableContext>
          </DndContext>
        </div>
        <ClearTasks
          text="Clear Completed"
          todos={todos}
          setTodosAndSave={setTodosAndSave}
          filter={filter}
          setFilter={setFilter}
        />
      </section>
      <OrderList
        className="flex gap-5 justify-center bg-main-bg text-complements font-bold py-3 rounded-md min-[640px]:hidden"
        filter={filter}
        setFilter={setFilter}
      />
    </>
  );
}

interface TasksProps {
  todos: Task[];
  todo: Task;
  setTodosAndSave: (newTodos: Task[]) => void;
}

export function Task({ todo, todos, setTodosAndSave }: TasksProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
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
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodosAndSave(newTodos);
  };

  return (
    <div
      className={`w-full grid grid-cols-[4rem_1fr_4rem] border-b border-border-bg ${
        todo.isCompleted ? "line-through" : ""
      } ${isDragging ? "bg-dragging rounded-lg" : ""} ${
        isOver ? "border-none" : ""
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
          <span className="w-6 h-6 bg-gradient rounded-full flex items-center justify-center">
            <FaCheck className="text-white text-[0.625rem]" />
          </span>
        </button>
      ) : (
        <button
          className="flex items-center justify-center"
          onClick={() => handleComplete(todo.id)}
        >
          <span className="w-6 h-6 border border-border-bg rounded-full"></span>
        </button>
      )}

      <button
        onClick={() => handleComplete(todo.id)}
        className={`text-left py-3.5 sm:py-4 ${
          todo.isCompleted ? "opacity-30" : ""
        }`}
      >
        {todo.text}
      </button>

      <button
        className="flex items-center justify-center"
        onClick={() => handleRemove(todo.id)}
      >
        <IoClose className="text-3xl text-complements" />
      </button>
    </div>
  );
}

interface ClearTasksProps {
  text: string;
  todos: Task[];
  setTodosAndSave: (newTodos: Task[]) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export function ClearTasks({
  text,
  todos,
  setTodosAndSave,
  filter,
  setFilter,
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
    <div className="w-full flex items-center justify-between text-complements bg-main-bg text-base">
      <h2 className="pl-5">{completedTodosLength} items left</h2>
      <OrderList
        className="flex gap-5 justify-center text-complements font-bold py-3 rounded-md max-sm:hidden"
        filter={filter}
        setFilter={setFilter}
      />
      <button
        className="pr-5 py-3.5 hover:text-hover-bg"
        onClick={handleClearComplete}
      >
        {text}
      </button>
    </div>
  );
}

interface OrderListProps {
  filter: string;
  setFilter: (filter: string) => void;
  className: string;
}

export function OrderList({ filter, setFilter, className }: OrderListProps) {
  return (
    <div className={className}>
      <button
        className={`hover:text-hover-bg ${
          filter === "All" ? "text-bright-blue" : ""
        }`}
        onClick={() => setFilter("All")}
      >
        All
      </button>

      <button
        className={`hover:text-hover-bg ${
          filter === "Active" ? "text-bright-blue" : ""
        }`}
        onClick={() => setFilter("Active")}
      >
        Active
      </button>

      <button
        className={`hover:text-hover-bg ${
          filter === "Completed" ? "text-bright-blue" : ""
        }`}
        onClick={() => setFilter("Completed")}
      >
        Completed
      </button>
    </div>
  );
}
