import Panel from "./ui/Panel";

export default function SkillsBlock({ groups }) {
  return (
    <Panel title="stack.js">
      <div className="mono p-4 sm:p-5 text-[0.8rem] sm:text-[0.85rem] leading-7 overflow-x-hidden">
        <p><span className="amber">const</span> stack = {"{"}</p>
        {Object.entries(groups).map(([k, v]) => {
          const vals = [...new Set(v)];
          return (
            <div key={k} className="pl-3 sm:pl-5 flex flex-wrap items-baseline gap-x-1">
              <span className="shrink-0">{k}:&nbsp;[</span>
              {vals.map((x, i) => (
                <span key={x} className="shrink-0">
                  <span className="cyan">"{x}"</span>
                  {i < vals.length - 1 && <span className="mute">,</span>}
                </span>
              ))}
              <span className="shrink-0">],</span>
            </div>
          );
        })}
        <p>{"}"}<span className="mute">;</span></p>
      </div>
    </Panel>
  );
}
