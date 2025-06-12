"use client";

import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded">
        <div className="w-5 h-5" /> {/* Placeholder */}
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
      className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      {theme === "dark" ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-dark" />
      )}
    </button>
  );
}
