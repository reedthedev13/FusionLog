import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
      title="Toggle Dark Mode"
    >
      {isDark ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-800" />
      )}
    </button>
  );
}
