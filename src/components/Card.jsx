export default function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border border-slate-200 bg-[#d8eafc] p-6",
        "shadow-[0_1px_0_rgba(15,23,42,0.06)]",
        "hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 transition",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}