"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Web3Forms access key
const WEB3FORMS_KEY = "7c371e5a-e064-49f8-8c1f-4bf2af22a2ba";
// Web3Forms public hCaptcha sitekey (invisible mode)
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

declare global {
  interface Window {
    hcaptcha?: {
      reset: (widgetId?: string) => void;
      execute: (widgetId?: string) => void;
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
    };
  }
}

// Animated input with floating label
function AnimatedInput({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
}: {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <motion.input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-4 pt-6 rounded-xl bg-background border-2 border-card-border text-foreground focus:outline-none focus:border-blue transition-colors duration-300 peer"
      />
      <motion.label
        className="absolute left-4 pointer-events-none text-text/60 origin-left"
        animate={{
          top: isFocused || hasValue ? 8 : 18,
          scale: isFocused || hasValue ? 0.75 : 1,
          color: isFocused ? "var(--blue)" : "var(--text)",
        }}
        transition={{ duration: 0.2 }}
      >
        {placeholder}
      </motion.label>
      {/* Focus line animation */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-0.5 bg-blue rounded-full"
        initial={{ width: 0, x: "-50%" }}
        animate={{
          width: isFocused ? "100%" : 0,
          x: "-50%",
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

// Animated textarea with floating label
function AnimatedTextarea({
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  rows = 5,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <motion.textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-4 pt-6 rounded-xl bg-background border-2 border-card-border text-foreground focus:outline-none focus:border-blue transition-colors duration-300 resize-none peer"
      />
      <motion.label
        className="absolute left-4 pointer-events-none text-text/60 origin-left"
        animate={{
          top: isFocused || hasValue ? 8 : 18,
          scale: isFocused || hasValue ? 0.75 : 1,
          color: isFocused ? "var(--blue)" : "var(--text)",
        }}
        transition={{ duration: 0.2 }}
      >
        {placeholder}
      </motion.label>
      <motion.div
        className="absolute bottom-0 left-1/2 h-0.5 bg-blue rounded-full"
        initial={{ width: 0, x: "-50%" }}
        animate={{
          width: isFocused ? "100%" : 0,
          x: "-50%",
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

// Social link with hover effect
function SocialLink({
  href,
  icon: Icon,
  label,
  delay,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-4 rounded-xl bg-card-bg border border-card-border hover:border-blue/50 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 group-hover:bg-blue/20 transition-colors duration-300">
        <Icon className="h-5 w-5 text-blue" />
      </span>
      <span className="text-foreground font-medium group-hover:text-blue transition-colors duration-300">
        {label}
      </span>
    </motion.a>
  );
}

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const hcaptchaWidgetId = useRef<string | null>(null);
  const hcaptchaContainerRef = useRef<HTMLDivElement>(null);
  const formStateRef = useRef(formState);
  formStateRef.current = formState;

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Load hCaptcha script and render invisible widget
  useEffect(() => {
    const loadHcaptcha = () => {
      if (!hcaptchaContainerRef.current || hcaptchaWidgetId.current !== null) return;

      if (window.hcaptcha) {
        hcaptchaWidgetId.current = window.hcaptcha.render(hcaptchaContainerRef.current, {
          sitekey: HCAPTCHA_SITEKEY,
          size: "invisible",
          callback: (token: string) => {
            submitForm(token);
          },
          "error-callback": () => {
            setStatus("error");
          },
        });
      }
    };

    if (document.getElementById("hcaptcha-script")) {
      if (window.hcaptcha) {
        loadHcaptcha();
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "hcaptcha-script";
    script.src = "https://js.hcaptcha.com/1/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = loadHcaptcha;
    document.head.appendChild(script);
  }, []);

  const submitForm = async (captchaToken: string) => {
    const currentForm = formStateRef.current;
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact: ${currentForm.name}`,
          from_name: "Portfolio Contact Form",
          "h-captcha-response": captchaToken,
          ...currentForm,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
        if (hcaptchaWidgetId.current !== null) {
          window.hcaptcha?.reset(hcaptchaWidgetId.current);
        }
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Web3Forms error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (window.hcaptcha && hcaptchaWidgetId.current !== null) {
      window.hcaptcha.execute(hcaptchaWidgetId.current);
    } else {
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
    <section ref={sectionRef} id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-blue/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-blue/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4 text-blue" />
            <span className="text-sm font-medium text-blue">Let's Connect</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Get In <span className="text-blue">Touch</span>
          </h2>
          <p className="text-text max-w-xl mx-auto">
            I'm currently open to full-time front-end development and design roles.
            Let's build something great together.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Form - Takes 3 columns */}
          <ScrollReveal className="lg:col-span-3">
            <motion.form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-card-bg/80 backdrop-blur-sm border border-card-border shadow-card relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Decorative corner gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue/10 to-transparent rounded-bl-full" />

              <div className="relative z-10 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <AnimatedInput
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    disabled={status === "loading"}
                  />
                  <AnimatedInput
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    disabled={status === "loading"}
                  />
                </div>

                <AnimatedTextarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  disabled={status === "loading"}
                  rows={6}
                />

                {/* Invisible hCaptcha container */}
                <div ref={hcaptchaContainerRef} />

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-button-bg text-white font-semibold text-lg hover:bg-button-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <span className="relative z-10 flex items-center gap-2">
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
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Status messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Message sent successfully!</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Please complete the captcha and try again.</span>
                  </motion.div>
                )}
              </div>
            </motion.form>
          </ScrollReveal>

          {/* Contact info - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal>
              <div className="p-6 rounded-2xl bg-card-bg/80 backdrop-blur-sm border border-card-border">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <motion.a
                    href="mailto:quintonnistico@gmail.com"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue/5 transition-colors duration-300 group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 group-hover:bg-blue/20 transition-colors duration-300">
                      <Mail className="h-5 w-5 text-blue" />
                    </span>
                    <div>
                      <p className="text-sm text-text">Email</p>
                      <p className="text-foreground font-medium group-hover:text-blue transition-colors">
                        quintonnistico@gmail.com
                      </p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:6103898465"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue/5 transition-colors duration-300 group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 group-hover:bg-blue/20 transition-colors duration-300">
                      <Phone className="h-5 w-5 text-blue" />
                    </span>
                    <div>
                      <p className="text-sm text-text">Phone</p>
                      <p className="text-foreground font-medium group-hover:text-blue transition-colors">
                        (610) 389-8465
                      </p>
                    </div>
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="p-6 rounded-2xl bg-card-bg/80 backdrop-blur-sm border border-card-border">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Connect Online
                </h3>
                <div className="grid gap-3">
                  <SocialLink
                    href="https://github.com/quintonnistico"
                    icon={SiGithub}
                    label="GitHub"
                    delay={0.1}
                  />
                  <SocialLink
                    href="https://linkedin.com/in/quinton-nistico"
                    icon={SiLinkedin}
                    label="LinkedIn"
                    delay={0.2}
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Availability badge */}
            <ScrollReveal>
              <motion.div
                className="p-6 rounded-2xl bg-gradient-to-br from-blue/10 to-blue/5 border border-blue/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-foreground">Available for Work</span>
                </div>
                <p className="text-sm text-text">
                  Currently seeking full-time opportunities in front-end development and design.
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
