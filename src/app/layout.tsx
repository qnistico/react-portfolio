import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoadingProvider } from "@/context/LoadingContext";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
// Custom cursor disabled - using default cursor
// import { CustomCursor } from "@/components/ui/CustomCursor";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const siteUrl = "https://webdesignbyq.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quinton Nistico | Front-End Developer & Designer",
    template: "%s | Quinton Nistico",
  },
  description:
    "Front-End Web Developer & Designer with 4+ years of professional agency experience, specializing in responsive, accessible web applications using React, TypeScript, and Next.js.",
  keywords: [
    "web developer",
    "web designer",
    "front-end developer",
    "UI/UX designer",
    "React developer",
    "TypeScript developer",
    "Next.js developer",
    "Philadelphia web developer",
    "responsive web design",
    "accessible web applications",
    "small business web developer",
    "small business web designer",
    "user interface",
    "user experience",
  ],
  authors: [{ name: "Quinton Nistico", url: siteUrl }],
  creator: "Quinton Nistico",
  publisher: "Quinton Nistico",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Quinton Nistico Portfolio",
    title: "Quinton Nistico | Front-End Developer & Designer",
    description:
      "Front-End Web Developer & Designer with 4+ years of professional agency experience, specializing in responsive, accessible web applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quinton Nistico - Front-End Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quinton Nistico | Front-End Developer & Designer",
    description:
      "Front-End Web Developer & Designer with 4+ years of professional agency experience.",
    images: ["/og-image.png"],
    creator: "@quintonnistico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Quinton Nistico",
  url: siteUrl,
  image: `${siteUrl}/images/portraitDark.webp`,
  sameAs: [
    "https://github.com/qnistico",
    "https://linkedin.com/in/quinton-nistico",
  ],
  jobTitle: "Web Developer and Designer",
  description:
    "Front-End Web Developer & Designer with 4+ years of professional agency experience, specializing in responsive, accessible web applications.",
  email: "quintonnistico@gmail.com",
  telephone: "6103898465",
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "UI/UX Design",
    "Web Development",
    "Responsive Design",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Philadelphia",
    addressRegion: "Pennsylvania",
    addressCountry: "USA",
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
        {/* Prevent flash of wrong theme - default to dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                if (stored === 'dark' || !stored) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <LoadingProvider>
          <LoadingScreen />
          {/* <CustomCursor /> */}
          {/* Stripe-style vertical lines */}
          <div className="stripe-lines" aria-hidden="true" />
          <Header />
          <main className="relative z-10">{children}</main>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
