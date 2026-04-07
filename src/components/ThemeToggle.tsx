"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

export function ThemeToggle() {
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setReady(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-4 top-4 z-[100] flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink shadow-card transition hover:border-primary/35 hover:text-primary sm:right-5 sm:top-5 sm:h-11 sm:w-11"
      aria-label={dark ? "Passer en mode jour" : "Passer en mode nuit"}
      title={dark ? "Mode jour" : "Mode nuit"}
    >
      {ready ? (
        dark ? (
          <Sun className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" strokeWidth={2.25} aria-hidden />
        ) : (
          <Moon className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" strokeWidth={2.25} aria-hidden />
        )
      ) : (
        <span className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" aria-hidden />
      )}
    </button>
  );
}
