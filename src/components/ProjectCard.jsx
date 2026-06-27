import Card from "./Card";
import Tag from "./Tag";

const ExtIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function ProjectCard({ project }) {
  return (
    <Card className="flex flex-col">
      <p
        className="font-semibold text-white text-[0.98rem] leading-snug"
        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
      >
        {project.title}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((s) => <Tag key={s}>{s}</Tag>)}
      </div>

      <ul className="mt-4 space-y-2 text-[0.93rem] text-slate-400 leading-relaxed list-disc pl-4 flex-1">
        {project.points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      <div className="mt-5 flex gap-5 border-t border-white/6 pt-4">
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer"
            className="text-[0.88rem] text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1.5">
            Repository <ExtIcon />
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer"
            className="text-[0.88rem] text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1.5">
            Live Demo <ExtIcon />
          </a>
        )}
      </div>
    </Card>
  );
}
