"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle({ classNames }: { classNames?: string }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (theme === null) return <div className="w-10 h-10" />;

  return (
    <button
      aria-label="Toggle Theme"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      onClick={toggle}
      className={`
        relative w-10 h-10 rounded-full flex items-center justify-center
        transition-all duration-300 ease-in-out
        bg-white dark:bg-zinc-800 
        border-2 border-gray-200 dark:border-gray-700
        hover:border-primary dark:hover:border-primary
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
        shadow-sm hover:shadow-md
        ${classNames}
      `}
    >
      <span
        className={`absolute transform transition-transform duration-500 ${
          theme === "dark" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
        }`}
      >
        <Moon />
      </span>
      <span
        className={`absolute transform transition-transform duration-500 ${
          theme === "light" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
        }`}
      >
        <Sun />
      </span>
    </button>
  );
}
