import { describe, it, expect } from "vitest";
import { solve, parseNumbers } from "./solve24";

const evaluate = (expr) =>
  new Function(`return ${expr.replace(/×/g, "*").replace(/÷/g, "/")}`)();

describe("parseNumbers", () => {
  it("accepts exactly four finite numbers", () => {
    expect(parseNumbers("4 7 8 8")).toEqual([4, 7, 8, 8]);
    expect(parseNumbers("1,2, 3 4")).toEqual([1, 2, 3, 4]);
  });
  it("rejects bad input", () => {
    expect(parseNumbers("1 2 3")).toBeNull();
    expect(parseNumbers("a b c d")).toBeNull();
    expect(parseNumbers("")).toBeNull();
  });
});

describe("solve", () => {
  it("finds a valid expression that evaluates to 24", () => {
    for (const set of [[4, 7, 8, 8], [1, 1, 5, 5], [3, 3, 8, 8]]) {
      const { found } = solve(set, false);
      expect(found).not.toBeNull();
      expect(evaluate(found)).toBeCloseTo(24, 5);
    }
  });

  it("reports exhaustion for unsolvable sets", () => {
    expect(solve([1, 1, 1, 1], false).found).toBeNull();
    expect(solve([1, 1, 1, 1], true).found).toBeNull();
  });

  it("dead-end memory never changes solvability and never explores more", () => {
    for (let n = 0; n < 60; n++) {
      const set = Array.from({ length: 4 }, () => 1 + Math.floor(Math.random() * 13));
      const plain = solve(set, false);
      const pruned = solve(set, true);
      expect(Boolean(pruned.found)).toBe(Boolean(plain.found));
      expect(pruned.explored).toBeLessThanOrEqual(plain.explored);
    }
  });

  it("skips states on an exhaustive search", () => {
    expect(solve([1, 1, 1, 1], true).skipped).toBeGreaterThan(0);
  });
});
