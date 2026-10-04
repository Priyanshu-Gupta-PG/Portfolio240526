"use client";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  return (
    <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
      <span className="sun">light</span>
      <span className="moon">dark</span>
    </button>
  );
}
