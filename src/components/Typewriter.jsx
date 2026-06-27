import { useEffect, useState } from "react";

const phrases = [
  "build full-stack web applications",
  "craft clean, responsive frontends",
  "design and ship REST APIs",
  "train models for reasoning tasks",
  "research LLM reasoning systems",
  "write maintainable, scalable code",
];

export default function Typewriter() {
  const [index,   setIndex]   = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-baseline gap-2 flex-wrap">
      <span className="text-slate-300 font-semibold">I</span>
      <span
        key={index}
        className={`text-blue-400 font-medium ${visible ? "tw-enter" : "tw-exit"}`}
      >
        {phrases[index]}
      </span>
    </span>
  );
}
