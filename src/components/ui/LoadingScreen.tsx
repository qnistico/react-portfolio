"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem("hasVisitedHomepage");

    if (hasVisited) {
      // Skip loading screen for return visits in same session
      setIsLoading(false);
      setShouldRender(false);
      return;
    }

    // Mark as visited
    sessionStorage.setItem("hasVisitedHomepage", "true");

    // Show loading screen for first visit
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second loading animation

    // Clean up render after exit animation completes
    const renderTimer = setTimeout(() => {
      setShouldRender(false);
    }, 2800); // 2s loading + 0.8s exit animation

    return () => {
      clearTimeout(timer);
      clearTimeout(renderTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Background gradient animation */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue/20 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-blue/10 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>

          {/* Logo animation */}
          <div className="relative z-10 flex flex-col items-center">
            {/* SVG Logo with draw animation */}
            <motion.svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-blue mb-6"
            >
              {/* Q shape - animated stroke */}
              <motion.path
                d="M20 3C10.611 3 3 10.611 3 20C3 29.389 10.611 37 20 37C24 37 27.6 35.7 30.5 33.4L33.5 37L38 33L35 29.5C36.9 26.8 38 23.5 38 20C38 10.611 30.389 3 20 3ZM20 32C13.373 32 8 26.627 8 20C8 13.373 13.373 8 20 8C26.627 8 32 13.373 32 20C32 26.627 26.627 32 20 32Z"
                stroke="currentColor"
                strokeWidth={1.5}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              {/* Fill animates in after stroke */}
              <motion.path
                d="M20 3C10.611 3 3 10.611 3 20C3 29.389 10.611 37 20 37C24 37 27.6 35.7 30.5 33.4L33.5 37L38 33L35 29.5C36.9 26.8 38 23.5 38 20C38 10.611 30.389 3 20 3ZM20 32C13.373 32 8 26.627 8 20C8 13.373 13.373 8 20 8C26.627 8 32 13.373 32 20C32 26.627 26.627 32 20 32Z"
                fill="currentColor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              />
              {/* Code brackets - delayed */}
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.4 }}
              >
                <path
                  d="M17 16L14 20L17 24"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23 16L26 20L23 24"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 15L19 25"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </motion.g>
            </motion.svg>

            {/* Name reveal */}
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              <motion.h1
                className="text-2xl font-bold text-foreground"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.6 }}
              >
                Quinton Nistico
              </motion.h1>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-48 h-1 bg-card-border rounded-full mt-6 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-blue rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
