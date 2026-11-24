import Reveal from "./Reveal";

export default function Section({ id, title, sub, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-16">
      <Reveal>
        <div className="mb-8">
          <h2 className="mono text-2xl md:text-3xl font-bold">
            <span className="amber">/</span>
            {title}
          </h2>
          {sub && <p className="mt-2 mute max-w-2xl">{sub}</p>}
        </div>
        {children}
      </Reveal>
    </section>
  );
}
