import { useEffect, useState } from "react";

const DF = "'Fraunces', Georgia, serif";

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
      <h1
        className="anim-1 font-bold text-white leading-[1.08] tracking-tight"
        style={{ fontFamily: DF, fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
      >
        MD Mahmudun
        <br />
        <span className="font-light italic" style={{ color: "#93a8c4" }}>
          Nur Miraz
        </span>
      </h1>
      <p className="anim-2 mt-6 text-xl text-slate-400 font-light tracking-wide">
        Software Developer &amp; AI Researcher
      </p>
    </div>
  );
}

export default function Splash({ onDone }) {
  const [phase, setPhase] = useState("show");
  const skip = () => setPhase("exit");

  // Hold briefly, then split open
  useEffect(() => {
    const t = setTimeout(skip, 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" onClick={skip}>
      <div
        className={`absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-[#080c14] ${phase === "exit" ? "splash-top-out" : ""}`}
      >
        <SplashContent anchor="top" />
      </div>
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-[#080c14] ${phase === "exit" ? "splash-bottom-out" : ""}`}
      >
        <SplashContent anchor="bottom" />
      </div>
      <button
        onClick={skip}
        className="absolute bottom-6 right-6 z-10 text-sm text-slate-500 hover:text-white transition-colors"
      >
        Skip intro
      </button>
    </div>
  );
}
