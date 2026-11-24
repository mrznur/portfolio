export default function Footer({ name }) {
  return (
    <footer className="mono py-10 text-xs mute flex flex-wrap justify-between gap-3">
      <span>© {new Date().getFullYear()} {name}</span>
      <a href="#top" className="hover:text-[color:var(--amber)] transition-colors">
        back to top ↑
      </a>
    </footer>
  );
}
