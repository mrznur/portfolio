export default function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border border-slate-700/50 bg-[#161920]/80 p-6 backdrop-blur-sm",
        "hover:bg-[#1a1d24]/80 hover:border-slate-600/60",
        "hover:-translate-y-0.5 transition-all duration-200",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
