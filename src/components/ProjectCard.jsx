import Card from "./Card";
import Tag from "./Tag";

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

      <span className="font-semibold text-[#011f4b] block">{project.title}</span>

      <div className="mt-2 flex flex-wrap gap-2">
        {project.stack.map((s) => <Tag key={s}>{s}</Tag>)}
      </div>

      <ul className="mt-4 space-y-2 text-sm text-[#03396c] list-disc pl-5">
        {project.points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      <div className="mt-4 flex gap-4 flex-wrap">
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer"
            className="text-sm text-[#005b96] hover:text-[#03396c] font-medium transition">
            Repository →
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer"
            className="text-sm text-[#005b96] hover:text-[#03396c] font-medium transition">
            Live Demo →
          </a>
        )}
      </div>
    </Card>
  );
}
