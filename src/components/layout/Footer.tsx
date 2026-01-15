"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const contactInfo = [
  {
    icon: Phone,
    label: "(610)-389-8465",
    href: "tel:6103898465",
  },
  {
    icon: Mail,
    label: "quintonnistico@gmail.com",
    href: "mailto:quintonnistico@gmail.com",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/qnistico",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/quintonnistico",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card-bg border-t border-card-border mt-20">
      <div className="max-w-[1312px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text hover:text-blue transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-text hover:text-blue transition-colors duration-300"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue/10">
                      <item.icon className="h-4 w-4 text-blue" />
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue/10 text-blue hover:bg-blue hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-card-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text">
            <p>© {currentYear} Quinton Nistico. All rights reserved.</p>
            <p>
              Built with{" "}
              <span className="text-blue">Next.js</span>,{" "}
              <span className="text-blue">TypeScript</span> &{" "}
              <span className="text-blue">Framer Motion</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
