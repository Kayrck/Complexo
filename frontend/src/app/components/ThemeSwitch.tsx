import { useEffect, useState, useCallback } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const readInitialTheme = (): Theme => {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const ThemeSwitch = ({ className = "" }: { className?: string }) => {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
      className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg ${className}`}
    >
      <Sun
        className={`absolute h-5 w-5 ${
          theme === "light" ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 ${
          theme === "dark" ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      />
    </button>
  );
};
