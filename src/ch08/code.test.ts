import { range } from "@/data/array";
import { randInts } from "@/util";
import { mergeSort } from "@/ch02/code";
import { countingSort, countIntervalNaive, countIntervalByRanking } from "./code";

describe("countingSort", () => {
  const patterns = range(5).map(_ => ({ input: randInts(10, 0, 10) }));

  test.each(patterns)("%j", ({ input }) => {
    const output = countingSort(input, 10);
    mergeSort(input);
    expect(output).toEqual(input);
  });
});

describe("countIntervalNaive and countIntervalByRanking", () => {
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

  test.each(patterns)("%j", ({ input: { A, k, a, b }, output }) => {
    expect(countIntervalNaive(A, a, b)).toEqual(output);
    expect(countIntervalByRanking(A, k, a, b)).toEqual(output);
  });
});
