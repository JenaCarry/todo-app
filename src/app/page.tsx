"use client";
import { CreateTodo } from "@/components/CreateTodo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListTasks } from "@/components/ListTasks";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Task[]>([]);
  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  function setTodosAndSave(newTodos: Task[]) {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  return (
    <>
      <Toaster />
      <Header />

      <main className="w-full max-w-xl flex flex-col gap-4 mx-auto">
        <CreateTodo setTodos={setTodos} />
        <ListTasks todos={todos} setTodosAndSave={setTodosAndSave} />
      </main>

      <Footer />
    </>
  );
}
