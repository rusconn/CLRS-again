import { assertEquals } from "std/testing/asserts";
import { describe, it } from "std/testing/bdd";

import { minmax, minmaxByPairing, randomizedSelect, select } from "./code.ts";

describe("minmax", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [1], output: [1, 1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [2, 0, 1], output: [0, 2] },
    { input: [2, 0, 1, 0, 2], output: [0, 2] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      assertEquals(minmax(input), output);
    })
  );
});

describe("minmaxByPairing", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [1], output: [1, 1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [2, 0, 1], output: [0, 2] },
    { input: [2, 0, 1, 0, 2], output: [0, 2] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      assertEquals(minmaxByPairing(input), output);
    })
  );
});

describe("select", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { A: [1], i: 1 }, output: 1 },
    { input: { A: [1, 2], i: 1 }, output: 1 },
    { input: { A: [1, 2], i: 2 }, output: 2 },
    { input: { A: [2, 0, 1], i: 1 }, output: 0 },
    { input: { A: [2, 0, 1], i: 2 }, output: 1 },
  ];

  patterns.forEach(({ input: { A, i }, output }, idx) =>
    it(`${idx}`, () => {
      assertEquals(select(A, i), output);
    })
  );
});

describe("randomizedSelect", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { A: [1], i: 1 }, output: 1 },
    { input: { A: [1, 2], i: 1 }, output: 1 },
    { input: { A: [1, 2], i: 2 }, output: 2 },
    { input: { A: [2, 0, 1], i: 1 }, output: 0 },
    { input: { A: [2, 0, 1], i: 2 }, output: 1 },
  ];

  patterns.forEach(({ input: { A, i }, output }, idx) =>
    it(`${idx}`, () => {
      assertEquals(randomizedSelect(A, i), output);
    })
  );
});
