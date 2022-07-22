import { range } from "@/data/array";
import { randInts } from "@/util";
import {
  maxDiffBruteForce,
  maxDiffSubarrayBruteForce,
  maxDiffKadane,
  maxDiffSubarrayDaC,
  maxSubarrayDaC,
  maxSubarrayBruteForce,
  maxSubarrayKadane,
} from "./code";

describe("maxSubarrayBruteForce", () => {
  const patterns = [
    { input: [], output: [-1, -1, 0] },
    { input: [1], output: [0, 0, 1] },
    { input: [2, 1], output: [0, 1, 3] },
    { input: [1, -3], output: [0, 0, 1] },
    {
      input: [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7],
      output: [7, 10, 43],
    },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    expect(maxSubarrayBruteForce(input)).toEqual(output);
  });
});

describe("maxSubarrayDaC", () => {
  const patterns = range(5).map(_ => ({
    input: randInts(10, -10, 10),
  }));

  // 分割統治法の結果が総当たり法の結果と一致することを確認する。
  // 最大部分配列は複数存在するかもしれないので部分和だけ確認する。
  test.each(patterns)("%j", ({ input }) => {
    const sumByDivide = maxSubarrayDaC(input)[2];
    const sumByBrute = maxSubarrayBruteForce(input)[2];
    expect(sumByDivide).toBe(sumByBrute);
  });
});

describe("maxSubarrayKadane", () => {
  const patterns = range(5).map(_ => ({
    input: randInts(10, -10, 10),
  }));

  // kadaneのアルゴリズムの結果が総当たり法の結果と一致することを確認する。
  // 最大部分配列は複数存在するかもしれないが、どちらも最も左に存在するものの情報を
  // 返すので、結果が全て一致するか確認できる。
  test.each(patterns)("%j", ({ input }) => {
    const kadane = maxSubarrayKadane(input);
    const brute = maxSubarrayBruteForce(input);
    expect(kadane).toEqual(brute);
  });
});

describe("maxDiffBruteForce", () => {
  const patterns = [
    { input: [], output: [-1, -1, 0] },
    { input: [1], output: [-1, -1, 0] },
    { input: [0, 1], output: [0, 1, 1] },
    { input: [10, 11, 7, 10, 6], output: [2, 3, 3] },
    {
      input: [100, 113, 110, 85, 105, 102, 86, 63, 81, 101, 94, 106, 101, 79, 94, 90, 97],
      output: [7, 11, 43],
    },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    expect(maxDiffBruteForce(input)).toEqual(output);
  });
});

describe("maxDiffSubarrayBruteForce", () => {
  const patterns = range(5).map(_ => ({
    input: randInts(10, -10, 10),
  }));

  test.each(patterns)("%j", ({ input }) => {
    const diff1 = maxDiffSubarrayBruteForce(input);
    const diff2 = maxDiffBruteForce(input);
    expect(diff1).toEqual(diff2);
  });
});

describe("maxDiffSubarrayDaC", () => {
  const patterns = range(5).map(_ => ({
    input: randInts(10, -10, 10),
  }));

  test.each(patterns)("%j", ({ input }) => {
    const diff1 = maxDiffSubarrayDaC(input)[2];
    const diff2 = maxDiffBruteForce(input)[2];
    expect(diff1).toBe(diff2);
  });
});

describe("maxDiffKadane", () => {
  const patterns = range(5).map(_ => ({
    input: randInts(10, -10, 10),
  }));

  test.each(patterns)("%j", ({ input }) => {
    const kadane = maxDiffKadane(input);
    const brute = maxDiffBruteForce(input);
    expect(kadane).toEqual(brute);
  });
});
