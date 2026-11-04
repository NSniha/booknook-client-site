"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <button
      className="icon-button"
      type="button"
      aria-label={
        mounted && theme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
