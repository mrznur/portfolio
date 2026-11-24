import Panel from "./ui/Panel";
import Button from "./ui/Button";
import Tag from "./ui/Tag";
import Details from "./ui/Details";
import ImageSlot from "./ui/ImageSlot";
import { slugify } from "../lib/slug";

/**
 * Image convention (put files in /public/shots):
 *   cover   → /shots/<slug>.png      (or set project.image in data.json)
 *   extras  → /shots/<slug>-2.png, /shots/<slug>-3.png
 */
export default function ProjectCard({ project, featured = false }) {
  const [name, ...rest] = project.title.split(" — ");
  const slug = slugify(name);
  const [lead, ...notes] = project.points;

  return (
    <Panel
      as="article"
      title={`${slug}/`}
      status={project.live ? "● deployed" : "○ repo only"}
      statusColor={project.live ? "var(--ok)" : "var(--mute)"}
      className={`flex flex-col ${featured ? "md:col-span-2" : ""}`}
    >
      <ImageSlot
        src={project.image || `/shots/${slug}.png`}
        alt={`${name} screenshot`}
        hint={`/shots/${slug}.png`}
        className="border-b"
      />
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="mute text-[0.92rem]">{rest.join(" — ")}</p>
        <p className="mt-4 text-[0.95rem]">{lead}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        {notes.length > 0 && (
          <Details label={`${notes.length} engineering notes`} className="mt-4">
            <ul className="list-disc pl-5 space-y-2 text-[0.9rem] mute">
              {notes.map((pt, k) => (
                <li key={k}>{pt}</li>
              ))}
            </ul>
          </Details>
        )}

        <Details label="more screenshots" className="mt-3">
          <div className="grid grid-cols-2 gap-3">
            {[2, 3].map((n) => (
              <ImageSlot
                key={n}
                src={`/shots/${slug}-${n}.png`}
                alt={`${name} screenshot ${n}`}
                className="rounded border"
              />
            ))}
          </div>
        </Details>

        <div className="mt-auto pt-5 flex gap-3">
          {project.live && <Button href={project.live} variant="primary">live demo</Button>}
          {project.repo && <Button href={project.repo}>source</Button>}
        </div>
      </div>
    </Panel>
  );
}
