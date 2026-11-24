export default function Footer({ name }) {
  return (
    <footer className="mono py-10 text-xs mute flex justify-between">
      <span>
        © {new Date().getFullYear()} {name}
      </span>
      <a href="#top" className="hover:text-[color:var(--amber)]">back to top</a>
    </footer>
  );
}
