import Button from "./ui/Button";
import ImageSlot from "./ui/ImageSlot";

export default function Hero({ person, stats, aside }) {
  return (
    <header className="grid lg:grid-cols-2 gap-10 items-center pt-16 pb-24 lg:pt-24">
      <div>
        <div className="flex items-center gap-4">
          <ImageSlot
            src="/me.jpg"
            alt={person.name}
            ratio="1 / 1"
            hint="/me.jpg"
            className="h-20 w-20 shrink-0 rounded-full border"
          />
          <p className="mono text-sm cyan">{person.location}</p>
        </div>
        <h1 className="mt-4 text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tight">
          {person.name}
        </h1>
        <p className="mono mt-5 text-lg amber">
          Full-stack engineer<span className="caret">_</span>
        </p>
        <p className="mt-2 text-lg mono">LLM reasoning researcher</p>
        <p className="mt-6 max-w-lg text-[1.05rem] mute">{person.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#projects" variant="primary">view projects</Button>
          {person.links.resume && <Button href={person.links.resume}>resume</Button>}
          <Button href={`mailto:${person.email}`}>email</Button>
          <Button href={person.links.github}>github</Button>
          <Button href={person.links.linkedin}>linkedin</Button>
        </div>
        <dl className="mono mt-10 flex gap-8 text-sm">
          {stats.map(([n, l]) => (
            <div key={l}>
              <dd className="text-2xl font-bold">{n}</dd>
              <dt className="mute">{l}</dt>
            </div>
          ))}
        </dl>
      </div>
      {aside}
    </header>
  );
}
