"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface SkillNode {
  name: string;
  icon?: string;
}

interface SkillConstellationProps {
  skills: SkillNode[];
  centerLabel?: string;
}

export function SkillConstellation({ skills, centerLabel = "Skills" }: SkillConstellationProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Detect theme for different opacity values
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Base delay before animations start (0.5s as requested)
  const baseDelay = 0.5;

  // Different opacity values for light vs dark mode
  // Light mode needs ~30% more visible, dark mode ~5% more visible
  const lineOpacity = isDark ? 0.55 : 0.4;
  const ringOpacity = isDark ? 0.65 : 0.5;

  // Calculate positions for nodes in a circle
  const getNodePosition = (index: number, total: number, radius: number) => {
    // Start from top (-90 degrees) and go clockwise
    const angle = ((index / total) * 360 - 90) * (Math.PI / 180);
    // Round to 2 decimal places to avoid hydration mismatches
    return {
      x: Math.round(Math.cos(angle) * radius * 100) / 100,
      y: Math.round(Math.sin(angle) * radius * 100) / 100,
    };
  };

  const radius = 200; // Distance from center to node centers
  const nodeSize = 56; // 14 * 4 = 56px (w-14)
  const centerSize = 96; // 24 * 4 = 96px (w-24)

  return (
    <div ref={containerRef} className="relative w-full max-w-[600px] mx-auto aspect-square">
      {/* SVG for connecting lines and orbital ring - z-0 to stay behind nodes */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Orbital ring - draws itself */}
        <motion.circle
          cx={250}
          cy={250}
          r={radius}
          fill="none"
          stroke="currentColor"
          className={isDark ? "text-card-border" : "text-gray-400"}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: ringOpacity } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 1.2, delay: baseDelay, ease: "easeInOut" },
            opacity: { duration: 0.5, delay: baseDelay },
          }}
          style={{ transformOrigin: '250px 250px' }}
        />

        {/* Connection lines from center to each node - with draw animation */}
        {skills.map((_, index) => {
          const pos = getNodePosition(index, skills.length, radius);
          const isActive = activeIndex === index;

          return (
            <motion.line
              key={`line-${index}`}
              x1={250}
              y1={250}
              x2={250 + pos.x}
              y2={250 + pos.y}
              stroke="currentColor"
              className={isActive ? "text-blue" : isDark ? "text-card-border" : "text-gray-400"}
              strokeWidth={isActive ? 2 : 1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? {
                pathLength: 1,
                opacity: isActive ? 1 : lineOpacity,
              } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: {
                  duration: 0.6,
                  delay: baseDelay + 0.3 + index * 0.05,
                  ease: "easeOut",
                },
                opacity: {
                  duration: 0.3,
                  delay: baseDelay + 0.3 + index * 0.05,
                },
              }}
            />
          );
        })}

        {/* Animated pulse on active line */}
        {activeIndex !== null && skills[activeIndex] && (() => {
          const pos = getNodePosition(activeIndex, skills.length, radius);
          const startX = 250;
          const startY = 250;
          const endX = 250 + pos.x;
          const endY = 250 + pos.y;
          return (
            <motion.circle
              key={`pulse-${activeIndex}`}
              cx={startX}
              cy={startY}
              r={4}
              fill="currentColor"
              className="text-blue"
              initial={{ opacity: 0, cx: startX, cy: startY }}
              animate={{
                opacity: [0, 1, 0],
                cx: [startX, endX],
                cy: [startY, endY],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          );
        })()}
      </svg>

      {/* Center node */}
      <div
        className="absolute z-10"
        style={{
          left: '50%',
          top: '50%',
          width: centerSize,
          height: centerSize,
          marginLeft: -centerSize / 2,
          marginTop: -centerSize / 2,
        }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: baseDelay, type: "spring" }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-blue/20 rounded-full blur-xl scale-150" />

          {/* Center circle */}
          <div className="techstack-button relative w-full h-full rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{centerLabel}</span>
          </div>
        </motion.div>
      </div>

      {/* Skill nodes */}
      {skills.map((skill, index) => {
        const pos = getNodePosition(index, skills.length, radius);
        const isActive = activeIndex === index;

        // Position based on percentage, accounting for the node size
        // The viewBox is 500x500, so we convert pos to percentage
        // Round to avoid hydration mismatches from floating point precision
        const leftPercent = Math.round(((250 + pos.x) / 500) * 10000) / 100;
        const topPercent = Math.round(((250 + pos.y) / 500) * 10000) / 100;

        return (
          <motion.div
            key={skill.name}
            className="absolute z-20"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              width: nodeSize,
              height: nodeSize,
              marginLeft: -nodeSize / 2,
              marginTop: -nodeSize / 2,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{
              duration: 0.5,
              delay: baseDelay + 0.1 + 0.05 * index,
              type: "spring",
              stiffness: 200,
            }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* Node glow */}
            <motion.div
              className="absolute inset-0 bg-blue/30 rounded-xl blur-lg"
              animate={{
                scale: isActive ? 1.5 : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Node content - solid bg ensures line is hidden behind */}
            <motion.div
              className={`relative w-full h-full rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-skill-node-bg-active border-2 border-blue"
                  : "bg-skill-node-bg border border-card-border hover:border-blue/50"
              }`}
              whileHover={{ scale: 1.1 }}
            >
              {skill.icon && (
                <div className="relative w-7 h-7">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </motion.div>

            {/* Label - absolutely positioned below node, doesn't affect node position */}
            <span
              className={`absolute left-1/2 -translate-x-1/2 top-full mt-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                isActive ? "text-blue" : "text-text"
              }`}
            >
              {skill.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
