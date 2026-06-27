export default function ButtonLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[0.88rem] font-medium border border-white/10 text-slate-300 hover:border-blue-500/50 hover:text-white hover:bg-blue-500/8 transition-all duration-150 active:scale-[0.97]"
    >
      {children}
    </a>
  );
}
