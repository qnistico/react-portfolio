"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { agencyProjects, personalProjects, type Project } from "@/data/projects";

type FilterType = "all" | "personal" | "agency";

export function Projects() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredProjects = (): Project[] => {
    switch (filter) {
      case "personal":
        return personalProjects;
      case "agency":
        return agencyProjects;
      default:
        // Show personal projects first (newest/best work)
        return [...personalProjects, ...agencyProjects];
    }
  };

  const filterButtons: { value: FilterType; label: string }[] = [
    { value: "all", label: "All Projects" },
    { value: "personal", label: "Personal & Freelance" },
    { value: "agency", label: "Agency Work" },
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            <span className="text-blue">Featured</span> Projects
          </h2>
          <p className="text-text max-w-2xl mx-auto mb-8">
            A selection of my work across personal projects and professional
            agency work. Each project showcases my ability to create
            high-quality, user-focused digital experiences.
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {filterButtons.map((btn) => (
              <motion.button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === btn.value
                    ? "bg-blue text-white shadow-lg"
                    : "bg-card-bg border border-card-border text-text hover:border-blue hover:text-blue"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Agency disclaimer */}
        {(filter === "agency" || filter === "all") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 rounded-lg bg-blue/5 border border-blue/20 text-center"
          >
            <p className="text-sm text-text">
              <span className="text-blue font-semibold">Note:</span> Agency
              projects are the property of{" "}
              <a
                href="https://www.insivia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:underline"
              >
                Insivia
              </a>
              . These represent a sample of the many websites I contributed to in
              this capacity.
            </p>
          </motion.div>
        )}

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects().map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  href={project.href}
                  year={project.year}
                  type={project.type}
                  techStack={project.techStack}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
