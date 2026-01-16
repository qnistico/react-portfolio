"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SkillConstellation } from "@/components/ui/SkillConstellation";

const skills = [
  { name: "HTML", icon: "/images/skills/html5.svg" },
  { name: "CSS", icon: "/images/skills/css.svg" },
  { name: "React", icon: "/images/skills/react.svg" },
  { name: "TypeScript", icon: "/images/skills/typescript.svg" },
  { name: "Next.js", icon: "/images/skills/nextjs.svg" },
  { name: "Tailwind", icon: "/images/skills/tailwind.svg" },
  { name: "WordPress", icon: "/images/skills/wordpress.png" },
  { name: "Figma", icon: "/images/skills/figma.png" },
  { name: "Git", icon: "/images/skills/git.png" },
  { name: "GitHub", icon: "/images/skills/github.svg" },
  { name: "UI/UX", icon: "/images/skills/uiux.png" },
  { name: "RWD", icon: "/images/skills/rwd.png" },
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

        <ScrollReveal>
          <SkillConstellation skills={skills} centerLabel="Tech Stack" />
        </ScrollReveal>
      </div>
    </section>
  );
}
