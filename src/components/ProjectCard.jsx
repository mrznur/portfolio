import Card from "./Card";
import Tag from "./Tag";
import ButtonLink from "./ButtonLink";

export default function ProjectCard({ project }) {
  return (
    <Card>
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="mb-4 h-40 w-full rounded-xl object-cover border border-slate-200"
          loading="lazy"
        />
      ) : null}

      <p className="font-semibold text-slate-900">{project.title}</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      <ul className="mt-4 space-y-2 text-sm text-slate-600 list-disc pl-5">
        {project.points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      {project.repo ? (
        <div className="mt-4">
          <ButtonLink href={project.repo} variant="secondary">
            Repository
          </ButtonLink>
        </div>
      ) : null}
    </Card>
  );
}
