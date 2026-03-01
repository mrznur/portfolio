import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>

      <div
        className="fixed inset-0 bg-[#011f4b]/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto bg-[#f5f3f0] w-full max-w-2xl max-h-[85vh]
                     rounded-2xl shadow-2xl overflow-hidden flex flex-col
                     animate-scale-in border border-[#6497b1]/20"
        >

          <div className="flex items-center justify-between p-6 border-b border-[#6497b1]/20 bg-gradient-to-r from-[#005b96] to-[#03396c]">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-[#f5f3f0]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
