"use client";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

interface HeaderProps {
  toggleTheme: () => void;
  isLightTheme: boolean;
}

export function Header({
  toggleTheme,
  isLightTheme,
}: HeaderProps): JSX.Element {
  return (
    <header className="text-white text-2xl flex items-center justify-between py-11">
      <h1 className="font-bold uppercase tracking-[0.5rem]">Todo</h1>
      <button onClick={toggleTheme}>
        {isLightTheme ? <FaMoon /> : <IoSunny className="text-3xl" />}
      </button>
    </header>
  );
}
