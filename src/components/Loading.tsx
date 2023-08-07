export function Loading() {
  return (
    <div className="animate-spin w-20 h-20 border-8 border-white/50 border-t-blue-600 rounded-full mx-auto"></div>
  );
}
// "use client";
// import { Header } from "@/components/Header";
// import { Main } from "@/components/Main";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const savedTheme = localStorage.getItem("theme");
//   const [isLightTheme, setIsLightTheme] = useState(savedTheme === "light");

//   useEffect(() => {
//     const root = document.documentElement;

//     if (isLightTheme) {
//       root.classList.add("light");
//       localStorage.setItem("theme", "light");
//     } else {
//       root.classList.remove("light");
//       localStorage.setItem("theme", "dark");
//     }
//   }, [isLightTheme]);

//   function toggleTheme() {
//     setIsLightTheme((prevIsLightTheme) => !prevIsLightTheme);
//   }
//   return (
//     <div className="w-full max-w-xl mx-auto">
//       <Header toggleTheme={toggleTheme} isLightTheme={isLightTheme} />
//       <Main />
//     </div>
//   );
// }
