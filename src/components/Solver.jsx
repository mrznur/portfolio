import { useMemo, useState } from "react";
import { solve, parseNumbers } from "../lib/solve24";

const PRESETS = ["1 1 5 5", "4 7 8 8", "3 3 8 8", "1 1 1 1"];
const chip =
  "mono rounded border px-2 py-1 text-xs transition-colors hover:text-[color:var(--amber)] hover:border-[color:var(--amber)]";

function Row({ label, r, base, color }) {
  return (
    <div>
      <div className="flex justify-between mono text-xs mute">
        <span>{label}</span>
        <span>
          {r.explored} states{r.skipped ? `, ${r.skipped} skipped` : ""}
        </span>
      </div>
      <div className="mt-1 h-2 rounded-sm" style={{ background: "#12233d" }}>
        <div
          className="bar h-2 rounded-sm"
          style={{ width: `${Math.max(3, (r.explored / base) * 100)}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function Solver() {
  const [input, setInput] = useState(PRESETS[0]);

  const res = useMemo(() => {
    const nums = parseNumbers(input);
    return nums && { plain: solve(nums, false), pruned: solve(nums, true) };
  }, [input]);

  const random = () =>
    setInput(Array.from({ length: 4 }, () => 1 + Math.floor(Math.random() * 13)).join(" "));

  const saved = res?.plain.explored
    ? Math.round((1 - res.pruned.explored / res.plain.explored) * 100)
    : 0;

  return (
    <div className="panel p-4 sm:p-5 min-w-0 w-full overflow-hidden">
      <label className="mono text-xs mute" htmlFor="g24">
        input: four numbers
      </label>
      <input
        id="g24"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
        className="mono mt-1 w-full rounded bg-transparent border px-3 py-2 text-lg amber"
        style={{ borderColor: "var(--line)" }}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p} onClick={() => setInput(p)} className={`${chip} mute`} style={{ borderColor: "var(--line)" }}>
            {p}
          </button>
        ))}
        <button onClick={random} className={`${chip} cyan`} style={{ borderColor: "var(--line)" }}>
          random
        </button>
      </div>

      {res ? (
        <div className="mt-5 space-y-4" aria-live="polite">
          <p className="mono text-sm">
            {res.plain.found ? (
              <>
                <span className="mute">solution </span>
                <span className="cyan">{res.plain.found.slice(1, -1)} = 24</span>
              </>
            ) : (
              <span className="mute">no solution: search exhausted</span>
            )}
          </p>
          <Row label="plain DFS" r={res.plain} base={res.plain.explored} color="#7F95B2" />
          <Row label="with dead-end memory" r={res.pruned} base={res.plain.explored} color="var(--amber)" />
          <p className="mono text-xs mute">
            dead-end memory explored <span className="amber">{saved}%</span> fewer states here
          </p>
        </div>
      ) : (
        <p className="mono text-sm mt-4 mute">Enter exactly four numbers, e.g. 4 7 8 8</p>
      )}
    </div>
  );
}
