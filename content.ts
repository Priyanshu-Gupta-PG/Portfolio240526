// Everything on the site lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Priyanshu Gupta",
  role: "Founder · Operator",
  location: "Bengaluru, India",
  intro: [
    "I started my first company at fourteen and sold two before turning 18. Built, sold, and funded my own degree.",
    "Today I'm building BuilderFellows, a residency for student founders, and running dealflow for the Polaris E-Cell. I dropped Penn State after a month to study CS/AI in Bengaluru, because that's where the building is happening.",
  ],
  email: "priyanshuguptaunique@gmail.com",
  links: [
    { label: "X", href: "https://x.com/i_priyanshug" },
    { label: "LinkedIn", href: "https://linkedin.com/in/priyanshu--gupta" },
    { label: "Instagram", href: "https://instagram.com/priyanshuvkgupta" },
  ],
};

export type Work = {
  name: string;
  role: string;
  period: string;
  description: string;
  note?: string; // e.g. "Acquired by KiranaPro"
  href?: string;
};

export const work: Work[] = [
  {
    name: "BuilderFellows",
    role: "Founder",
    period: "2025 —",
    description:
      "A residency for the next wave of student founders. Mentorship, team-building, and funding access for builders who refuse to wait until graduation.",
  },
  {
    name: "Band9Prep",
    role: "Co-founder",
    period: "2026 —",
    description:
      "IELTS prep for students aiming for a 9. Driving product and GTM. Pre-launch.",
  },
  {
    name: "Joper",
    role: "Co-founder, Growth",
    period: "2024 — 25",
    description:
      "Hyperlocal grocery for tier-2 India. Led growth, customer acquisition, and BD.",
    note: "Acquired by KiranaPro in 8 months",
  },
  {
    name: "ISP Association",
    role: "Founder",
    period: "2021 — 24",
    description:
      "Educational organization I started at fourteen. Built the team, partnerships, and programs over three years.",
    note: "Acquired by Cross The Skylimits",
  },
  {
    name: "Cross The Skylimits",
    role: "Core Operations",
    period: "2022 — 25",
    description:
      "Joined as a management intern, promoted twice: Growth Manager, then Core Operations.",
  },
];

export const programs = [
  { name: "Y Combinator", detail: "Startup School India", year: "2026" },
  { name: "Perplexity", detail: "Business Fellow", year: "2024 — 25" },
  { name: "McKinsey", detail: "Forward", year: "2025" },
  { name: "Polaris E-Cell", detail: "Startup Relations & Dealflow", year: "2025 —" },
  { name: "IIT Bombay", detail: "Eureka! Jr.", year: "2023" },
  { name: "MIT LaunchX", detail: "Alumnus", year: "" },
];

export const featured = {
  title: "Campus CEOs, Ep. 04",
  subtitle: "How I built and sold two companies before college. Polaris School of Technology, ~12 min.",
  href: "https://youtu.be/HwwCLEwwuic",
};

export const events = [
  { name: "Anakin Hack", detail: "Hackathon · Anakin.io", date: "May 2026" },
  { name: "VibeCon", detail: "Pitched · Emergent", date: "Apr 2026" },
  { name: "Agentathon", detail: "Pitched · Lyzr", date: "Apr 2026" },
  { name: "AI Engineer's Day", detail: "Organized · OpenAI × Polaris", date: "2026" },
];
