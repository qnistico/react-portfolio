"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Code2,
  Accessibility,
  Zap,
  Users,
  Layers,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const expertiseItems = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Create intuitive, elegant interfaces optimized for usability and engagement.",
  },
  {
    icon: Code2,
    title: "Front-End Development",
    description:
      "Build robust, responsive web applications using HTML, CSS, JavaScript, React, and WordPress.",
  },
  {
    icon: Accessibility,
    title: "Accessibility & SEO",
    description:
      "Ensure websites are accessible, inclusive, and optimized for search engines.",
  },
  {
    icon: Zap,
    title: "Performance & Scalability",
    description:
      "Write clean, maintainable code and implement best practices for fast-loading, scalable websites.",
  },
  {
    icon: Users,
    title: "Collaboration & Teamwork",
    description:
      "Work effectively within cross-functional teams to deliver projects on time and to specification.",
  },
  {
    icon: Layers,
    title: "Design Systems & Prototyping",
    description:
      "Build consistent, reusable UI components and interactive prototypes in Figma or similar tools.",
  },
];

export function Expertise() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            <span className="text-blue">My</span> Expertise
          </h2>
          <p className="text-text max-w-2xl mx-auto">
            I specialize in front-end development, UI/UX design, and responsive
            web applications. My work combines creative design with clean,
            maintainable code to deliver high-quality, accessible digital
            experiences.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseItems.map((item, index) => (
            <StaggerItem key={item.title}>
              <motion.div
                className="group p-6 rounded-xl bg-card-bg border border-card-border hover:border-blue/30 transition-all duration-300 hover:shadow-lg hover:shadow-shadow-hover"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-lg bg-blue/10 flex items-center justify-center mb-4 group-hover:bg-blue/20 transition-colors duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <item.icon className="w-6 h-6 text-blue" />
                </motion.div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-sm text-text">{item.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
