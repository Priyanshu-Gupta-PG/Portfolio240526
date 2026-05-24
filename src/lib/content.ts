export const profile = {
  name: "Priyanshu Gupta",
  shortName: "Priyanshu",
  initials: "PG",
  role: "Founder · Operator",
  city: "Bengaluru",
  country: "India",
  email: "priyanshuguptaunique@gmail.com",
  altEmail: "builderfellows@gmail.com",
  phone: "+91 75260 45202",
  domain: "priyanshugupta.in",
  story: {
    headline: ["Two acquisitions", "before college."],
    sub: "Built. Sold. Funded my own degree.",
    where: "Currently building BuilderFellows out of Bengaluru.",
  },
  manifesto: [
    "I started my first company at fourteen.",
    "Sold two before I was old enough to vote in most countries.",
    "Dropped a Penn State degree after thirty days to study CS in Bengaluru — because that's where the building is happening.",
    "Today I run dealflow for a university VC, sit in rooms with the founders building India's next decade, and ship products to teenagers who remind me of myself four years ago.",
    "If the future of India is being built by people my age, I want to be in the room when it's wired.",
  ],
} as const;

export const links = {
  linkedin: "https://linkedin.com/in/priyanshu--gupta",
  instagram: "https://instagram.com/priyanshuvkgupta",
  x: "https://x.com/i_priyanshug",
  youtube: "https://youtu.be/HwwCLEwwuic",
  email: "mailto:priyanshuguptaunique@gmail.com",
  builderFellows: "https://builderfellows.com",
} as const;

export type Venture = {
  name: string;
  role: string;
  status: "active" | "acquired" | "past";
  acquirer?: string;
  start: string;
  end?: string;
  blurb: string;
  detail: string;
  metrics?: { label: string; value: string }[];
  url?: string;
};

export const ventures: Venture[] = [
  {
    name: "BuilderFellows",
    role: "Founder",
    status: "active",
    start: "Aug 2025",
    blurb: "A residency for the next wave of student founders.",
    detail:
      "Mentorship, team-building, and funding access for builders who refuse to wait until graduation. Curriculum + capital + a real network — the things I needed at 15 and never had.",
    metrics: [
      { label: "Stage", value: "Live" },
      { label: "Cohort", value: "Rolling" },
    ],
  },
  {
    name: "Band9Prep",
    role: "Co-Founder",
    status: "active",
    start: "Jan 2026",
    blurb: "EdTech for IELTS test prep — built for students who need a 9.",
    detail:
      "Driving product and GTM. Targeting the segment that current prep platforms underserve: ambitious test-takers aiming for the top band.",
    metrics: [{ label: "Stage", value: "Pre-launch" }],
  },
  {
    name: "Joper",
    role: "Co-Founder, Growth",
    status: "acquired",
    acquirer: "KiranaPro",
    start: "Jul 2024",
    end: "Feb 2025",
    blurb: "Hyperlocal grocery for tier-2 India. Acquired in eight months.",
    detail:
      "Led growth, customer acquisition, and BD. Closed the acquisition with KiranaPro — the AI-powered quick-commerce platform expanding its retail network across 25+ Indian cities.",
    metrics: [
      { label: "Time to exit", value: "8 months" },
      { label: "Cities served", value: "25+" },
    ],
  },
  {
    name: "ISP Association",
    role: "Founder",
    status: "acquired",
    acquirer: "Cross The Skylimits",
    start: "Apr 2021",
    end: "Jul 2024",
    blurb: "Educational organization scaled over three years to acquisition.",
    detail:
      "Started at fourteen. Built the team, the partnerships, the programs. Operated for three years, then exited cleanly to Cross The Skylimits.",
    metrics: [
      { label: "Years operated", value: "3+" },
      { label: "Started age", value: "14" },
    ],
  },
];

export type Credential = {
  org: string;
  role: string;
  detail: string;
  year: string;
};

