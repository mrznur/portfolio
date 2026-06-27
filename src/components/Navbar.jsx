import { useState } from "react";

const items = [
  { label: "About",      id: "about"      },
  { label: "What I Do",  id: "what-i-do"  },
  { label: "Projects",   id: "projects"   },
  { label: "Research",   id: "research"   },
  { label: "Education",  id: "education"  },
  { label: "Experience", id: "experience" },
  { label: "Contact",    id: "contact"    },
];

export default function Navbar({ onNavClick, activeModal }) {
  const [open, setOpen] = useState(false);
  const handle = (id) => { onNavClick(id); setOpen(false); };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080c14]/95 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-[3.75rem]">
        <a
          href="#top"
          className="text-white font-bold text-[1.15rem] tracking-tight hover:opacity-80 transition"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          Miraz
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => onNavClick(it.id)}
              className={`text-[0.85rem] font-medium transition-colors duration-150 ${
                activeModal === it.id
                  ? "text-blue-400"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {it.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
          aria-label="Toggle menu"
        >
          {open
            ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#080c14] px-6 py-3 animate-menu-in">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => handle(it.id)}
              className="w-full text-left py-3 text-[0.9rem] font-medium text-slate-400 hover:text-white border-b border-white/4 last:border-0 transition-colors"
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
