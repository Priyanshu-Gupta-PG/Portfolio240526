import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://priyanshugupta.in"),
  title: "Priyanshu Gupta",
  description:
    "Founder from Bengaluru. Two acquisitions before 18. Building BuilderFellows.",
  openGraph: {
    title: "Priyanshu Gupta",
    description: "Founder from Bengaluru. Two acquisitions before 18.",
    url: "https://priyanshugupta.in",
  },
  twitter: { card: "summary", creator: "@i_priyanshug" },
};

// Runs before paint so a saved theme choice never flashes.
const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
