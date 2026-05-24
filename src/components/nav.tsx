"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
    setNow(fmt());
    const id = window.setInterval(() => setNow(fmt()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("palette:open"));
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between px-6 sm:px-10 transition-all duration-500",
          scrolled
            ? "max-w-[1400px] rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)]/80 backdrop-blur-md py-2"
            : "max-w-[1500px]"
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-3 group"
          aria-label="Priyanshu Gupta — home"
        >
          <span className="text-mono-xs text-[var(--color-fg)] tabular-nums">
            {profile.initials}
          </span>
          <span className="hidden sm:inline text-mono-xs text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] transition-colors">
            {profile.shortName.toLowerCase()}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-mono-xs">
          <a className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors" href="#story">
            Featured
          </a>
          <a className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors" href="#ventures">
            Work
          </a>
          <a className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors" href="#journey">
            Journey
          </a>
          <a className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors" href="#credentials">
            Rooms
          </a>
          <a className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors" href="#gallery">
            Photos
          </a>
          <a className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors" href="#now">
            Now
          </a>
          <a className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors" href="#contact">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openPalette}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-3 py-1.5 text-mono-xs text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:border-[var(--color-fg-dim)] transition-colors"
            aria-label="Open command palette"
          >
            <span>Search</span>
            <kbd className="rounded border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-1.5 text-[10px] text-[var(--color-fg-dim)]">
              ⌘K
            </kbd>
          </button>
          <AnimatePresence>
            {now && (
              <motion.span
                key={now}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:inline text-mono-xs text-[var(--color-fg-dim)] tabular-nums"
              >
                BLR · {now}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
