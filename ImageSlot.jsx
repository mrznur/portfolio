import { useState } from "react";

/**
 * Shows the image at `src`. If the file is missing, shows a dashed
 * placeholder naming the path to drop the file at (inside /public).
 */
export default function ImageSlot({ src, alt = "", ratio = "16 / 9", hint, className = "" }) {
  const [failed, setFailed] = useState(false);
  const ok = src && !failed;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio, background: "#0a1424" }}>
      {ok ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-2 flex flex-col items-center justify-center gap-1 rounded border border-dashed p-2 text-center mono text-[0.7rem] mute"
          style={{ borderColor: "var(--line)" }}
        >
          <span className="cyan">+ add image</span>
          <span className="break-all">{hint || src}</span>
        </div>
      )}
    </div>
  );
}
