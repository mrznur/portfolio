import { useState } from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Section from "./components/Section";
import Card from "./components/Card";
import Tag from "./components/Tag";
import ButtonLink from "./components/ButtonLink";
import ProjectCard from "./components/ProjectCard";

import data from "./data/data.json";

export default function App() {
  const { person, skills, research, projects, education, experience, certifications, languages } = data;
  const [modalContent, setModalContent] = useState(null);

  const handleNavClick = (sectionId) => setModalContent(sectionId);
  const closeModal = () => setModalContent(null);

  const ExternalIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );

  const renderModalContent = () => {
    switch (modalContent) {
      case "about":
        return (
          <div className="space-y-6">
            <p className="text-[#03396c] leading-relaxed text-lg">{person.about}</p>
            <div className="border-t border-slate-200 pt-4 bg-gradient-to-br from-[#b3cde0]/30 to-transparent p-4 rounded-lg">
              <span className="text-sm font-semibold text-[#011f4b] block mb-3">Quick Info</span>
              <div className="space-y-2 text-sm text-[#03396c]">
                <div className="flex items-center gap-2">
                  <span className="text-[#005b96]">📍</span> {person.location}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#005b96]">📧</span>
                  <a href={`mailto:${person.email}`} className="text-[#005b96] hover:underline">{person.email}</a>
                </div>
              </div>
            </div>
          </div>
        );

      case "what-i-do":
        return (
          <div className="space-y-6">
            {person.whatIDo.map((item, i) => (
              <div key={i} className="pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#005b96] to-[#03396c] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#011f4b] text-lg">{item.title}</h3>
                    <p className="mt-2 text-[#03396c] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "projects":
        return (
          <div className="space-y-6">
            {projects.map((p) => (
              <div key={p.title} className="border-b border-slate-200 last:border-0 pb-6 last:pb-0">
                <h3 className="font-semibold text-[#011f4b] text-lg">{p.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {p.stack.map((tech) => (
                    <span key={tech} className="text-xs px-3 py-1 bg-[#b3cde0] text-[#011f4b] rounded-full font-medium">{tech}</span>
                  ))}
                </div>
                <ul className="mt-3 space-y-1 text-sm text-[#03396c] list-disc pl-5">
                  {p.points.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
                <div className="flex gap-6 mt-4 text-sm font-medium">
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="text-[#005b96] hover:text-[#03396c] transition flex items-center gap-1">
                      Repository <ExternalIcon />
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="text-[#005b96] hover:text-[#03396c] transition flex items-center gap-1">
                      Live Demo <ExternalIcon />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case "research":
        return (
          <div>
            <h3 className="font-semibold text-[#011f4b] text-lg mb-3">{research.title}</h3>
            <ul className="space-y-2 text-sm text-[#03396c] list-disc pl-5">
              {research.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        );

      case "education":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#011f4b] text-lg">{education.title}</h3>
              <p className="mt-2 text-sm text-[#03396c]">{education.meta}</p>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <span className="font-semibold text-[#011f4b] block mb-3">Certifications & Languages</span>
              {certifications.map((c, i) => (
                <div key={i} className="mb-3 text-sm text-[#03396c]">
                  <span className="font-medium text-[#011f4b]">{c.title}</span> ({c.year}) — {c.detail}
                </div>
              ))}
              <div className="flex gap-4 mt-2">
                {languages.map((l) => (
                  <span key={l.name} className="text-sm text-[#03396c]">
                    <span className="font-medium text-[#011f4b]">{l.name}</span> — {l.level}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-6">
            {experience.map((e) => (
              <div key={e.title} className="border-b border-slate-200 last:border-0 pb-6 last:pb-0">
                <h3 className="font-semibold text-[#011f4b] text-lg">{e.title}</h3>
                <p className="mt-1 text-sm text-[#6497b1]">{e.time}</p>
                <p className="mt-2 text-sm text-[#03396c]">{e.desc}</p>
              </div>
            ))}
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#b3cde0]/30 to-transparent p-4 rounded-lg">
              <span className="text-sm font-semibold text-[#011f4b] block mb-2">Email</span>
              <a href={`mailto:${person.email}`} className="text-[#005b96] hover:text-[#03396c] font-medium transition">
                {person.email}
              </a>
            </div>
            <div className="bg-gradient-to-br from-[#b3cde0]/30 to-transparent p-4 rounded-lg">
              <span className="text-sm font-semibold text-[#011f4b] block mb-3">Links</span>
              <div className="flex flex-col gap-3">
                {[
                  { label: "GitHub", href: person.links.github },
                  { label: "LinkedIn", href: person.links.linkedin },
                  { label: "Portfolio", href: person.links.portfolio },
                ].map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                    className="text-[#005b96] hover:text-[#03396c] font-medium transition flex items-center gap-2">
                    {l.label} <ExternalIcon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => ({
    about: "About Me",
    "what-i-do": "What I Do",
    projects: "Projects",
    research: "Research",
    education: "Education",
    experience: "Experience",
    contact: "Contact",
  })[modalContent] || "";

  return (
    <div id="top" className="min-h-screen bg-gradient-to-br from-[#b3cde0] to-[#6497b1]/30 text-[#011f4b]">
      <Navbar onNavClick={handleNavClick} />

      <Modal isOpen={!!modalContent} onClose={closeModal} title={getModalTitle()}>
        {renderModalContent()}
      </Modal>

      <header id="about" className="pt-16 md:pt-24 pb-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-[#03396c] font-medium">{person.location}</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold tracking-tight text-[#011f4b]">
            {person.name}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#03396c] max-w-3xl leading-relaxed">
            {person.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={person.links.github}>GitHub</ButtonLink>
            <ButtonLink href={person.links.linkedin}>LinkedIn</ButtonLink>
            <ButtonLink href={`mailto:${person.email}`}>Email</ButtonLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4">
        <Section id="what-i-do" title="Skills">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <span className="font-semibold block">Languages</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.languages.map((x) => <Tag key={x}>{x}</Tag>)}
              </div>
            </Card>
            <Card>
              <span className="font-semibold block">Frontend</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.frontend.map((x) => <Tag key={x}>{x}</Tag>)}
              </div>
            </Card>
            <Card>
              <span className="font-semibold block">Backend</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.backend.map((x) => <Tag key={x}>{x}</Tag>)}
              </div>
            </Card>
            <Card>
              <span className="font-semibold block">Database & Tools</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {[...skills.database, ...skills.tools].map((x) => <Tag key={x}>{x}</Tag>)}
              </div>
            </Card>
            <Card>
              <span className="font-semibold block">AI / ML</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.ml.map((x) => <Tag key={x}>{x}</Tag>)}
              </div>
            </Card>
            <Card>
              <span className="font-semibold block">Core Concepts</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.concepts.map((x) => <Tag key={x}>{x}</Tag>)}
              </div>
            </Card>
          </div>
        </Section>

        <Section id="research" title="Research / Thesis">
          <Card>
            <span className="font-semibold block">{research.title}</span>
            <ul className="mt-3 space-y-2 text-sm text-[#03396c] list-disc pl-5">
              {research.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </Card>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p) => <ProjectCard key={p.title} project={p} />)}
          </div>
        </Section>

        <Section id="education" title="Education">
          <Card>
            <span className="font-semibold block">{education.title}</span>
            <p className="mt-2 text-sm text-[#03396c]">{education.meta}</p>
          </Card>
        </Section>

        <Section id="experience" title="Experience">
          <div className="grid md:grid-cols-2 gap-4">
            {experience.map((e) => (
              <Card key={e.title}>
                <span className="font-semibold block">{e.title}</span>
                <p className="mt-2 text-sm text-[#6497b1]">{e.time}</p>
                <p className="mt-3 text-sm text-[#03396c]">{e.desc}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <Card>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-[#011f4b]">Email</span>
              <a className="text-[#005b96] hover:underline text-sm" href={`mailto:${person.email}`}>
                {person.email}
              </a>
            </div>
          </Card>
        </Section>

        <footer className="pb-12 pt-4 text-xs text-[#03396c]">
          © {new Date().getFullYear()} {person.name}
        </footer>
      </main>
    </div>
  );
}
