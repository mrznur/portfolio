import { useState } from "react";

const items = [
  { label: "About", id: "about" },
  { label: "What I Do", id: "what-i-do" },
  { label: "Projects", id: "projects" },
  { label: "Research", id: "research" },
  { label: "Education", id: "education" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" }
];

export default function Navbar({ onNavClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 border-b border-[#6497b1]/30 bg-[#f5f3f0] backdrop-blur shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-4">
          <a href="#top" className="font-bold text-lg text-[#011f4b]">Miraz</a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#03396c]">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => onNavClick(it.id)}
                className="hover:text-[#005b96] transition font-medium"
              >
                {it.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#011f4b] p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-scale-in">
            <nav className="flex flex-col gap-3">
              {items.map((it) => (
                <button
                  key={it.id}
                  onClick={() => handleNavClick(it.id)}
                  className="text-left px-4 py-2 text-[#03396c] hover:bg-[#b3cde0]/30 rounded-lg transition font-medium"
                >
                  {it.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}