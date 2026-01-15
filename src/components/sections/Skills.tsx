"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const skills = [
  { name: "HTML", icon: "/images/skills/html5.svg" },
  { name: "CSS", icon: "/images/skills/css.svg" },
  { name: "JavaScript", icon: "/images/skills/js.png" },
  { name: "React", icon: "/images/skills/react.svg" },
  { name: "TypeScript", icon: "/images/skills/typescript.svg" },
  { name: "Next.js", icon: "/images/skills/nextjs.svg" },
  { name: "Tailwind", icon: "/images/skills/tailwind.svg" },
  { name: "SCSS", icon: "/images/skills/sass.svg" },
  { name: "WordPress", icon: "/images/skills/wordpress.png" },
  { name: "Figma", icon: "/images/skills/figma.png" },
  { name: "Git", icon: "/images/skills/git.png" },
  { name: "GitHub", icon: "/images/skills/github.svg" },
];

export function Skills() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent to-card-bg/50">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            <span className="text-blue">My</span> Skills
          </h2>
          <p className="text-text max-w-2xl mx-auto">
            My list of web skills is always growing. Here are the ones I
            currently work with the most.
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
          staggerDelay={0.05}
        >
          {skills.map((skill) => (
            <StaggerItem key={skill.name}>
              <motion.div
                className="group flex flex-col items-center justify-center p-4 rounded-xl bg-card-bg border border-card-border hover:border-blue/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-10 h-10 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-medium text-text group-hover:text-foreground transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
