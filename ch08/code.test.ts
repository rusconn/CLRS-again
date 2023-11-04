import { assertEquals } from "std/testing/asserts";
import { describe, it } from "std/testing/bdd";

import { range } from "/data/array.ts";
import { randInts } from "/util/mod.ts";
import { mergeSort } from "/ch02/code.ts";
import { bucketSort, countingSort, countIntervalByRanking, countIntervalNaive } from "./code.ts";

describe("countingSort", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((_) => ({
    input: randInts(10, 0, 10),
  }));

  patterns.forEach(({ input }) =>
    it(JSON.stringify({ input }), () => {
      const output = countingSort(input, 10);
      mergeSort(input);
      assertEquals(output, input);
    })
  );
});

describe("countIntervalNaive and countIntervalByRanking", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { A: [1], k: 1, a: 3, b: -3 }, output: 0 },
    { input: { A: [1], k: 1, a: -3, b: -1 }, output: 0 },
    { input: { A: [1], k: 1, a: 3, b: 5 }, output: 0 },
    { input: { A: [1], k: 1, a: -1, b: 2 }, output: 1 },
    { input: { A: [1], k: 1, a: 1, b: 1 }, output: 1 },
    { input: { A: [1, 2], k: 2, a: -1, b: 1 }, output: 1 },
    { input: { A: [1, 2], k: 2, a: 2, b: 4 }, output: 1 },
    { input: { A: [1, 2], k: 8, a: 2, b: 4 }, output: 1 },
    { input: { A: [1, 2], k: 2, a: 0, b: 3 }, output: 2 },
    { input: { A: [1, 2, 3, 4, 6, 2, 4, 0, 8, 0, 3], k: 8, a: 2, b: 3 }, output: 4 },
    { input: { A: [1, 2, 3, 4, 6, 2, 4, 0, 8, 0, 3], k: 10, a: 2, b: 3 }, output: 4 },
    { input: { A: [1, 2, 3, 4, 6, 2, 4, 0, 8, 0, 3], k: 10, a: 4, b: 4 }, output: 2 },
    { input: { A: [1, 2, 3, 4, 6, 2, 4, 0, 8, 0, 3], k: 10, a: 8, b: 12 }, output: 1 },
  ];

  patterns.forEach(({ input: { A, k, a, b }, output }, i) =>
    it(`${i}`, () => {
      assertEquals(countIntervalNaive(A, a, b), output);
      assertEquals(countIntervalByRanking(A, k, a, b), output);
    })
  );
});

describe("bucketSort", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((_) => ({
    input: range(5).map((__) => Math.random()),
  }));

  patterns.forEach(({ input }) =>
    it(JSON.stringify({ input }), () => {
      const output = bucketSort(input);
      mergeSort(input);
      assertEquals(output, input);
    })
  );
});
