import { Hero } from "@/components/sections/Hero";
import { Expertise } from "@/components/sections/Expertise";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative">
      {/* Ambient gradient blobs - dark mode only, stationary at strategic locations */}
      {/* Hero area - top right purple */}
      <div
        className="ambient-blob ambient-blob-hero"
        style={{
          top: '0',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Projects section - left side purple */}
      <div
        className="ambient-blob ambient-blob-projects"
        style={{
          top: '1200px',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Skills/Contact area - right side cyan accent */}
      <div
        className="ambient-blob ambient-blob-skills"
        style={{
          top: '2400px',
          right: '0',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Contact section - bottom left purple glow */}
      <div
        className="ambient-blob ambient-blob-contact"
        style={{
          bottom: '200px',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
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
