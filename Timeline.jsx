export default function Timeline({ items }) {
  return (
    <ol className="border-l ml-1" style={{ borderColor: "var(--line)" }}>
      {items.map((e) => (
        <li key={e.title} className="relative pl-7 pb-8 last:pb-0">
          <span
            className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--amber)" }}
          />
          <p className="mono text-xs cyan">{e.time}</p>
          <h3 className="font-semibold">{e.title}</h3>
          {e.desc && <p className="mute text-[0.92rem] max-w-2xl">{e.desc}</p>}
        </li>
      ))}
    </ol>
  );
}
