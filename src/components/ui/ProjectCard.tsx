"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { MouseEvent, useRef } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  year: string;
  type: "Agency" | "Personal Project" | "Freelance";
  techStack?: string[];
  index?: number;
}

export function ProjectCard({
  title,
  description,
  image,
  href,
  year,
  type,
  techStack = [],
  index = 0,
}: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  // 3D tilt effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Convert to rotation (max 10 degrees)
    const rotX = (mouseY / (rect.height / 2)) * -10;
    const rotY = (mouseX / (rect.width / 2)) * 10;

    rotateX.set(rotX);
    rotateY.set(rotY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
    >
      <div className="relative overflow-hidden rounded-xl bg-card-bg border border-card-border shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-shadow-hover group-hover:border-blue/30">
        {/* Image container with zoom effect */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Type label */}
          <div className="flex items-center gap-2 text-xs text-text mb-2">
            <span className="px-2 py-1 rounded-full bg-blue/10 text-blue font-medium">
              {year}
            </span>
            <span>|</span>
            <span>{type}</span>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue transition-colors duration-300">
            {title}
          </h3>

          <p className="text-sm text-text line-clamp-2 mb-4">{description}</p>

          {/* Tech stack badges */}
          {techStack.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-1.5 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs rounded bg-foreground/5 text-text"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          )}

          {/* View link */}
          <div className="flex items-center gap-1 text-sm font-medium text-blue">
            <span>View Website</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
