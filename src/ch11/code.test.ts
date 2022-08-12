import { range } from "@/data/array";
import { randInt, randInts } from "@/util";
import { stringHash, hornerHash } from "./code";

describe("hornerHash", () => {
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);

  const patterns = range(10).map(_ => ({
    input: { s: String.fromCharCode(...randInts(128, a, z)), m: randInt(10, 10000) },
  }));

  test.each(patterns)("%j", ({ input: { s, m } }) => {
    expect(hornerHash(s, m)).toBe(stringHash(s, m));
  });
});
