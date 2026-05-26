import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { CommandPalette } from "@/components/command-palette";
import { Nav } from "@/components/nav";
import { StructuredData } from "@/components/structured-data";

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
    default: "Priyanshu Gupta — Founder, Operator. Two acquisitions before 18.",
    template: "%s · Priyanshu Gupta",
  },
  description:
    "Priyanshu Gupta — teenage serial founder from Bengaluru. Two acquisitions (Joper · ISP Association) before turning 18. Founder of BuilderFellows. Y Combinator, Perplexity Business Fellow, MIT LaunchX, McKinsey Forward.",
  keywords: [
    "Priyanshu Gupta",
    "BuilderFellows",
    "Joper",
    "ISP Association",
    "founder",
    "Bengaluru",
    "Indian founders",
    "Y Combinator",
    "YC Startup School India",
    "Perplexity Business Fellow",
    "MIT LaunchX",
    "McKinsey Forward",
    "Polaris School of Technology",
    "teenage entrepreneur",
    "Campus CEOs",
  ],
  authors: [{ name: "Priyanshu Gupta", url: SITE_URL }],
  creator: "Priyanshu Gupta",
  publisher: "Priyanshu Gupta",
  category: "portfolio",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: "Priyanshu Gupta — Founder, Operator",
    description:
      "Two acquisitions before turning 18. Founder of BuilderFellows. Building out of Bengaluru.",
    siteName: "Priyanshu Gupta",
    locale: "en_IN",
    firstName: "Priyanshu",
    lastName: "Gupta",
    username: "i_priyanshug",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Gupta — Founder, Operator",
    description:
      "Two acquisitions before turning 18. Founder of BuilderFellows. Building out of Bengaluru.",
    creator: "@i_priyanshug",
    site: "@i_priyanshug",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // Add when you set up Google Search Console:
    // google: "<verification-code>",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
      <body className="grain antialiased" suppressHydrationWarning>
        <StructuredData />
        <LenisProvider>
          <Nav />
          <CommandPalette />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
