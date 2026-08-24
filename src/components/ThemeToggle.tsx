"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { getActiveTheme, toggleTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(getActiveTheme() === "dark");
  }, []);

  function onToggle() {
    setDark(toggleTheme() === "dark");
  }

  return (
    <button
      type="button"
      className="toolbar-btn"
      title={dark ? "Açık mod" : "Karanlık mod"}
      aria-label={dark ? "Açık moda geç" : "Karanlık moda geç"}
      onClick={onToggle}
    >
      {dark ? <Sun size={14} strokeWidth={1.75} /> : <Moon size={14} strokeWidth={1.75} />}
    </button>
  );
}
