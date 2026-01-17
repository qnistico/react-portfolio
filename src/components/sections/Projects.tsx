"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { agencyProjects, personalProjects, type Project } from "@/data/projects";

// Reusable scrollable project showcase
function ProjectShowcase({
  projects,
  showGithub = false
}: {
  projects: Project[];
  showGithub?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 420 + 24; // card width + gap
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    }
  };

  const handleScrollLeft = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleScrollRight = () => {
    const newIndex = Math.min(projects.length - 1, activeIndex + 1);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  // Mouse drag handlers - using clientX for reliable tracking
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartScrollLeft.current = scrollRef.current.scrollLeft;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const deltaX = e.clientX - dragStartX.current;
    scrollRef.current.scrollLeft = dragStartScrollLeft.current - deltaX;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Don't stop dragging on leave - global events handle it
  }, []);

  // Global mouse events for reliable drag tracking
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const deltaX = e.clientX - dragStartX.current;
      scrollRef.current.scrollLeft = dragStartScrollLeft.current - deltaX;
    };

    const handleGlobalMouseUp = () => {
      if (scrollRef.current) {
        // Smoothly scroll to nearest card instead of letting CSS snap teleport
        const cardWidth = 420 + 24;
        const nearestIndex = Math.round(scrollRef.current.scrollLeft / cardWidth);
        const clampedIndex = Math.max(0, Math.min(nearestIndex, projects.length - 1));
        scrollRef.current.scrollTo({ left: clampedIndex * cardWidth, behavior: "smooth" });
        setActiveIndex(clampedIndex);
      }
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, projects.length]);

  // Update active index on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = 420 + 24;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, projects.length - 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [projects.length]);

  return (
    <div className="relative z-10">
      {/* Navigation controls - dots on left, arrows on right */}
      <div className="flex items-center justify-between mb-6">
        {/* Progress dots */}
        <div className="flex gap-2 relative z-20">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                scrollToIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex
                  ? "w-8 bg-blue"
                  : "w-2 bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow navigation */}
        <div className="flex gap-2">
          <motion.button
            onClick={handleScrollLeft}
            className="p-2 rounded-full bg-card-bg border border-card-border text-foreground hover:border-blue hover:text-blue transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={activeIndex === 0}
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={handleScrollRight}
            className="p-2 rounded-full bg-card-bg border border-card-border text-foreground hover:border-blue hover:text-blue transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={activeIndex === projects.length - 1}
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className={`flex gap-6 overflow-x-auto overflow-y-hidden pb-4 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } ${!isDragging ? "snap-x snap-mandatory" : ""}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`flex-shrink-0 w-[420px] ${!isDragging ? "snap-start" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="group h-full flex flex-col rounded-2xl bg-card-bg border border-card-border shadow-card overflow-hidden transition-all duration-300 hover:border-blue/30 hover:shadow-lg hover:shadow-shadow-hover">
              {/* Image - clickable */}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-56 overflow-hidden flex-shrink-0 block"
                onClick={(e) => isDragging && e.preventDefault()}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />
                {/* Blue gradient overlay for branded look */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue/50 via-blue/30 to-blue/10" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm font-medium">View Site</span>
                </div>
              </a>

              {/* Content - flex-grow to fill remaining space */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-text mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-blue/10 text-blue font-medium">
                    {project.year}
                  </span>
                  <span>{project.type}</span>
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue transition-colors">
                  {project.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-text line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4 min-h-[60px]">
                  {project.techStack && project.techStack.length > 0 && (
                    project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue/10 text-blue border border-blue/20 h-fit"
                      >
                        {tech}
                      </span>
                    ))
                  )}
                </div>

                {/* Spacer to push buttons to bottom */}
                <div className="flex-grow" />

                {/* Action buttons - always at bottom */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => isDragging && e.preventDefault()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-button-bg text-white rounded-lg text-sm font-medium hover:bg-button-hover transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Live
                  </a>
                  {showGithub && project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => isDragging && e.preventDefault()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-card-border text-foreground rounded-lg text-sm font-medium hover:border-blue hover:text-blue transition-colors"
                    >
                      <SiGithub className="w-3.5 h-3.5" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div className="h-1 bg-card-border rounded-full mt-4 overflow-hidden">
        <motion.div
          className="h-full bg-blue rounded-full"
          style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
        />
      </motion.div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Personal Projects Section */}
        <ScrollReveal className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              <span className="text-blue">Featured</span> Work
            </h2>
            <div className="hidden flex-1 h-px bg-gradient-to-r from-blue/50 to-transparent" />
          </div>
          <p className="text-text max-w-2xl">
            Personal projects and freelance work showcasing my full-stack
            capabilities with modern technologies.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <ProjectShowcase projects={personalProjects} showGithub={true} />
        </ScrollReveal>

        {/* Agency Work Section */}
        <ScrollReveal className="mt-32 mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              <span className="text-blue">Agency</span> Portfolio
            </h2>
            <div className="hidden flex-1 h-px bg-gradient-to-r from-blue/50 to-transparent" />
          </div>
          <p className="text-text max-w-2xl">
            A selection of projects from my 4+ years at{" "}
            <a
              href="https://www.insivia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:underline"
            >
              Insivia
            </a>
            , a growth-focused digital agency. These projects are the property
            of the agency and its clients.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <ProjectShowcase projects={agencyProjects} />
        </ScrollReveal>
      </div>
    </section>
  );
}
