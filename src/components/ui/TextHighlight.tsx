"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextHighlightProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function TextHighlight({ children, className = "", delay = 0 }: TextHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-blue/20 -z-0 rounded"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.5,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ originX: 0 }}
      />
    </span>
  );
}
