import { useEffect, useMemo, useRef, useState } from "react";
import data from "./data/data.json";

/* ───────── Game of 24 solver: DFS with optional Dead-End Memory ───────── */
const solve = (nums, prune) => {
  let explored = 0,
    skipped = 0,
    found = null;
  const dead = new Set();
  const dfs = (items) => {
    if (found) return;
    if (items.length === 1) {
      if (Math.abs(items[0].v - 24) < 1e-6) found = items[0].e;
      return;
    }
    const key = items
      .map((i) => Math.round(i.v * 1e4))
      .sort((a, b) => a - b)
      .join(",");
    if (prune && dead.has(key)) {
      skipped++;
      return;
    }
    explored++;
    for (let i = 0; i < items.length; i++)
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i],
          b = items[j],
          rest = items.filter((_, k) => k !== i && k !== j);
        const c = [
          [a.v + b.v, `(${a.e}+${b.e})`],
          [a.v * b.v, `(${a.e}×${b.e})`],
          [a.v - b.v, `(${a.e}-${b.e})`],
          [b.v - a.v, `(${b.e}-${a.e})`],
        ];
        if (b.v) c.push([a.v / b.v, `(${a.e}÷${b.e})`]);
        if (a.v) c.push([b.v / a.v, `(${b.e}÷${a.e})`]);
        for (const [v, e] of c) {
          dfs([...rest, { v, e }]);
          if (found) return;
        }
      }
    if (prune) dead.add(key); // failed subtree: never re-explore this state
  };
  dfs(nums.map((n) => ({ v: n, e: String(n) })));
  return { found, explored, skipped };
};

