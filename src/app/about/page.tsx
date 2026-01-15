"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MapPin, Briefcase, GraduationCap, Code2, Palette, Users } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const experiences = [
  {
    title: "Front-End Developer & Designer",
    company: "Insivia",
    period: "2020 - 2024",
    description:
      "Led front-end development for 50+ client websites. Designed and built responsive interfaces, collaborated with marketing teams, and mentored junior developers.",
  },
];

const skills = [
  { category: "Development", items: ["React", "TypeScript", "Next.js", "JavaScript", "HTML/CSS", "Tailwind"] },
  { category: "Design", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "UI/UX", "Responsive Design"] },
  { category: "Tools", items: ["Git", "VS Code", "WordPress", "Vercel", "Firebase", "REST APIs"] },
];

const values = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "I write maintainable, well-documented code that other developers can easily understand and build upon.",
  },
  {
    icon: Palette,
    title: "Design Thinking",
    description: "Every project starts with understanding user needs and designing solutions that are both beautiful and functional.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "I thrive in team environments and believe the best products come from diverse perspectives working together.",
  },
];

export default function AboutPage() {
  const [isDark, setIsDark] = useState(true);

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

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <ScrollReveal>
              <motion.div
                className="relative mx-auto lg:mx-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-blue/20 rounded-2xl blur-3xl scale-90" />
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border border-card-border">
                  <Image
                    src={isDark ? "/images/portraitDark.webp" : "/images/portraitLight.webp"}
                    alt="Quinton Nistico"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Content */}
            <ScrollReveal>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-blue font-semibold text-sm uppercase tracking-wider">
                    About Me
                  </span>
                  <h1 className="text-4xl md:text-5xl font-black text-foreground mt-2 mb-6">
                    Quinton Nistico
                  </h1>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 text-text mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <MapPin className="w-4 h-4 text-blue" />
                  <span>Philadelphia, PA</span>
                </motion.div>

                <motion.p
                  className="text-lg text-text mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  I'm a Front-End Developer & Designer with 4+ years of professional
                  agency experience. I specialize in creating responsive, accessible
                  web applications that combine creative design with clean, maintainable code.
                </motion.p>

                <motion.p
                  className="text-text mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  My passion lies at the intersection of design and development. I believe
                  that great user experiences come from understanding both the visual and
                  technical aspects of web development. When I'm not coding, you can find
                  me exploring new design trends or contributing to open-source projects.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <MagneticButton href="/#contact" variant="primary">
                    Get In Touch
                  </MagneticButton>
                  <MagneticButton
                    href="/resume.pdf"
                    variant="secondary"
                    target="_blank"
                  >
                    Download Resume
                  </MagneticButton>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-transparent via-blue/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              What I <span className="text-blue">Value</span>
            </h2>
            <p className="text-text max-w-2xl mx-auto">
              The principles that guide my work and collaboration with others.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={value.title}>
                <motion.div
                  className="p-8 rounded-xl bg-card-bg border border-card-border h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text">{value.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-12">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                <span className="text-blue">Work</span> Experience
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue/50 to-transparent" />
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ScrollReveal key={exp.company}>
                <motion.div
                  className="p-8 rounded-xl bg-card-bg border border-card-border"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-blue mt-1">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <span className="px-4 py-1 rounded-full bg-blue/10 text-blue text-sm font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-text">{exp.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-12">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                <span className="text-blue">Skills</span> & Tools
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue/50 to-transparent" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <ScrollReveal key={skillGroup.category}>
                <motion.div
                  className="p-6 rounded-xl bg-card-bg border border-card-border"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm rounded-full bg-blue/10 text-blue border border-blue/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-12">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                <span className="text-blue">Education</span>
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue/50 to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <motion.div
              className="p-8 rounded-xl bg-card-bg border border-card-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-lg bg-blue/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Temple University
                  </h3>
                  <p className="text-text">Bachelor of Science in Computer Science</p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
