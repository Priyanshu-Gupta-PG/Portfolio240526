"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Command } from "lucide-react";
import { links, profile, ventures } from "@/lib/content";
import { cn } from "@/lib/utils";

type Item = {
  label: string;
  hint: string;
  kind: "section" | "external" | "action";
  action: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    const scrollTo = (id: string) => () => {
      setOpen(false);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    const openLink = (href: string) => () => {
      setOpen(false);
      window.open(href, "_blank", "noopener,noreferrer");
    };
    const venturePages: Item[] = ventures.map((v) => ({
      label: v.name,
      hint: v.status === "acquired" ? `Acquired by ${v.acquirer}` : v.role,
      kind: "section",
      action: scrollTo("ventures"),
    }));
    return [
      { label: "Home", hint: "Top of the page", kind: "section", action: scrollTo("top") },
      { label: "Featured on Polaris", hint: "Campus CEOs · Episode 04 · ~12 min", kind: "section", action: scrollTo("story") },
      { label: "Work", hint: "Companies & exits", kind: "section", action: scrollTo("ventures") },
      { label: "Journey", hint: "Timeline 2021 → today", kind: "section", action: scrollTo("journey") },
      { label: "Rooms", hint: "YC · Perplexity · MIT · McKinsey", kind: "section", action: scrollTo("credentials") },
      { label: "Photos", hint: "Out in the wild", kind: "section", action: scrollTo("gallery") },
      { label: "Now", hint: "What I'm building this week", kind: "section", action: scrollTo("now") },
      { label: "Contact", hint: "Email & socials", kind: "section", action: scrollTo("contact") },
      ...venturePages,
      { label: "LinkedIn", hint: "@priyanshu--gupta", kind: "external", action: openLink(links.linkedin) },
      { label: "X / Twitter", hint: "@i_priyanshug", kind: "external", action: openLink(links.x) },
      { label: "Instagram", hint: "@priyanshuvkgupta", kind: "external", action: openLink(links.instagram) },
      { label: "YouTube · Campus CEOs", hint: "17yo who funded his own education", kind: "external", action: openLink(links.youtube) },
      { label: "Email", hint: profile.email, kind: "action", action: openLink(`mailto:${profile.email}`) },
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
      setActive(0);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onListNav = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.action();
      }
    };
    window.addEventListener("keydown", onListNav);
    return () => window.removeEventListener("keydown", onListNav);
  }, [open, filtered, active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 bg-[var(--color-bg)]/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-bg-soft)] shadow-2xl shadow-black/60 overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-4">
              <Command className="h-4 w-4 text-[var(--color-fg-dim)]" strokeWidth={1.5} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Jump to anything…"
                className="flex-1 bg-transparent text-[var(--color-fg)] placeholder:text-[var(--color-fg-dim)] focus:outline-none text-sm"
              />
              <kbd className="rounded border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-1.5 py-0.5 text-[10px] text-[var(--color-fg-dim)]">
                ESC
              </kbd>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-[var(--color-fg-dim)]">
                  No results for &ldquo;{query}&rdquo;
                </li>
              )}
              {filtered.map((item, i) => (
                <li key={`${item.label}-${i}`}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => item.action()}
                    className={cn(
                      "w-full flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition-colors",
                      active === i
                        ? "bg-[var(--color-bg)] text-[var(--color-fg)]"
                        : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg)]/60"
                    )}
                  >
                    <span className="flex items-baseline gap-3 min-w-0">
                      <span className="text-sm">{item.label}</span>
                      <span className="text-xs text-[var(--color-fg-dim)] truncate">
                        {item.hint}
                      </span>
                    </span>
                    {item.kind === "external" && (
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--color-fg-dim)]" strokeWidth={1.5} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-[var(--color-border)] px-5 py-2.5 text-[10px] text-[var(--color-fg-dim)]">
              <span className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </span>
              <span>command palette</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
