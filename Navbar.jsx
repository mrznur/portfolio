import { useActiveSection } from "../hooks/useObserver";

export default function Navbar({ items }) {
  const active = useActiveSection(items.map((i) => i.id));
  return (
    <nav
      aria-label="Sections"
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ borderColor: "var(--line)", background: "rgba(8,17,31,.85)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4 mono text-sm">
        <a href="#top" className="font-bold shrink-0">
          miraz<span className="amber">.dev</span>
        </a>
        <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto">
          {items.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className={`transition-colors hover:text-[color:var(--amber)] ${active === i.id ? "amber" : "mute"}`}
            >
              {i.label}
            </a>
          ))}
          <span className="hidden md:flex items-center gap-2 shrink-0" style={{ color: "var(--ok)" }}>
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "var(--ok)" }} />
            open to work
          </span>
        </div>
      </div>
    </nav>
  );
}
