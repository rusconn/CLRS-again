import { minmax, minmaxByPairing, randomizedSelect, select } from "./code";

describe("minmax", () => {
  const patterns = [
    { input: [1], output: [1, 1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [2, 0, 1], output: [0, 2] },
    { input: [2, 0, 1, 0, 2], output: [0, 2] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    expect(minmax(input)).toEqual(output);
  });
});

describe("minmaxByPairing", () => {
  const patterns = [
    { input: [1], output: [1, 1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [2, 0, 1], output: [0, 2] },
    { input: [2, 0, 1, 0, 2], output: [0, 2] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    expect(minmaxByPairing(input)).toEqual(output);
  });
});

describe("select", () => {
  const patterns = [
    { input: { A: [1], i: 1 }, output: 1 },
    { input: { A: [1, 2], i: 1 }, output: 1 },
    { input: { A: [1, 2], i: 2 }, output: 2 },
    { input: { A: [2, 0, 1], i: 1 }, output: 0 },
    { input: { A: [2, 0, 1], i: 2 }, output: 1 },
  ];

  test.each(patterns)("%j", ({ input: { A, i }, output }) => {
    expect(select(A, i)).toEqual(output);
  });
});

describe("randomizedSelect", () => {
  const patterns = [
    { input: { A: [1], i: 1 }, output: 1 },
    { input: { A: [1, 2], i: 1 }, output: 1 },
    { input: { A: [1, 2], i: 2 }, output: 2 },
    { input: { A: [2, 0, 1], i: 1 }, output: 0 },
    { input: { A: [2, 0, 1], i: 2 }, output: 1 },
  ];

  test.each(patterns)("%j", ({ input: { A, i }, output }) => {
    expect(randomizedSelect(A, i)).toEqual(output);
  });
});
