import type { Variants, Transition } from "framer-motion";

export const ease = [0.16, 1, 0.3, 1] as const;
export const easeOutExpo = [0.19, 1, 0.22, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren, staggerChildren },
  },
});

export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 1.1, ease, delay: 0.1 + i * 0.08 },
  }),
};

export const transition: Transition = { duration: 0.9, ease };
