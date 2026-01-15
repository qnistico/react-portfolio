"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";
import { ChevronRight } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  className?: string;
  external?: boolean;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  showArrow = true,
  className = "",
  external = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull effect - button moves toward cursor
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 overflow-hidden group";

  const variants = {
    primary: "bg-blue text-white hover:bg-blue-hover shadow-lg hover:shadow-xl hover:shadow-shadow-hover",
    secondary: "bg-card-bg border border-card-border text-foreground hover:border-blue hover:text-blue",
    ghost: "text-foreground hover:text-blue",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <motion.span
          className="relative z-10"
          initial={{ x: 0, opacity: 0.7 }}
          whileHover={{ x: 4, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="h-4 w-4" />
        </motion.span>
      )}
      {/* Hover gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderRadius: "inherit" }}
      />
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={combinedClassName}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={combinedClassName}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
