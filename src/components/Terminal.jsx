import { useEffect, useRef, useState } from "react";

const NAMES = ["whoami", "projects", "skills", "research", "contact", "resume", "help", "open", "clear", "sudo"];
const QUICK = ["projects", "skills", "research", "contact", "help"];
const projectName = (p) => p.title.split(" — ")[0];

export default function Terminal({ data }) {
  const { person, projects, skills, research } = data;

  const COMMANDS = {
    whoami: () => [person.name, person.summary],
    projects: () => [
      ...projects.map((p, i) => `[${i + 1}] ${projectName(p)}${p.live ? "  (live)" : ""}`),
      "→ open <n> to visit",
    ],
    skills: () => [
      `frontend  ${skills.frontend.join(", ")}`,
      `backend   ${skills.backend.join(", ")}`,
      `ai/ml     ${skills.ml.join(", ")}`,
    ],
    research: () => [projectName(research), research.headline],
    contact: () => [person.email, person.links.github, person.links.linkedin],
    resume: () => (person.links.resume ? ["opening resume…"] : ["resume not available yet"]),
    help: () => [
      "whoami  projects  skills  research  contact  resume",
      "open <n|github|linkedin|resume>   clear   (↑/↓ history, Tab completes, / focuses)",
    ],
  };

  const [lines, setLines] = useState([
    { k: "in", t: "whoami" },
    { k: "out", t: COMMANDS.whoami() },
  ]);
  const [val, setVal] = useState("");
  const [hist, setHist] = useState([]);
  const [pos, setPos] = useState(-1);
  const box = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [lines]);

  // "/" focuses the terminal from anywhere on the page
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const urlFor = (arg) => {
    const p = projects[Number(arg) - 1];
    if (p) return p.live || p.repo;
    return {
      github: person.links.github,
      linkedin: person.links.linkedin,
      resume: person.links.resume,
    }[arg];
  };

  const run = (raw) => {
    const [cmd, arg, arg2] = raw.trim().toLowerCase().split(/\s+/);
    if (!cmd) return;
    setHist((h) => [...h, raw]);
    setPos(-1);
    if (cmd === "clear") return setLines([]);

    let out;
    if (cmd === "open") {
      const url = urlFor(arg);
      out = url ? [`opening ${url}`] : ["usage: open <project number | github | linkedin | resume>"];
      if (url) window.open(url, "_blank", "noopener");
    } else if (cmd === "resume") {
      out = COMMANDS.resume();
      if (person.links.resume) window.open(person.links.resume, "_blank", "noopener");
    } else if (cmd === "sudo") {
      out =
        arg === "hire" && arg2 === "miraz"
          ? ["permission granted ✔", `→ ${person.email}`]
          : ["miraz is not in the sudoers file. This incident will be reported."];
    } else {
      out = COMMANDS[cmd] ? COMMANDS[cmd]() : [`command not found: ${cmd}. Try help.`];
    }
    setLines((l) => [...l, { k: "in", t: raw }, { k: "out", t: out }]);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp" && hist.length) {
      e.preventDefault();
      const n = Math.min(pos + 1, hist.length - 1);
      setPos(n);
      setVal(hist[hist.length - 1 - n]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = Math.max(pos - 1, -1);
      setPos(n);
      setVal(n < 0 ? "" : hist[hist.length - 1 - n]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = NAMES.filter((c) => val && c.startsWith(val.toLowerCase()));
      if (m.length === 1) setVal(m[0]);
    }
  };

  return (
    <div className="panel overflow-hidden min-w-0">
      <div
        className="mono flex items-center justify-between border-b px-4 py-2 text-xs mute"
        style={{ borderColor: "var(--line)" }}
      >
        <span>miraz@portfolio: ~</span>
        <span>press / to type</span>
      </div>
      <div
        ref={box}
        className="mono h-56 sm:h-72 overflow-y-auto px-3 sm:px-4 py-3 text-[0.78rem] sm:text-[0.82rem] leading-6"
        aria-live="polite"
        onClick={() => input.current?.focus()}
      >
        {lines.map((l, i) =>
          l.k === "in" ? (
            <div key={i} className="break-all">
              <span className="amber">$</span> {l.t}
            </div>
          ) : (
            <div key={i} className="mute mb-1">
              {l.t.map((s, j) => (
                <div key={j} className="whitespace-pre-wrap break-all">
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
          className="flex min-w-0"
        >
          <span className="amber mr-2 shrink-0">$</span>
          <input
            ref={input}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
            placeholder="type help"
            className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-[#5b7396]"
          />
        </form>
      </div>
      <div className="flex flex-wrap gap-2 border-t px-4 py-3" style={{ borderColor: "var(--line)" }}>
        {QUICK.map((c) => (
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
