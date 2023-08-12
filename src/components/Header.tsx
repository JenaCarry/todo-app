"use client";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

export function Header() {
  const [isLightTheme, seIsLightTheme] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("theme");
    if (data !== null) seIsLightTheme(JSON.parse(data));
  }, []);

  useEffect(() => {
    const element = document.documentElement;
    localStorage.setItem("theme", JSON.stringify(isLightTheme));
    if (isLightTheme) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [isLightTheme]);

  return (
    <header className="w-full max-w-xl text-white text-2xl flex items-center justify-between py-11 mx-auto">
      <h1 className="font-bold uppercase tracking-[0.5rem]">Todo</h1>
      <button onClick={() => seIsLightTheme((current) => !current)}>
        {isLightTheme ? <IoSunny className="text-3xl" /> : <FaMoon />}
      </button>
    </header>
  );
}
