"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile, links } from "@/lib/content";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#story", label: "Featured" },
  { href: "#ventures", label: "Work" },
  { href: "#journey", label: "Journey" },
  { href: "#credentials", label: "Rooms" },
  { href: "#gallery", label: "Photos" },
  { href: "#now", label: "Now" },
  { href: "#contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [now, setNow] = useState<string>("");
  const [open, setOpen] = useState(false);

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

  // lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onEsc);
      };
    }
  }, [open]);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("palette:open"));
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-4 sm:py-6"
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 transition-all duration-500",
            scrolled
              ? "max-w-[1400px] rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)]/85 backdrop-blur-md py-2"
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

          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-mono-xs">
            {navLinks.map((l) => (
              <a
                key={l.href}
                className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
                href={l.href}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
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

            {/* mobile menu trigger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
            >
              <Menu className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] md:hidden bg-[var(--color-bg)]/95 backdrop-blur-md flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--color-border)]">
              <span className="text-mono-xs text-[var(--color-fg)]">
                {profile.initials}{" "}
                <span className="text-[var(--color-fg-muted)]">
                  {profile.shortName.toLowerCase()}
                </span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)]"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
              }}
              className="flex-1 flex flex-col px-6 py-10 gap-4"
            >
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="group flex items-baseline justify-between gap-4 py-2 border-b border-[var(--color-border)]"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-mono-xs text-[var(--color-fg-dim)] tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="text-display text-[clamp(1.6rem,7vw,2.4rem)] text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
                      {l.label}
                    </span>
                  </span>
                  <span className="text-[var(--color-fg-dim)] group-hover:text-[var(--color-accent)] transition-colors text-lg">
                    ↳
                  </span>
                </motion.a>
              ))}
            </motion.nav>
            <div className="px-6 py-6 border-t border-[var(--color-border)] flex flex-col gap-3 text-mono-xs text-[var(--color-fg-muted)]">
              <div className="flex items-center justify-between">
                <span>{profile.city.toUpperCase()}, {profile.country.toUpperCase()}</span>
                {now && (
                  <span className="text-[var(--color-fg-dim)] tabular-nums">
                    {now}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-fg)] transition-colors">
                  LINKEDIN
                </a>
                <a href={links.x} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-fg)] transition-colors">
                  X
                </a>
                <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-fg)] transition-colors">
                  INSTAGRAM
                </a>
                <a href={`mailto:${profile.email}`} className="hover:text-[var(--color-fg)] transition-colors ml-auto">
                  EMAIL
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
