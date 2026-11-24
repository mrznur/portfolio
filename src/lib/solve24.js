/**
 * Game of 24 solver: DFS over "combine two numbers" moves.
 * With prune=true it keeps a dead-end memory: a state (multiset of values)
 * whose whole subtree failed is never explored again.
 */
const EPS = 1e-6;

export const parseNumbers = (input) => {
  const nums = input.trim().split(/[\s,]+/).map(Number);
  return nums.length === 4 && nums.every(Number.isFinite) ? nums : null;
};

export const solve = (nums, prune = false, target = 24) => {
  let explored = 0;
  let skipped = 0;
  let found = null;
  const dead = new Set();

  const dfs = (items) => {
    if (found) return;
    if (items.length === 1) {
      if (Math.abs(items[0].v - target) < EPS) found = items[0].e;
      return;
    }
    const key = items
      .map((i) => Math.round(i.v * 1e4))
      .sort((a, b) => a - b)
      .join(",");
    if (prune && dead.has(key)) {
      skipped++;
      return;
    }
    explored++;

    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];
        const rest = items.filter((_, k) => k !== i && k !== j);
        const moves = [
          [a.v + b.v, `(${a.e}+${b.e})`],
          [a.v * b.v, `(${a.e}×${b.e})`],
          [a.v - b.v, `(${a.e}-${b.e})`],
          [b.v - a.v, `(${b.e}-${a.e})`],
        ];
        if (b.v) moves.push([a.v / b.v, `(${a.e}÷${b.e})`]);
        if (a.v) moves.push([b.v / a.v, `(${b.e}÷${a.e})`]);
        for (const [v, e] of moves) {
          dfs([...rest, { v, e }]);
          if (found) return;
        }
      }
    }
    if (prune) dead.add(key);
  };

  dfs(nums.map((n) => ({ v: n, e: String(n) })));
  return { found, explored, skipped };
};
