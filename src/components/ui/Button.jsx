/** Link-or-button. External links open in a new tab automatically. */
export default function Button({ href, onClick, variant = "ghost", className = "", children }) {
  const cls = `btn ${variant === "primary" ? "btn-primary" : ""} ${className}`;
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
