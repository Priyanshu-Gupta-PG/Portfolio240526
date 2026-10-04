// Everything on the site lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Priyanshu Gupta",
  role: "Founder · Operator",
  location: "Bengaluru, India",
  intro: [
    "I chat with founders for a living. I'm a third-time founder; my first two companies were acquired before I turned 18.",
    "Today I'm building BuilderFellows, a residency for student founders, and running startup relations and dealflow at the Polaris E-Cell. Most recently I did content and strategy at LaunchX.",
    "I'm a sophomore studying CS (AI/ML) at Polaris School of Technology, after dropping out of Penn State a month in. I like working where tech meets content.",
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
    name: "Polaris E-Cell",
    role: "Startup Relations & Dealflow",
    period: "2025 —",
    description:
      "Helping student founders who want to build and raise. Connecting them with E-Cell resources, VCs, and operators, and keeping deals moving.",
  },
  {
    name: "LaunchX",
    role: "Content & Strategy",
    period: "2026",
    description:
      "Interviewed Launchies, alumni, mentors, and speakers, and turned their stories into profiles, essays, and social copy. Built the story pipeline for web, email, and fundraising.",
  },
  {
    name: "Band9Prep",
    role: "Co-founder",
    period: "2026",
    description:
      "IELTS prep for students aiming for a 9. Drove product and GTM.",
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
    role: "Operations",
    period: "2022 — 25",
    description:
      "Joined as a management intern, then Growth Manager, then the core operations team, over 3.5 years.",
  },
];

// Smaller or shorter roles, shown as a compact list under Work.
export const earlier = [
  { name: "BoostEd Asia", role: "Head of Outreach & Collaborations", period: "2024 — 25" },
  { name: "Memocon", role: "Co-founder", period: "2024" },
  { name: "Raintech Software", role: "Sales Associate", period: "2024" },
  { name: "Knowledge Catalyst", role: "Founder", period: "2021 — 23" },
  { name: "Project Sarama", role: "CTO, earlier volunteer lead", period: "2021 — 23" },
];

export const programs = [
  { name: "Y Combinator", detail: "Startup School India", year: "2026" },
  { name: "Perplexity", detail: "Business Fellow", year: "2024 — 25" },
  { name: "McKinsey", detail: "Forward", year: "2025" },
  { name: "AWS", detail: "$10K credits, twice", year: "" },
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
