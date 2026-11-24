import data from "./data/data.json";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Terminal from "./components/Terminal";
import Solver from "./components/Solver";
import ProjectCard from "./components/ProjectCard";
import SkillsBlock from "./components/SkillsBlock";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";
import Section from "./components/ui/Section";
import Panel from "./components/ui/Panel";
import Button from "./components/ui/Button";
import ImageSlot from "./components/ui/ImageSlot";

const NAV = [
  { id: "projects", label: "projects" },
  { id: "research", label: "research" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "background" },
  { id: "contact", label: "contact" },
];

export default function App() {
  const { person, skills, research, projects, education, experience } = data;
  const thesis = research.title.split(" — ")[0];

  const groups = {
    languages: skills.languages,
    frontend: skills.frontend,
    backend: skills.backend,
    data: [...skills.database, ...skills.tools],
    ml: skills.ml,
  };
  const stats = [
    [projects.length, "projects"],
    ["89%", "thesis acc."],
    ["4+", "years coding"],
  ];
  const timeline = [{ title: education.title, time: education.meta, desc: "" }, ...experience];

  return (
    <div id="top">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn btn-primary">
        skip to content
      </a>
      <Navbar items={NAV} />

      <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6">
        <Hero person={person} stats={stats} aside={<Terminal data={data} />} />

        <Section
          id="projects"
          title="projects"
          sub={`${projects.length} builds across full-stack, AI/ML, and frontend. Each one expands to the engineering details.`}
        >
          <div className="grid md:grid-cols-2 gap-4 min-w-0">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} featured={i === 0} />
            ))}
          </div>
        </Section>

        <Section
          id="research"
          title="research"
          sub={`${thesis}. Try the idea yourself: the solver finds 24 with and without a dead-end memory.`}
        >
          <div className="grid lg:grid-cols-2 gap-6 min-w-0">

            {/* ── Left: Solver + key numbers ── */}
            <div className="min-w-0 flex flex-col gap-6">
              <Solver />
              <Panel title="key numbers">
                <div className="grid grid-cols-2 gap-px" style={{ background: "var(--line)" }}>
                  {[
                    ["89%",         "Game of 24 accuracy",       "100-puzzle test set"],
                    ["900",         "annotated traces",          "distillation pipeline"],
                    ["30–80%",      "states skipped",            "dead-end memory"],
                    ["100%",        "arithmetic accuracy",       "student model v2"],
                  ].map(([num, label, sub]) => (
                    <div key={label} className="p-4 sm:p-5" style={{ background: "var(--panel)" }}>
                      <p className="mono text-2xl sm:text-3xl font-bold amber leading-none">{num}</p>
                      <p className="mt-1.5 text-[0.82rem] font-medium leading-snug">{label}</p>
                      <p className="mono text-[0.72rem] mute mt-0.5">{sub}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            {/* ── Right: thesis findings ── */}
            <Panel title="thesis findings" className="min-w-0">
              <ImageSlot
                src="/shots/research.png"
                alt="Thesis results figure"
                hint="/shots/research.png (results chart or architecture figure)"
                className="border-b"
              />
              <div className="p-4 sm:p-5">
                <ul className="list-disc pl-5 space-y-2.5 text-[0.92rem] mute">
                  {research.points.slice(0, 4).map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
                <details className="mt-3">
                  <summary className="mono text-xs mute hover:text-[color:var(--amber)] w-fit cursor-pointer">
                    <span className="chev">▸</span> {research.points.length - 4} more findings
                  </summary>
                  <ul className="mt-3 list-disc pl-5 space-y-2.5 text-[0.92rem] mute">
                    {research.points.slice(4).map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </details>
                {research.paper && (
                  <Button href={research.paper} className="mt-5 inline-block">read the thesis</Button>
                )}
              </div>
            </Panel>

          </div>
        </Section>

        <Section id="skills" title="skills">
          <SkillsBlock groups={groups} />
        </Section>

        <Section id="experience" title="background">
          <Timeline items={timeline} />
        </Section>

        <Section id="contact" title="contact">
          <Panel>
            <div className="mono p-4 sm:p-6 text-xs sm:text-sm leading-8">
              {[
                ["mail", `mailto:${person.email}`, person.email],
                ["open", person.links.github, "github.com/mrznur"],
                ["open", person.links.linkedin, "linkedin /in/mahmudun-nur-miraz"],
                ...(person.links.resume ? [["open", person.links.resume, "resume.pdf"]] : []),
              ].map(([cmd, href, label]) => (
                <div key={label} className="flex flex-wrap gap-x-2 items-baseline">
                  <span className="amber shrink-0">$</span>
                  <span className="shrink-0">{cmd}</span>
                  <a
                    className="cyan hover:underline break-all min-w-0"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {label}
                  </a>
                </div>
              ))}
            </div>
          </Panel>
        </Section>

        <Footer name={person.name} />
      </main>
    </div>
  );
}
