export default function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#6497b1]/30 bg-[#b3cde0]/40 px-3 py-1 text-xs text-[#011f4b] font-medium">
      {children}
    </span>
  );
}
