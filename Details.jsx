export default function Details({ label, children, className = "" }) {
  return (
    <details className={className}>
      <summary className="mono text-xs mute hover:text-[color:var(--amber)] w-fit">
        <span className="chev">▸</span> {label}
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
