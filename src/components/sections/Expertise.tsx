"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Code2,
  Accessibility,
  Zap,
  Users,
  Layers,
  Network,
  Bot
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StripeGrid, StripeGridItem } from "@/components/ui/StripeGrid";

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
  {
  icon: Bot,
  title: "AI-Augmented Development",
  description:
    "Leverage AI tools to rapidly build, iterate, and ship production-ready applications.",
},
{
  icon: Network,
  title: "Product Architecture Thinking",
  description:
    "Translate business goals and user needs into practical, scalable product solutions.",
},


];

export function Expertise() {
  return (
    <section className="py-20 expertise-container">
      <div className="max-w-7xl mx-auto px-6">
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
      </div>

      {/* Stripe-style grid - outside padded container to align with global stripe-lines */}
      <StripeGrid showGuides={false}>
        {expertiseItems.map((item, index) => (
          <StripeGridItem key={item.title}>
            <motion.div
              className="group py-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="w-12 h-12 rounded-lg bg-blue/10 flex items-center justify-center mb-4 group-hover:bg-blue/20 transition-colors duration-300"
                whileHover={{ rotate: 5 }}
              >
                <item.icon className="w-6 h-6 text-blue" />
              </motion.div>

              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue transition-colors duration-300 line-decoration">
                {item.title}
              </h3>

              <p className="text-sm text-text leading-relaxed">{item.description}</p>
            </motion.div>
          </StripeGridItem>
        ))}
      </StripeGrid>
    </section>
  );
}
