export default function Tag({ children }) {
  return (
    <span
      className="mono rounded-sm border px-2 py-0.5 text-[0.72rem] cyan"
      style={{ borderColor: "var(--line)" }}
    >
      {children}
    </span>
  );
}
