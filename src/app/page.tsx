"use client";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLightTheme, setIsLightTheme] = useState(
    localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    if (isLightTheme) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  }, [isLightTheme]);

  function toggleTheme() {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    setIsLightTheme((prevIsLightTheme) => !prevIsLightTheme);
  }
  return (
    <div className="w-full max-w-xl mx-auto">
      <Header toggleTheme={toggleTheme} isLightTheme={isLightTheme} />
      <Main />
    </div>
  );
}
