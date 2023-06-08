import { assertEquals, describe, it } from "/deps.ts";

import { range } from "/data/array.ts";
import { randInt, randInts } from "/util/mod.ts";
import { hornerHash, stringHash } from "./code.ts";

describe("hornerHash", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);

  const patterns = range(10).map((_) => ({
    input: { s: String.fromCharCode(...randInts(128, a, z)), m: randInt(10, 10000) },
  }));

  patterns.forEach(({ input: { s, m } }) =>
    it(JSON.stringify({ input: { s, m } }), () => {
      assertEquals(hornerHash(s, m), stringHash(s, m));
    })
  );
});
