import { useState } from "react";
import Card from "./Card";
import Tag from "./Tag";

const PREVIEW = 3;

const ExtIcon = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export default function ProjectCard({
  project,
  featured = false,
  className = "",
}) {
  const [expanded, setExpanded] = useState(false);
  const extra = project.points.length - PREVIEW;
  const points = expanded ? project.points : project.points.slice(0, PREVIEW);
  const [name, ...rest] = project.title.split(" — ");

  return (
    <Card
      className={`flex flex-col ${featured ? "border-blue-500/30" : ""} ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className="font-semibold text-white text-[1.02rem] leading-snug"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            {name}
          </p>
          {rest.length > 0 && (
            <p className="mt-1 text-[0.85rem] text-slate-500">
              {rest.join(" — ")}
            </p>
          )}
        </div>
        {featured && (
          <span className="shrink-0 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-300">
            Featured
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      <ul className="mt-4 space-y-2 text-[0.93rem] text-slate-400 leading-relaxed list-disc pl-4 flex-1">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      {extra > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="mt-3 self-start text-[0.85rem] font-medium text-slate-300 hover:text-white transition-colors"
        >
          {expanded ? "Show less" : `Show ${extra} more details`}
        </button>
      )}

      <div className="mt-5 flex gap-3 border-t border-white/6 pt-4">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 text-[0.85rem] font-medium text-emerald-300 hover:bg-emerald-500/20 transition-colors"
          >
            Live demo <ExtIcon />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-1.5 text-[0.85rem] font-medium text-slate-300 hover:text-white hover:border-white/30 transition-colors"
          >
            Code <ExtIcon />
          </a>
        )}
      </div>
    </Card>
  );
}
