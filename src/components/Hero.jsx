import ButtonLink from "./ButtonLink";
import Tag from "./Tag";
import Card from "./Card";

export default function Hero({ person, tags }) {
  return (
    <header className="pt-12 md:pt-16 pb-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid md:grid-cols-[1.25fr_0.75fr] gap-6 items-start">
          <div>
            <p className="text-sm text-slate-600">{person.location}</p>

            <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
                {person.name}
              </span>
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
              {person.subheadline}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={person.links.github} variant="primary">
                GitHub
              </ButtonLink>
              <ButtonLink href={person.links.linkedin} variant="secondary">
                LinkedIn
              </ButtonLink>
              <ButtonLink href={`mailto:${person.email}`} variant="secondary">
                Email
              </ButtonLink>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          <Card className="relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-indigo-100 blur-2xl" />
            <p className="text-sm font-semibold text-slate-900">
              Quick Highlights
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc pl-5">
              <li>AI/ML thesis work on reasoning distillation</li>
              <li>Full-stack apps with REST + database workflows</li>
              <li>Modern UI using React + Tailwind components</li>
            </ul>
          </Card>
        </div>
      </div>
    </header>
  );
}
