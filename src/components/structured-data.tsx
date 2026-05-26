import { profile, links, credentials } from "@/lib/content";

const SITE_URL = "https://priyanshugupta.in";

export function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    givenName: "Priyanshu",
    familyName: "Gupta",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    jobTitle: "Founder, Operator",
    description:
      "Serial founder. Two acquisitions before turning 18. Founder of BuilderFellows. Y Combinator, Perplexity, MIT LaunchX, McKinsey Forward.",
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.city,
      addressRegion: "Karnataka",
      addressCountry: profile.country,
    },
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    sameAs: [
      links.linkedin,
      links.x,
      links.instagram,
      links.youtube,
    ],
    knowsAbout: [
      "Startup Operations",
      "Fundraising",
      "VC Relations",
      "Go-to-Market Strategy",
      "Growth Strategy",
      "Enterprise AI",
      "Product Development",
    ],
    alumniOf: credentials.map((c) => ({
      "@type": "Organization",
      name: c.org,
      description: c.role,
    })),
    worksFor: {
      "@type": "Organization",
      name: "BuilderFellows",
      description: "30-day residency for student founders.",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile.name,
    url: SITE_URL,
    description:
      "Personal portfolio of Priyanshu Gupta — founder, operator, two acquisitions before college.",
    inLanguage: "en-IN",
    publisher: {
      "@type": "Person",
      name: profile.name,
      url: SITE_URL,
    },
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "17-year-old Founder Who Built, Sold & Funded His Own Education",
    description:
      "Campus CEOs Episode 4 — Priyanshu Gupta on building and selling two companies before college.",
    thumbnailUrl: "https://img.youtube.com/vi/HwwCLEwwuic/maxresdefault.jpg",
    uploadDate: "2025-09-01",
    contentUrl: "https://www.youtube.com/watch?v=HwwCLEwwuic",
    embedUrl: "https://www.youtube.com/embed/HwwCLEwwuic",
    publisher: {
      "@type": "Organization",
      name: "Campus CEOs · Polaris School of Technology",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
    </>
  );
}
