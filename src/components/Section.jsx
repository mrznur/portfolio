export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-12">
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-wider text-[#005b96] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-[#011f4b]">
        {title}
      </h2>
      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}