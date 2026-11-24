import { useInView } from "../../hooks/useObserver";

export default function Reveal({ className = "", children }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}
