export default function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-16">
      <div className="flex items-center gap-4 mb-10">
        <span className="text-[0.65rem] font-bold tracking-[0.25em] text-blue-500 uppercase">
          {title}
        </span>
        <div className="flex-1 h-px bg-white/6" />
      </div>
      {children}
    </section>
  );
}
