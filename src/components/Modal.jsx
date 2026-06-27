import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-5 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-[38rem] max-h-[84vh] rounded-2xl overflow-hidden flex flex-col animate-scale-in border border-white/8 bg-[#0d1320] shadow-2xl shadow-black/80">

          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-white/6 flex-shrink-0">
            <h2
              className="text-[1.05rem] font-semibold text-white"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white transition p-1.5 rounded-lg hover:bg-white/8"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-7 py-6 text-[1rem] text-slate-300 leading-7">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
