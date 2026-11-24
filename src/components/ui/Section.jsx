import Reveal from "./Reveal";

export default function Section({ id, title, sub, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-12 sm:py-16 min-w-0">
      <Reveal>
        <div className="mb-7 sm:mb-8">
          <h2 className="mono text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
            <span className="amber">/</span>
            {title}
          </h2>
          {sub && (
            <p className="mt-2 mute text-[0.9rem] sm:text-base max-w-2xl leading-relaxed">
              {sub}
            </p>
          )}
        </div>
        {children}
      </Reveal>
    </section>
  );
}