function Solver() {
  const [input, setInput] = useState("1 1 5 5");
  const res = useMemo(() => {
    const nums = input
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    if (nums.length !== 4 || nums.some((n) => !Number.isFinite(n))) return null;
    return { plain: solve(nums, false), pruned: solve(nums, true) };
  }, [input]);

  const Row = ({ label, r, color }) => (
    <div>
      <div className="flex justify-between mono text-xs mute">
        <span>{label}</span>
        <span>
          {r.explored} states{r.skipped ? `, ${r.skipped} skipped` : ""}
        </span>
      </div>
      <div className="mt-1 h-2 rounded-sm" style={{ background: "#12233d" }}>
        <div
          className="bar h-2 rounded-sm"
          style={{
            width: `${Math.max(3, (r.explored / res.plain.explored) * 100)}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="panel p-5">
      <label className="mono text-xs mute" htmlFor="g24">
        input: four numbers
      </label>
      <input
        id="g24"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
        className="mono mt-1 w-full rounded bg-transparent border px-3 py-2 text-lg amber"
        style={{ borderColor: "var(--line)" }}
      />
      {res ? (
        <div className="mt-5 space-y-4">
          <p className="mono text-sm">
            {res.plain.found ? (
              <>
                <span className="mute">solution </span>
                <span className="cyan">
                  {res.plain.found.slice(1, -1)} = 24
                </span>
              </>
            ) : (
              <span className="mute">no solution: search exhausted</span>
            )}
          </p>
          <Row label="plain DFS" r={res.plain} color="#7F95B2" />
          <Row
            label="with dead-end memory"
            r={res.pruned}
            color="var(--amber)"
          />
        </div>
      ) : (
        <p className="mono text-sm mt-4 mute">
          Enter exactly four numbers, e.g. 4 7 8 8
        </p>
      )}
    </div>
  );
}

/* ───────── Interactive terminal ───────── */
function Terminal() {
  const { person, projects, skills, research } = data;
  const name = (p) => p.title.split(" — ")[0];
  const COMMANDS = {
    whoami: () => [person.name, person.summary],
    projects: () => [
      ...projects.map(
        (p, i) => `[${i + 1}] ${name(p)}${p.live ? "  (live)" : ""}`,
      ),
      "→ open <n> to visit",
    ],
    skills: () => [
      `frontend  ${skills.frontend.join(", ")}`,
      `backend   ${skills.backend.join(", ")}`,
      `ai/ml     ${skills.ml.join(", ")}`,
    ],
    research: () => [
      research.title.split(" — ")[0],
      "89% Game of 24 · 30–80% states skipped · 0 API calls at inference",
    ],
    contact: () => [person.email, person.links.github, person.links.linkedin],
    help: () => [
      "whoami  projects  skills  research  contact",
      "open <n|github|linkedin>   clear",
    ],
  };
  const [lines, setLines] = useState([
    { k: "in", t: "whoami" },
    { k: "out", t: COMMANDS.whoami() },
  ]);
  const [val, setVal] = useState("");
  const box = useRef(null);
  useEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const [cmd, arg] = raw.trim().toLowerCase().split(/\s+/);
    if (!cmd) return;
    if (cmd === "clear") return setLines([]);
    let out;
    if (cmd === "open") {
      const p = projects[Number(arg) - 1];
      const url = p
        ? p.live || p.repo
        : { github: person.links.github, linkedin: person.links.linkedin }[arg];
      out = url
        ? [`opening ${url}`]
        : ["usage: open <project number | github | linkedin>"];
      if (url) window.open(url, "_blank", "noopener");
    } else
      out = COMMANDS[cmd]
        ? COMMANDS[cmd]()
        : [`command not found: ${cmd}. Try help.`];
    setLines((l) => [...l, { k: "in", t: raw }, { k: "out", t: out }]);
  };

  return (
    <div className="panel overflow-hidden">
      <div
        className="mono flex items-center justify-between border-b px-4 py-2 text-xs mute"
        style={{ borderColor: "var(--line)" }}
      >
        <span>miraz@portfolio: ~</span>
        <span>interactive</span>
      </div>
      <div
        ref={box}
        className="mono h-72 overflow-y-auto px-4 py-3 text-[0.82rem] leading-6"
        aria-live="polite"
      >
        {lines.map((l, i) =>
          l.k === "in" ? (
            <div key={i}>
              <span className="amber">$</span> {l.t}
            </div>
          ) : (
            <div key={i} className="mute mb-1">
              {l.t.map((s, j) => (
                <div key={j} className="whitespace-pre-wrap break-words">
                  {s}
                </div>
              ))}
            </div>
          ),
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(val);
            setVal("");
          }}
          className="flex"
        >
          <span className="amber mr-2">$</span>
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
            placeholder="type help"
            className="flex-1 bg-transparent outline-none placeholder:text-[#3c5276]"
          />
        </form>
      </div>
      <div
        className="flex flex-wrap gap-2 border-t px-4 py-3"
        style={{ borderColor: "var(--line)" }}
      >
        {["projects", "skills", "research", "contact", "help"].map((c) => (
          <button
            key={c}
            onClick={() => run(c)}
            className="mono rounded border px-2.5 py-1 text-xs mute hover:text-[color:var(--amber)] hover:border-[color:var(--amber)] transition-colors"
            style={{ borderColor: "var(--line)" }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

const Title = ({ path, sub }) => (
  <div className="mb-8">
    <h2 className="mono text-2xl md:text-3xl font-bold">
      <span className="amber">/</span>
      {path}
    </h2>
    {sub && <p className="mt-2 mute max-w-2xl">{sub}</p>}
  </div>
);

export default function App() {
  const { person, skills, research, projects, education, experience } = data;
  const liveCount = projects.filter((p) => p.live).length;
  const code = {
    languages: skills.languages,
    frontend: skills.frontend,
    backend: skills.backend,
    data: [...skills.database, ...skills.tools],
    ml: skills.ml,
  };

  return (
    <div id="top">
      <nav
        aria-label="Sections"
        className="sticky top-0 z-40 border-b backdrop-blur"
        style={{ borderColor: "var(--line)", background: "rgba(8,17,31,.85)" }}
      >
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between mono text-sm">
          <a href="#top" className="font-bold">
            miraz<span className="amber">.dev</span>
          </a>
          <div className="flex items-center gap-5 mute">
            {["projects", "research", "skills", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="hidden sm:block hover:text-[color:var(--amber)] transition-colors"
              >
                {s}
              </a>
            ))}
            <span
              className="flex items-center gap-2"
              style={{ color: "var(--ok)" }}
            >
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ background: "var(--ok)" }}
              />
              open to work
            </span>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <header className="grid lg:grid-cols-2 gap-10 items-center pt-16 pb-24 lg:pt-24">
          <div>
            <p className="mono text-sm cyan">{person.location}</p>
            <h1 className="mt-4 text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tight">
              {person.name}
            </h1>
            <p className="mono mt-5 text-lg amber">
              Full-stack engineer<span className="caret">_</span>
            </p>
            <p className="mt-2 text-lg mono" style={{ color: "var(--text)" }}>
              LLM reasoning researcher
            </p>
            <p className="mt-6 max-w-lg text-[1.05rem] mute">
              {person.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn btn-primary">
                view projects
              </a>
              <a href={`mailto:${person.email}`} className="btn">
                send email
              </a>
              <a
                href={person.links.github}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                github
              </a>
              <a
                href={person.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                linkedin
              </a>
            </div>
            <dl className="mono mt-10 flex gap-8 text-sm">
              {[
                [projects.length, "projects"],
                [liveCount, "deployed"],
                ["89%", "thesis acc."],
              ].map(([n, l]) => (
                <div key={l}>
                  <dd className="text-2xl font-bold">{n}</dd>
                  <dt className="mute">{l}</dt>
                </div>
              ))}
            </dl>
          </div>
          <Terminal />
        </header>

        {/* Projects */}
        <section id="projects" className="scroll-mt-20 py-16">
          <Title
            path="projects"
            sub={`${projects.length} builds, ${liveCount} deployed. Each one expands to the engineering details.`}
          />
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p, i) => {
              const [nm, ...rest] = p.title.split(" — ");
              return (
                <article
                  key={p.title}
                  className={`panel flex flex-col ${i === 0 ? "md:col-span-2" : ""}`}
                >
                  <div
                    className="mono flex items-center justify-between border-b px-5 py-2.5 text-xs"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span className="mute">
                      {nm
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/-$/, "")}
                      /
                    </span>
                    <span
                      style={{ color: p.live ? "var(--ok)" : "var(--mute)" }}
                    >
                      {p.live ? "● deployed" : "○ repo only"}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold">{nm}</h3>
                    <p className="mute text-[0.92rem]">{rest.join(" — ")}</p>
                    <p className="mt-4 text-[0.95rem]">{p.points[0]}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="mono rounded-sm border px-2 py-0.5 text-[0.72rem] cyan"
                          style={{ borderColor: "var(--line)" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    {p.points.length > 1 && (
                      <details className="mt-4">
                        <summary className="mono text-xs mute hover:text-[color:var(--amber)] w-fit">
                          <span className="chev">▸</span> {p.points.length - 1}{" "}
                          engineering notes
                        </summary>
                        <ul className="mt-3 list-disc pl-5 space-y-2 text-[0.9rem] mute">
                          {p.points.slice(1).map((pt, k) => (
                            <li key={k}>{pt}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                    <div className="mt-auto pt-5 flex gap-3">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                        >
                          live demo
                        </a>
                      )}
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="btn"
                        >
                          source
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Research */}
        <section id="research" className="scroll-mt-20 py-16">
          <Title
            path="research"
            sub={`${research.title.split(" — ")[0]}. Try the idea yourself: the solver below finds 24 with and without a dead-end memory, so you can see how much search it saves.`}
          />
          <div className="grid lg:grid-cols-2 gap-6">
            <Solver />
            <div className="panel p-5">
              <p className="mono text-xs mute mb-3">thesis findings</p>
              <ul className="list-disc pl-5 space-y-2.5 text-[0.92rem] mute">
                {research.points.slice(0, 5).map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
              <details className="mt-3">
                <summary className="mono text-xs mute hover:text-[color:var(--amber)] w-fit">
                  <span className="chev">▸</span> {research.points.length - 5}{" "}
                  more
                </summary>
                <ul className="mt-3 list-disc pl-5 space-y-2.5 text-[0.92rem] mute">
                  {research.points.slice(5).map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-20 py-16">
          <Title path="skills" />
          <pre className="panel mono overflow-x-auto p-5 text-[0.85rem] leading-7">
            <span className="amber">const</span> stack = {"{"}
            {"\n"}
            {Object.entries(code).map(([k, v]) => (
              <span key={k}>
                {"  "}
                {k}: [
                {[...new Set(v)].map((x, i, a) => (
                  <span key={x}>
                    <span className="cyan">"{x}"</span>
                    {i < a.length - 1 ? ", " : ""}
                  </span>
                ))}
                ],{"\n"}
              </span>
            ))}
            {"}"};
          </pre>
        </section>

        {/* Background */}
        <section id="experience" className="scroll-mt-20 py-16">
          <Title path="background" />
          <ol className="border-l ml-1" style={{ borderColor: "var(--line)" }}>
            {[
              { title: education.title, time: education.meta, desc: "" },
              ...experience,
            ].map((e) => (
              <li key={e.title} className="relative pl-7 pb-8 last:pb-0">
                <span
                  className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--amber)" }}
                />
                <p className="mono text-xs cyan">{e.time}</p>
                <h3 className="font-semibold">{e.title}</h3>
                {e.desc && (
                  <p className="mute text-[0.92rem] max-w-2xl">{e.desc}</p>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 py-16">
          <Title path="contact" />
          <div className="panel mono p-6 text-sm md:text-base leading-8">
            <div>
              <span className="amber">$</span> mail{" "}
              <a
                className="cyan hover:underline break-all"
                href={`mailto:${person.email}`}
              >
                {person.email}
              </a>
            </div>
            <div>
              <span className="amber">$</span> open{" "}
              <a
                className="cyan hover:underline"
                href={person.links.github}
                target="_blank"
                rel="noreferrer"
              >
                github.com/mrznur
              </a>
            </div>
            <div>
              <span className="amber">$</span> open{" "}
              <a
                className="cyan hover:underline"
                href={person.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/mahmudun-nur-miraz
              </a>
            </div>
          </div>
        </section>

        <footer className="mono py-10 text-xs mute flex justify-between">
          <span>
            © {new Date().getFullYear()} {person.name}
          </span>
          <a href="#top" className="hover:text-[color:var(--amber)]">
            back to top
          </a>
        </footer>
      </main>
    </div>
  );
}
