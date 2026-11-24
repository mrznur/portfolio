import { useEffect, useState } from "react";

const items = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Research", id: "research" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [progress, setProgress] = useState(0);

  // Highlight the section currently in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080c14]/95 backdrop-blur-md">
      <div
        className="absolute bottom-0 left-0 h-px bg-blue-500 transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-[3.75rem]">
        <a
          href="#top"
          className="text-white font-bold text-[1.15rem] tracking-tight hover:opacity-80 transition"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          Miraz
        </a>

        <nav
          className="hidden md:flex items-center gap-7"
          aria-label="Sections"
        >
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => go(it.id)}
              aria-current={active === it.id ? "true" : undefined}
              className={`text-[0.85rem] font-medium transition-colors duration-150 ${active === it.id ? "text-blue-400" : "text-slate-400 hover:text-slate-100"}`}
            >
              {it.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#080c14] px-6 py-3 animate-menu-in">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => go(it.id)}
              className="w-full text-left py-3 text-[0.9rem] font-medium text-slate-400 hover:text-white border-b border-white/5 last:border-0 transition-colors"
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
