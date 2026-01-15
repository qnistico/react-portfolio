"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "7c371e5a-e064-49f8-8c1f-4bf2af22a2ba",
          ...formState,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <ScrollReveal direction="left">
            <motion.form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-card-bg border border-card-border shadow-lg"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  Connect With Me
                </h3>
                <p className="text-sm text-text">
                  Have a project in mind? Let's talk.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-card-border text-foreground placeholder:text-text/50 focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all duration-300"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-card-border text-foreground placeholder:text-text/50 focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all duration-300"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-card-border text-foreground placeholder:text-text/50 focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all duration-300 resize-none"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue text-white font-medium hover:bg-blue-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "loading" ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-500"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Something went wrong. Please try again.</span>
                  </motion.div>
                )}
              </div>
            </motion.form>
          </ScrollReveal>

          {/* Contact info */}
          <ScrollReveal direction="right">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                <span className="text-blue">Contact</span> Me
              </h2>
              <p className="text-text mb-8">
                I'm currently open to full-time front-end development and design
                roles. With 4+ years of agency experience, I bring a balance of
                clean, scalable code and creative, user-focused design. If
                you're looking to add someone who can bridge design and
                development, I'd love to connect.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Email
                  </h3>
                  <a
                    href="mailto:quintonnistico@gmail.com"
                    className="flex items-center gap-3 text-text hover:text-blue transition-colors duration-300"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue/10">
                      <Mail className="h-5 w-5 text-blue" />
                    </span>
                    quintonnistico@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Phone
                  </h3>
                  <a
                    href="tel:6103898465"
                    className="flex items-center gap-3 text-text hover:text-blue transition-colors duration-300"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue/10">
                      <Phone className="h-5 w-5 text-blue" />
                    </span>
                    (610)-389-8465
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
