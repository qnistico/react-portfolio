"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { Expertise } from "@/components/sections/Expertise";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function Home() {
  return (
    <div className="relative">
      <LoadingScreen />
      {/* Ambient gradient blobs - dark mode only, with gentle floating animation */}
      {/* Hero area - top right purple */}
      <motion.div
        className="ambient-blob ambient-blob-hero"
        style={{
          top: '0',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          x: [0, 15, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      {/* Projects section - left side purple */}
      <motion.div
        className="ambient-blob ambient-blob-projects"
        style={{
          top: '1200px',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.08, 1],
          x: [0, -10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        aria-hidden="true"
      />
      {/* Skills/Contact area - right side cyan accent */}
      <motion.div
        className="ambient-blob ambient-blob-skills"
        style={{
          top: '2400px',
          right: '0',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.06, 1],
          x: [0, 10, 0],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        aria-hidden="true"
      />
      {/* Contact section - bottom left purple glow */}
      <motion.div
        className="ambient-blob ambient-blob-contact"
        style={{
          bottom: '200px',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.04, 1],
          x: [0, -8, 0],
          y: [0, 12, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        aria-hidden="true"
      />

      <Hero />
      <Expertise />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}
