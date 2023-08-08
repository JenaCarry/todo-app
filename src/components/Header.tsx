"use client";
import { use, useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

export function Header() {
  const [isLightTheme, seIsLightTheme] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("theme");
    if (data !== null) seIsLightTheme(JSON.parse(data));
  }, []);

  useEffect(() => {
    const element = document.documentElement;
    localStorage.setItem("theme", JSON.stringify(isLightTheme));
    if (isLightTheme) {
      element.classList.remove("light");
    } else {
      element.classList.add("light");
    }
  }, [isLightTheme]);

  return (
    <header className="text-white text-2xl flex items-center justify-between py-11">
      <h1 className="font-bold uppercase tracking-[0.5rem]">Todo</h1>
      <button onClick={() => seIsLightTheme((current) => !current)}>
        {isLightTheme ? <IoSunny className="text-3xl" /> : <FaMoon />}
      </button>
    </header>
  );
}
