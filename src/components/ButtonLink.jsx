export default function ButtonLink({ href, children, variant = "primary" }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[0.99]";
  const styles = "border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400";
  return (
    <a className={`${base} ${styles}`} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}