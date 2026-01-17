"use client";

import { motion } from "framer-motion";
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
  target?: string;
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
  target,
}: MagneticButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 overflow-hidden group";

  const variants = {
    primary: "bg-button-bg text-white hover:bg-button-hover shadow-lg hover:shadow-xl hover:shadow-shadow-hover",
    secondary: "bg-card-bg border border-blue/50 text-foreground hover:border-blue hover:text-blue",
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

  const isExternal = external || target === "_blank";

  if (href) {
    return (
      <motion.a
        href={href}
        target={target || (external ? "_blank" : undefined)}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={combinedClassName}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedClassName}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
