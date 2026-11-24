import { useActiveSection } from "../hooks/useObserver";
import { useEffect, useState } from "react";

const STATUS_PHRASES = ["available_now", "open_to_work", "hire_me"];

function StatusCycle() {
  const [i, setI]           = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setI((n) => (n + 1) % STATUS_PHRASES.length);
        setVisible(true);
      }, 250);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="mono text-xs shrink-0"
      style={{ color: "var(--amber)", opacity: visible ? 1 : 0, transition: "opacity 0.2s ease" }}
    >
      {STATUS_PHRASES[i]}<span className="caret">_</span>
    </span>
  );
}

export default function Navbar({ items }) {
  const active  = useActiveSection(items.map((i) => i.id));
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ borderColor: "var(--line)", background: "rgba(8,17,31,.92)" }}
    >
      {/* ── Desktop bar ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4 mono text-sm">
        <a href="#top" className="font-bold shrink-0">
          miraz<span className="amber">.dev</span>
        </a>

        {/* Desktop nav links — hidden below md */}
        <div className="hidden md:flex items-center gap-5 overflow-x-auto">
          {items.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className={`shrink-0 transition-colors hover:text-[color:var(--amber)] ${
                active === i.id ? "amber" : "mute"
              }`}
            >
              {i.label}
            </a>
          ))}
          <StatusCycle />
        </div>

        {/* Mobile: status + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <StatusCycle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="mute hover:text-[color:var(--amber)] transition-colors p-1"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: "var(--line)", background: "rgba(8,17,31,.97)" }}
        >
          {items.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              onClick={() => setOpen(false)}
              className={`mono block px-6 py-3 text-sm border-b transition-colors hover:text-[color:var(--amber)] ${
                active === i.id ? "amber" : "mute"
              }`}
              style={{ borderColor: "var(--line)" }}
            >
              {active === i.id ? "▸ " : "  "}{i.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
