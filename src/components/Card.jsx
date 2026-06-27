export default function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/6 bg-white/[0.03] p-6",
        "hover:bg-white/[0.055] hover:border-white/10",
        "hover:-translate-y-0.5 transition-all duration-200",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
