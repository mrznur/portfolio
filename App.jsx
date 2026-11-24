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
  const liveCount = projects.filter((p) => p.live).length;
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
    [liveCount, "deployed"],
    [research.accuracy, "thesis acc."],
  ];
  const timeline = [{ title: education.title, time: education.meta, desc: "" }, ...experience];

  return (
    <div id="top">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn btn-primary">
        skip to content
      </a>
      <Navbar items={NAV} />

      <main id="main" className="mx-auto max-w-6xl px-6">
        <Hero person={person} stats={stats} aside={<Terminal data={data} />} />

        <Section
          id="projects"
          title="projects"
          sub={`${projects.length} builds, ${liveCount} deployed. Each one expands to the engineering details.`}
        >
          <div className="grid md:grid-cols-2 gap-4">
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
          <div className="grid lg:grid-cols-2 gap-6">
            <Solver />
            <Panel title="thesis findings">
              <ImageSlot
                src="/shots/research.png"
                alt="Thesis results figure"
                hint="/shots/research.png (results chart or architecture figure)"
                className="border-b"
              />
              <div className="p-5">
                <ul className="list-disc pl-5 space-y-2.5 text-[0.92rem] mute">
                  {research.points.slice(0, 4).map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
                <details className="mt-3">
                  <summary className="mono text-xs mute hover:text-[color:var(--amber)] w-fit">
                    <span className="chev">▸</span> {research.points.length - 4} more
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
            <div className="mono p-6 text-sm md:text-base leading-8">
              {[
                ["mail", `mailto:${person.email}`, person.email],
                ["open", person.links.github, "github.com/mrznur"],
                ["open", person.links.linkedin, "linkedin.com/in/mahmudun-nur-miraz"],
                ...(person.links.resume ? [["open", person.links.resume, "resume.pdf"]] : []),
              ].map(([cmd, href, label]) => (
                <div key={label}>
                  <span className="amber">$</span> {cmd}{" "}
                  <a className="cyan hover:underline break-all" href={href} target="_blank" rel="noreferrer">
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
