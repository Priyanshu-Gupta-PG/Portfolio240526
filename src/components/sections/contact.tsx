"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile, links } from "@/lib/content";
import { Magnetic } from "@/components/ui/magnetic";
import { WordReveal } from "@/components/ui/reveal";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full px-6 sm:px-10 pt-32 sm:pt-48 pb-12 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-baseline gap-3">
          <span className="text-mono-xs text-[var(--color-accent)]">08</span>
          <span className="text-mono-xs text-[var(--color-fg-muted)]">CONTACT</span>
        </div>

        <div className="mt-10">
          <h2 className="text-display text-[clamp(3rem,10vw,9rem)] text-[var(--color-fg)] leading-[0.95]">
            <WordReveal delay={0.1}>Let&apos;s build</WordReveal>
            <br />
            <span className="text-display-italic text-[var(--color-fg-muted)]">
              <WordReveal delay={0.3}>something.</WordReveal>
            </span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-10"
        >
          <div className="md:col-span-6 lg:col-span-5">
            <p className="text-mono-xs text-[var(--color-fg-muted)] mb-3">EMAIL</p>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-baseline gap-3 text-[clamp(1.25rem,2.4vw,2rem)] text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
              >
                <span className="border-b border-[var(--color-border-strong)] group-hover:border-[var(--color-accent)] transition-colors pb-1">
                  {profile.email}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
              </a>
            </Magnetic>
            <p className="mt-4 text-sm text-[var(--color-fg-muted)] max-w-sm">
              Best for: introductions, collaboration, fellowship questions, or
              just to say hi.
            </p>
          </div>

          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8 grid grid-cols-2 gap-x-6 gap-y-8 self-start">
            <ContactLink label="LINKEDIN" handle="priyanshu--gupta" href={links.linkedin} />
            <ContactLink label="X / TWITTER" handle="@i_priyanshug" href={links.x} />
            <ContactLink label="INSTAGRAM" handle="priyanshuvkgupta" href={links.instagram} />
          </div>
        </motion.div>

        <div className="hairline mt-24 sm:mt-32" />

        <footer className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 text-mono-xs text-[var(--color-fg-muted)]">
          <div>
            <div className="text-[var(--color-fg-dim)] mb-1.5">SITE</div>
            <div>{profile.domain}</div>
          </div>
          <div>
            <div className="text-[var(--color-fg-dim)] mb-1.5">BASED</div>
            <div>{profile.city}, {profile.country}</div>
          </div>
          <div>
            <div className="text-[var(--color-fg-dim)] mb-1.5">YEAR</div>
            <div>©{new Date().getFullYear()} {profile.name}</div>
          </div>
          <div>
            <div className="text-[var(--color-fg-dim)] mb-1.5">SHORTCUT</div>
            <div>
              <kbd className="rounded border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-1.5 py-0.5 text-[10px] text-[var(--color-fg-dim)] mr-1">⌘K</kbd>
              search
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

function ContactLink({
  label,
  handle,
  href,
}: {
  label: string;
  handle: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex flex-col items-start gap-1.5"
    >
      <span className="text-mono-xs text-[var(--color-fg-muted)]">{label}</span>
      <span className="inline-flex items-center gap-1.5 text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
        {handle}
        <ArrowUpRight
          className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
          strokeWidth={1.5}
        />
      </span>
    </a>
  );
}
