"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme
    setIsDark(document.documentElement.classList.contains("dark"));

    // Watch for changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  // Show a placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative flex items-center gap-2 rounded-full bg-card-bg border border-card-border px-3 py-1.5 text-sm font-medium h-9 w-32" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center gap-2 rounded-full bg-card-bg border border-card-border px-3 py-1.5 text-sm font-medium transition-all duration-300 hover:shadow-lg"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-blue/10"
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex items-center gap-2">
        <motion.span
          className="text-xs uppercase tracking-wide"
          initial={false}
          animate={{
            opacity: !isDark ? 1 : 0.5,
          }}
        >
          Light
        </motion.span>

        <div className="relative h-6 w-12 rounded-full bg-foreground/10">
          <motion.div
            className="absolute top-1 h-4 w-4 rounded-full bg-blue flex items-center justify-center"
            initial={false}
            animate={{
              left: isDark ? "calc(100% - 20px)" : "4px",
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isDark ? (
                <Moon className="h-2.5 w-2.5 text-white" />
              ) : (
                <Sun className="h-2.5 w-2.5 text-white" />
              )}
            </motion.div>
          </motion.div>
        </div>

        <motion.span
          className="text-xs uppercase tracking-wide"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0.5,
          }}
        >
          Dark
        </motion.span>
      </div>
    </button>
  );
}
