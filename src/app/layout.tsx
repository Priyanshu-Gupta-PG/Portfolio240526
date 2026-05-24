import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { CommandPalette } from "@/components/command-palette";
import { Nav } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://priyanshugupta.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Priyanshu Gupta — Founder, Operator",
    template: "%s · Priyanshu Gupta",
  },
  description:
    "Two acquisitions before college. Founder of BuilderFellows. Y Combinator, Perplexity, MIT LaunchX, McKinsey Forward. Building out of Bengaluru.",
  keywords: [
    "Priyanshu Gupta",
    "BuilderFellows",
    "Joper",
    "ISP Association",
    "founder",
    "Bengaluru",
    "Y Combinator",
    "Perplexity",
    "MIT LaunchX",
    "Indian founders",
  ],
  authors: [{ name: "Priyanshu Gupta" }],
  creator: "Priyanshu Gupta",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Priyanshu Gupta — Founder, Operator",
    description:
      "Two acquisitions before college. Founder of BuilderFellows. Building out of Bengaluru.",
    siteName: "Priyanshu Gupta",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Gupta — Founder, Operator",
    description:
      "Two acquisitions before college. Founder of BuilderFellows. Building out of Bengaluru.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="grain antialiased">
        <LenisProvider>
          <Nav />
          <CommandPalette />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
