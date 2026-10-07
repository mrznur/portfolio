/**
 * variant options:
 *   "jsx"     →  < Title />
 *   "obj"     →  { Title }
 *   "comment" →  // Title
 *   "plain"   →  Title  (fallback, original style)
 */
export default function Section({ id, title, variant = "plain", children }) {
  const Label = () => {
    if (variant === "jsx") return (
      <span className="font-mono text-[0.9rem] font-semibold tracking-tight">
        <span className="text-blue-500">&lt;</span>
        <span className="text-white mx-[3px]">{title}</span>
        <span className="text-blue-500">/&gt;</span>
      </span>
    );

    if (variant === "obj") return (
      <span className="font-mono text-[0.9rem] font-semibold tracking-tight">
        <span className="text-blue-500">{"{"}</span>
        <span className="text-white mx-[5px]">{title}</span>
        <span className="text-blue-500">{"}"}</span>
      </span>
    );

    if (variant === "comment") return (
      <span className="font-mono text-[0.9rem] font-semibold tracking-tight">
        <span className="text-slate-500">//</span>
        <span className="text-white ml-2">{title}</span>
      </span>
    );

    // plain — original style
    return (
      <span className="text-[0.65rem] font-bold tracking-[0.25em] text-blue-500 uppercase">
        {title}
      </span>
    );
  };

  return (
    <section id={id} className="scroll-mt-20 py-16">
      <div className="flex items-center gap-4 mb-10">
        <Label />
        <div className="flex-1 h-px bg-white/6" />
      </div>
      {children}
    </section>
  );
}
