"use client";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

export function Header() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "light") {
      element.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      element.classList.remove("light");
      localStorage.removeItem("theme");
    }
  }, [theme]);

  return (
    <header className="text-white text-2xl flex items-center justify-between py-11">
      <h1 className="font-bold uppercase tracking-[0.5rem]">Todo</h1>
      {theme === "light" ? (
        <button onClick={() => setTheme("dark")}>
          <FaMoon />
        </button>
      ) : (
        <button onClick={() => setTheme("light")}>
          <IoSunny className="text-3xl" />
        </button>
      )}
    </header>
  );
}