export const credentials: Credential[] = [
  {
    org: "Y Combinator",
    role: "Startup School India · $25K credits",
    detail:
      "Selected for YC's India-focused founder program. Working capital and a global founder network.",
    year: "2026",
  },
  {
    org: "Perplexity",
    role: "Business Fellow",
    detail:
      "Six months inside Perplexity's enterprise GTM. Workshops with Jensen Huang (NVIDIA) and Aaron Levie (Box).",
    year: "2024–25",
  },
  {
    org: "MIT LaunchX",
    role: "Alumnus",
    detail:
      "MIT's flagship entrepreneurship accelerator for high-school founders.",
    year: "—",
  },
  {
    org: "McKinsey",
    role: "Forward 2025",
    detail:
      "Selected for McKinsey's professional development cohort — strategy, leadership, problem-solving with consultants in the field.",
    year: "2025",
  },
  {
    org: "IIT Bombay",
    role: "Eureka! Jr. · 2023",
    detail:
      "Competed at India's premier student-founder bootcamp at IIT Bombay.",
    year: "2023",
  },
  {
    org: "Polaris E-Cell",
    role: "Startup Relations & Dealflow",
    detail:
      "Run dealflow and VC relations for the campus entrepreneurship cell. Connect student founders with investors and mentors.",
    year: "2025–",
  },
];

export type TimelineItem = {
  year: string;
  title: string;
  body: string;
  kind: "venture" | "milestone" | "fellowship" | "education";
};

export const timeline: TimelineItem[] = [
  {
    year: "2021",
    title: "Founded ISP Association",
    body: "Started building the first thing. Fourteen years old.",
    kind: "venture",
  },
  {
    year: "2022",
    title: "Cross The Skylimits · Core Ops",
    body: "Joined as a Management Intern. Promoted twice — Growth Manager, then Core Operations — over 3.5 years.",
    kind: "milestone",
  },
  {
    year: "2023",
    title: "Eureka! Jr. at IIT Bombay",
    body: "Competed at India's flagship student-founder bootcamp.",
    kind: "fellowship",
  },
  {
    year: "2024",
    title: "Acquired ISP Association → Cross The Skylimits",
    body: "First exit. Three years from founding.",
    kind: "venture",
  },
  {
    year: "2024",
    title: "Co-founded Joper",
    body: "Growth role. Hyperlocal grocery for tier-2 India.",
    kind: "venture",
  },
  {
    year: "2024",
    title: "Perplexity Business Fellow",
    body: "Six months inside enterprise AI. Rooms with Jensen Huang and Aaron Levie.",
    kind: "fellowship",
  },
  {
    year: "2025",
    title: "Acquired Joper → KiranaPro",
    body: "Second exit, eight months after founding.",
    kind: "venture",
  },
  {
    year: "2025",
    title: "Penn State → Polaris",
    body: "Started a BS in Business Admin at Penn State. Dropped out after a month to study CS/AI in Bengaluru — where the building is happening.",
    kind: "education",
  },
  {
    year: "2025",
    title: "Founded BuilderFellows",
    body: "Residency for the next wave of student founders.",
    kind: "venture",
  },
  {
    year: "2025",
    title: "Polaris E-Cell — Dealflow",
    body: "Running startup relations and VC dealflow for the campus E-Cell.",
    kind: "milestone",
  },
  {
    year: "2026",
    title: "Co-founded Band9Prep",
    body: "EdTech. IELTS prep, built for students aiming for a 9.",
    kind: "venture",
  },
  {
    year: "2026",
    title: "YC Startup School India",
    body: "Selected. $25K credits. Founder network.",
    kind: "fellowship",
  },
];

export const skills = {
  startup: [
    "0-to-1 building",
    "Fundraising",
    "VC relations",
    "GTM strategy",
    "Growth hacking",
    "Operations scaling",
  ],
  business: [
    "Team building",
    "Recruiting",
    "Business development",
    "Strategic partnerships",
    "Exit strategy",
  ],
  technical: ["Enterprise AI", "Product development", "Tech strategy"],
  languages: ["Hindi · native", "English · professional", "Kannada · elementary"],
};

export const nowList = [
  "Running dealflow for Polaris E-Cell — connecting student founders to VCs.",
  "Scaling BuilderFellows from cohort one to a programmatic residency.",
  "Building Band9Prep's first product — early access opening soon.",
  "Studying CS/AI at Polaris. Index-funding my own attention.",
  "Reading every YC SUS reading list and most of Paul Graham's essays.",
];
