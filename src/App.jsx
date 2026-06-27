import { useState } from "react";
import Splash from "./components/Splash";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Section from "./components/Section";
import Card from "./components/Card";
import Tag from "./components/Tag";
import ButtonLink from "./components/ButtonLink";
import ProjectCard from "./components/ProjectCard";
import Typewriter from "./components/Typewriter";
import data from "./data/data.json";

const DF = "'Fraunces', Georgia, serif";

const ExtIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const Divider = () => <div className="border-t border-white/6 my-6" />;

const InfoRow = ({ icon, children }) => (
  <div className="flex items-start gap-3 text-slate-300">{icon}<span>{children}</span></div>
);

export default function App() {
  const { person, skills, research, projects, education, experience, certifications, languages } = data;
  const [modal,      setModal]      = useState(null);
  const [splashDone, setSplashDone] = useState(false);

  const openModal  = (id) => setModal(id);
  const closeModal = () => setModal(null);

  /* ── Modal content ──────────────────────────────── */
  const modalContent = () => {
    switch (modal) {

      case "about": return (
        <div className="space-y-5">
          <p className="leading-7 text-slate-300">{person.about}</p>
          <Divider />
          <p className="text-[0.65rem] font-bold tracking-[0.2em] text-blue-500 uppercase mb-4">Quick Info</p>
          <div className="space-y-3">
            <InfoRow icon={<span>📍</span>}>{person.location}</InfoRow>
            <InfoRow icon={<span>📧</span>}>
              <a href={`mailto:${person.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                {person.email}
              </a>
            </InfoRow>
          </div>
        </div>
      );

      case "what-i-do": return (
        <div className="space-y-5">
          {person.whatIDo.map((item, i) => (
            <div key={i} className="flex gap-4 pb-5 border-b border-white/5 last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-400 text-xs font-bold">{i + 1}</span>
              </div>
              <div>
                <p className="font-semibold text-white text-[0.95rem]">{item.title}</p>
                <p className="mt-1.5 text-slate-400 leading-7 text-[0.9rem]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      );

      case "projects": return (
        <div className="space-y-7">
          {projects.map((p) => (
            <div key={p.title} className="pb-7 border-b border-white/5 last:border-0 last:pb-0">
              <p className="font-semibold text-white text-[0.95rem]">{p.title}</p>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {p.stack.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
              <ul className="mt-3.5 space-y-2 text-[0.88rem] text-slate-400 list-disc pl-4 leading-relaxed">
                {p.points.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
              <div className="flex gap-6 mt-4 text-[0.85rem] font-medium">
                {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5">Repository <ExtIcon /></a>}
                {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5">Live Demo <ExtIcon /></a>}
              </div>
            </div>
          ))}
        </div>
      );

      case "research": return (
        <div>
          <p className="font-semibold text-white text-[0.95rem] mb-3" style={{ fontFamily: DF }}>{research.title}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {research.stack.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
          <ul className="space-y-3 text-[0.88rem] text-slate-400 list-disc pl-4 leading-relaxed">
            {research.points.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      );

      case "education": return (
        <div>
          <p className="font-semibold text-white text-[0.95rem]">{education.title}</p>
          <p className="mt-1.5 text-slate-400 text-[0.9rem]">{education.meta}</p>
          <Divider />
          <p className="text-[0.65rem] font-bold tracking-[0.2em] text-blue-500 uppercase mb-4">Certifications & Languages</p>
          {certifications.map((c, i) => (
            <p key={i} className="text-slate-400 text-[0.9rem] mb-2">
              <span className="text-slate-200 font-medium">{c.title}</span> ({c.year}) — {c.detail}
            </p>
          ))}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4">
            {languages.map((l) => (
              <span key={l.name} className="text-slate-400 text-[0.9rem]">
                <span className="text-slate-200 font-medium">{l.name}</span> — {l.level}
              </span>
            ))}
          </div>
        </div>
      );

      case "experience": return (
        <div className="space-y-6">
          {experience.map((e) => (
            <div key={e.title} className="pb-6 border-b border-white/5 last:border-0 last:pb-0">
              <p className="font-semibold text-white text-[0.95rem]">{e.title}</p>
              <p className="mt-1.5 text-[0.75rem] text-blue-400 font-semibold tracking-wide">{e.time}</p>
              <p className="mt-2.5 text-slate-400 leading-7 text-[0.9rem]">{e.desc}</p>
            </div>
          ))}
        </div>
      );

      case "contact": return (
        <div className="space-y-3">
          {[
            { label: "Email", content: <a href={`mailto:${person.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">{person.email}</a> },
            {
              label: "Links", content: (
                <div className="space-y-3">
                  {[
                    { name: "GitHub",    href: person.links.github    },
                    { name: "LinkedIn",  href: person.links.linkedin  },
                    { name: "Portfolio", href: person.links.portfolio },
                  ].map((l) => (
                    <a key={l.name} href={l.href} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors">
                      {l.name} <ExtIcon />
                    </a>
                  ))}
                </div>
              )
            },
          ].map(({ label, content }) => (
            <div key={label} className="rounded-xl border border-white/6 bg-white/[0.03] px-5 py-4">
              <p className="text-[0.65rem] font-bold tracking-[0.2em] text-blue-500 uppercase mb-3">{label}</p>
              {content}
            </div>
          ))}
        </div>
      );

      default: return null;
    }
  };

  const modalTitles = {
    about: "About Me", "what-i-do": "What I Do", projects: "Projects",
    research: "Research / Thesis", education: "Education",
    experience: "Experience", contact: "Contact",
  };

  const skillGroups = [
    { label: "Languages",        items: skills.languages },
    { label: "Frontend",         items: skills.frontend  },
    { label: "Backend",          items: skills.backend   },
    { label: "Database & Tools", items: [...skills.database, ...skills.tools] },
    { label: "AI / ML",          items: skills.ml        },
    { label: "Core Concepts",    items: skills.concepts  },
  ];

  return (
    <>
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}

      <div
        id="top"
        className={`min-h-screen bg-[#080c14] transition-opacity duration-700 ${
          splashDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Navbar onNavClick={openModal} activeModal={modal} />

        <Modal isOpen={!!modal} onClose={closeModal} title={modalTitles[modal] || ""}>
          {modalContent()}
        </Modal>

        {/* ── Hero ──────────────────────────────────────── */}
        <header id="about" className="relative pt-28 md:pt-40 pb-24 px-6 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/[0.07] blur-[80px] pointer-events-none" />

          <div className="relative mx-auto max-w-5xl">
            <p className="text-[0.65rem] font-bold tracking-[0.3em] text-blue-500 uppercase mb-5">
              {person.location}
            </p>

            <h1
              className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-[1.07] tracking-tight"
              style={{ fontFamily: DF }}
            >
              {person.name}
            </h1>

            <div className="mt-5 text-[1.05rem] md:text-[1.12rem] leading-8 min-h-[2rem] text-slate-300">
              <Typewriter />
            </div>

            <p className="mt-4 text-[0.97rem] text-slate-500 max-w-xl leading-[1.9]">
              {person.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={person.links.github}>GitHub</ButtonLink>
              <ButtonLink href={person.links.linkedin}>LinkedIn</ButtonLink>
              <ButtonLink href={`mailto:${person.email}`}>Email</ButtonLink>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6">

          {/* Skills */}
          <Section id="what-i-do" title="Skills">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {skillGroups.map(({ label, items }) => (
                <Card key={label}>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3.5">{label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((x) => <Tag key={x}>{x}</Tag>)}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* Research */}
          <Section id="research" title="Research / Thesis">
            <Card>
              <p className="font-semibold text-white text-[1rem]" style={{ fontFamily: DF }}>
                {research.title}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {research.stack.map((s) => <Tag key={s}>{s}</Tag>)}
              </div>
              <ul className="mt-5 space-y-2.5 text-[0.95rem] text-slate-400 list-disc pl-4 leading-relaxed">
                {research.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </Card>
          </Section>

          {/* Projects */}
          <Section id="projects" title="Projects">
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((p) => <ProjectCard key={p.title} project={p} />)}
            </div>
          </Section>

          {/* Education */}
          <Section id="education" title="Education">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">University</p>
                <p className="font-semibold text-white text-[1rem]">{education.title}</p>
                <p className="mt-1.5 text-slate-400">{education.meta}</p>
              </Card>
              <Card>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Certifications & Languages</p>
                {certifications.map((c) => (
                  <p key={c.title} className="text-slate-400 mb-2">
                    <span className="text-slate-200 font-medium">{c.title}</span> ({c.year}) — {c.detail}
                  </p>
                ))}
                <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-3">
                  {languages.map((l) => (
                    <span key={l.name} className="text-slate-400">
                      <span className="text-slate-200 font-medium">{l.name}</span> — {l.level}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </Section>

          {/* Experience */}
          <Section id="experience" title="Experience">
            <div className="grid md:grid-cols-2 gap-4">
              {experience.map((e) => (
                <Card key={e.title}>
                  <p className="font-semibold text-white text-[0.95rem] leading-snug">{e.title}</p>
                  <p className="mt-2 text-[0.72rem] text-blue-500 font-bold tracking-wider uppercase">{e.time}</p>
                  <p className="mt-2 text-[0.95rem] text-slate-400 leading-7">{e.desc}</p>
                </Card>
              ))}
            </div>
          </Section>

          {/* Contact */}
          <Section id="contact" title="Contact">
            <Card className="max-w-xs">
              <p className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest mb-3">Email</p>
              <a href={`mailto:${person.email}`} className="text-[0.92rem] text-blue-400 hover:text-blue-300 transition-colors">
                {person.email}
              </a>
            </Card>
          </Section>

          <footer className="pb-16 pt-2 text-[0.82rem] text-slate-700">
            © {new Date().getFullYear()} {person.name}
          </footer>
        </main>
      </div>
    </>
  );
}
