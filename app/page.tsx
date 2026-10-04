import { profile, work, earlier, programs, featured, events } from "@/content";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main>
      <header>
        <div>
          <h1>{profile.name}</h1>
          <p className="muted">
            {profile.role} · {profile.location}
          </p>
        </div>
        <ThemeToggle />
      </header>

      <section className="intro">
        {profile.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section>
        <h2>Work</h2>
        <ul className="list">
          {work.map((w) => (
            <li key={w.name}>
              <div className="row">
                <span>
                  {w.href ? <a href={w.href}>{w.name}</a> : w.name}
                  <span className="muted"> — {w.role}</span>
                </span>
                <span className="date">{w.period}</span>
              </div>
              <p className="muted">{w.description}</p>
              {w.note && <p className="note">↳ {w.note}</p>}
            </li>
          ))}
        </ul>
        <ul className="list tight" style={{ marginTop: "1.75rem" }}>
          {earlier.map((e) => (
            <li key={e.name} className="row">
              <span>
                {e.name}
                <span className="muted"> — {e.role}</span>
              </span>
              <span className="date">{e.period}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Programs</h2>
        <ul className="list tight">
          {programs.map((p) => (
            <li key={p.name} className="row">
              <span>
                {p.name}
                <span className="muted"> — {p.detail}</span>
              </span>
              <span className="date">{p.year}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Featured</h2>
        <ul className="list tight">
          <li>
            <a href={featured.href}>{featured.title} ↗</a>
            <p className="muted">{featured.subtitle}</p>
          </li>
        </ul>
        <ul className="list tight" style={{ marginTop: "1.25rem" }}>
          {events.map((e) => (
            <li key={e.name} className="row">
              <span>
                {e.name}
                <span className="muted"> — {e.detail}</span>
              </span>
              <span className="date">{e.date}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p className="links">
          {profile.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </p>
      </section>
    </main>
  );
}
