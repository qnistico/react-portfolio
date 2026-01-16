"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Typewriter } from "@/components/ui/AnimatedText";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for dark class on document
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
      >
        {/* Gradient blobs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue/20 to-blue/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-blue/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
        style={{ opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4">
                Hi, I'm Quinton
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <p className="text-xl md:text-2xl text-foreground">
                I am a{" "}
                <span className="text-blue font-semibold">
                  <Typewriter
                    words={[
                      "web developer.",
                      "web designer.",
                      "UI/UX specialist.",
                    ]}
                    typingSpeed={100}
                    deletingSpeed={50}
                    pauseDuration={2000}
                  />
                </span>
              </p>
            </motion.div>

            <motion.p
              className="text-lg text-text mb-8 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Front-End Web Developer & Designer with 4+ years of professional
              agency experience, specializing in responsive, accessible web
              applications. I build high-quality digital experiences that
              combine creative design with clean, maintainable code.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <MagneticButton href="#projects" variant="primary" size="lg">
                View My Work
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary" size="lg">
                Contact Me
              </MagneticButton>
            </motion.div>
          </div>

          {/* Portrait image with floating animation */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-blue/20 rounded-full blur-3xl scale-90" />

              {/* Portrait container - show both images, hide one based on theme */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <Image
                  src="/images/portraitDark.png"
                  alt="Quinton Nistico"
                  fill
                  unoptimized
                  className={`object-contain transition-opacity duration-300 ${
                    isDark ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                />
                <Image
                  src="/images/portraitLight.png"
                  alt="Quinton Nistico"
                  fill
                  unoptimized
                  className={`object-contain transition-opacity duration-300 ${
                    isDark ? "opacity-0" : "opacity-100"
                  }`}
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-text/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-blue"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
