import { useEffect, useState } from "react";

const tags = ["Full-Stack Dev", "AI / ML Research", "LLM Systems", "Clean Code"];

function SplashContent({ anchor }) {
  return (
    <div
      className="absolute left-0 w-full flex flex-col items-center justify-center text-center px-6 select-none pointer-events-none"
      style={
        anchor === "top"
          ? { top: 0, height: "100vh" }
          : { bottom: 0, height: "100vh" }
      }
    >
      <p className="anim-1 text-xs font-bold tracking-[0.35em] text-blue-400 uppercase mb-6">
        Portfolio
      </p>
      <h1
        className="anim-2 font-bold text-white leading-[1.08] tracking-tight"
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
        }}
      >
        MD Mahmudun
        <br />
        <span className="font-light italic" style={{ color: "#93a8c4" }}>Nur Miraz</span>
      </h1>
      <p className="anim-3 mt-6 text-xl text-slate-400 font-light tracking-wide">
        Software Developer &amp; AI Researcher
      </p>
      <div className="anim-4 mt-6 flex flex-wrap justify-center gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="px-4 py-1.5 rounded-full text-sm border border-slate-700/80 text-slate-400 bg-slate-800/40"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Splash({ onDone }) {
  const [phase, setPhase] = useState("show");

  useEffect(() => {
    // Hold for 5.5s, then exit
    const t = setTimeout(() => setPhase("exit"), 3500);
    return () => clearTimeout(t);
  }, []);

  // After exit animation ends (0.85s), call onDone
  // Use a timeout instead of onAnimationEnd to avoid child animation events firing
  useEffect(() => {
    if (phase === "exit") {
      const t = setTimeout(() => onDone(), 900);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Top half */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-[#080c14] ${phase === "exit" ? "splash-top-out" : ""}`}
      >
        <SplashContent anchor="top" />
      </div>

      {/* Bottom half */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-[#080c14] ${phase === "exit" ? "splash-bottom-out" : ""}`}
      >
        <SplashContent anchor="bottom" />
      </div>
    </div>
  );
}
