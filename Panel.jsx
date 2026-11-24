/** Bordered card with an optional terminal-style header bar. */
export default function Panel({ title, status, statusColor = "var(--mute)", as: As = "div", className = "", children }) {
  return (
    <As className={`panel ${className}`}>
      {(title || status) && (
        <div
          className="mono flex items-center justify-between border-b px-5 py-2.5 text-xs"
          style={{ borderColor: "var(--line)" }}
        >
          <span className="mute">{title}</span>
          {status && <span style={{ color: statusColor }}>{status}</span>}
        </div>
      )}
      {children}
    </As>
  );
}
