import Panel from "./ui/Panel";

export default function SkillsBlock({ groups }) {
  return (
    <Panel title="stack.js">
      <pre className="mono overflow-x-auto p-5 text-[0.85rem] leading-7">
        <span className="amber">const</span> stack = {"{"}
        {"\n"}
        {Object.entries(groups).map(([k, v]) => (
          <span key={k}>
            {"  "}
            {k}: [
            {[...new Set(v)].map((x, i, a) => (
              <span key={x}>
                <span className="cyan">"{x}"</span>
                {i < a.length - 1 ? ", " : ""}
              </span>
            ))}
            ],{"\n"}
          </span>
        ))}
        {"}"};
      </pre>
    </Panel>
  );
}
