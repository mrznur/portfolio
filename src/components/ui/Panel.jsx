/** Bordered card with an optional terminal-style header bar. */
export default function Panel({ title, status, statusColor = "var(--mute)", as: As = "div", className = "", children }) {
  const isLive = status === "[ live ]";
  return (
    <As className={`panel ${className}`}>
      {(title || status) && (
        <div
          className="mono flex items-center justify-between gap-3 border-b px-3 sm:px-5 py-2 sm:py-2.5 text-xs"
          style={{ borderColor: "var(--line)" }}
        >
          <span className="mute truncate">{title}</span>
          {status && (
            <span
              style={{ color: statusColor }}
              className={`shrink-0 ${isLive ? "caret-blink" : ""}`}
            >
              {status}
            </span>
          )}
        </div>
      )}
      {children}
    </As>
  );
}
