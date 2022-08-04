import { minmax, minmaxByPairing } from "./code";

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
