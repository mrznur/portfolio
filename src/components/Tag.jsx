export default function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-blue-400/15 bg-blue-400/8 px-2.5 py-0.5 text-[0.82rem] font-medium text-blue-300/90 leading-5 tracking-wide">
      {children}
    </span>
  );
}
