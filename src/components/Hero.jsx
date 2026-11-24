import Button from "./ui/Button";
import ImageSlot from "./ui/ImageSlot";

export default function Hero({ person, stats, aside }) {
  return (
    <header className="pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Two-col on lg+, single col below */}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

        {/* ── Left column ── */}
        <div>
          <div className="flex items-center gap-4">
            <ImageSlot
              src="/me.jpg"
              alt={person.name}
              ratio="1 / 1"
              hint="/me.jpg"
              className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full border"
            />
            <p className="mono text-xs sm:text-sm cyan break-all">{person.location}</p>
          </div>

          <h1 className="mt-4 text-[clamp(2rem,6vw,4.4rem)] font-bold leading-[1.05] tracking-tight">
            {person.name}
          </h1>

          <p className="mono mt-4 text-base sm:text-lg amber">
            Full-stack engineer<span className="caret">_</span>
          </p>
          <p className="mono mt-1 text-base sm:text-lg mute">LLM reasoning researcher</p>

          <p className="mt-5 max-w-lg text-[1rem] sm:text-[1.05rem] mute leading-relaxed">
            {person.summary}
          </p>

          {/* CTA buttons — wrap gracefully */}
          <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
            <Button href="#projects" variant="primary">view projects</Button>
            {person.links.resume && <Button href={person.links.resume}>resume</Button>}
            <Button href={`mailto:${person.email}`}>email</Button>
            <Button href={person.links.github}>github</Button>
            <Button href={person.links.linkedin}>linkedin</Button>
          </div>

          {/* Stats row — wrap on very small screens */}
          <dl className="mono mt-8 flex flex-wrap gap-6 sm:gap-8 text-sm">
            {stats.map(([n, l]) => (
              <div key={l}>
                <dd className="text-xl sm:text-2xl font-bold">{n}</dd>
                <dt className="mute">{l}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Right column: Terminal ── */}
        {/* On mobile sits below, full width. On lg+ sits beside. */}
        <div className="w-full min-w-0">
          {aside}
        </div>

      </div>
    </header>
  );
}
