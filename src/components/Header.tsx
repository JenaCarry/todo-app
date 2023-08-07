"use client";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

export function Header() {
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (isLightTheme) {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [isLightTheme]);

  function toggleTheme() {
    setIsLightTheme((prevIsLightTheme) => !prevIsLightTheme);
  }

  return (
    <header className="text-white text-2xl flex items-center justify-between py-11">
      <h1 className="font-bold uppercase tracking-[0.5rem]">Todo</h1>
      <button onClick={toggleTheme}>
        {isLightTheme ? <FaMoon /> : <IoSunny className="text-3xl" />}
      </button>
    </header>
  );
}
