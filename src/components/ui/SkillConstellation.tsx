"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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

  // Calculate positions for nodes in a circle
  const getNodePosition = (index: number, total: number, radius: number) => {
    // Start from top (-90 degrees) and go clockwise
    const angle = ((index / total) * 360 - 90) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const radius = 200; // Distance from center to node centers
  const nodeSize = 56; // 14 * 4 = 56px (w-14)
  const centerSize = 96; // 24 * 4 = 96px (w-24)

  return (
    <div className="relative w-full max-w-[600px] mx-auto aspect-square">
      {/* SVG for connecting lines and orbital ring - centered in container */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Orbital ring */}
        <motion.circle
          cx={250}
          cy={250}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-card-border"
          strokeWidth={1}
          strokeDasharray="4 4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transformOrigin: '250px 250px' }}
        />

        {/* Connection lines from center to each node */}
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
              className={isActive ? "text-blue" : "text-card-border"}
              strokeWidth={isActive ? 2 : 1}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isActive ? 1 : 0.3,
              }}
              transition={{
                duration: 0.3,
              }}
            />
          );
        })}

        {/* Animated pulse on active line */}
        {activeIndex !== null && (() => {
          const pos = getNodePosition(activeIndex, skills.length, radius);
          return (
            <motion.circle
              r={4}
              fill="currentColor"
              className="text-blue"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                cx: [250, 250 + pos.x],
                cy: [250, 250 + pos.y],
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
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-blue/20 rounded-full blur-xl scale-150" />

          {/* Center circle */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue to-blue-hover flex items-center justify-center">
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
        const leftPercent = ((250 + pos.x) / 500) * 100;
        const topPercent = ((250 + pos.y) / 500) * 100;

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
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.03 * index,
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

            {/* Node content */}
            <motion.div
              className={`relative w-full h-full rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-blue/10 border-2 border-blue"
                  : "bg-card-bg border border-card-border hover:border-blue/50"
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
