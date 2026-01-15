import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Quinton Nistico | Front-End Developer & Designer",
  description:
    "Front-End Web Developer & Designer with 4+ years of professional agency experience, specializing in responsive, accessible web applications.",
  keywords: [
    "web developer",
    "web designer",
    "front-end developer",
    "UI/UX designer",
    "React developer",
    "Philadelphia",
  ],
  authors: [{ name: "Quinton Nistico" }],
  openGraph: {
    title: "Quinton Nistico | Front-End Developer & Designer",
    description:
      "Front-End Web Developer & Designer with 4+ years of professional agency experience.",
    url: "https://webdesignbyq.com",
    siteName: "Quinton Nistico Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                if (stored === 'theme-dark' || (!stored)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
