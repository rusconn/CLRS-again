import { BinaryHeap } from "./binary";

describe("buildMinHeap", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2, 3], output: [1, 2, 3] },
    { input: [4, 1, 3, 2, 16, 9, 10, 14, 8, 7], output: [1, 2, 3, 4, 7, 9, 10, 14, 8, 16] },
    { input: [5, 3, 17, 10, 84, 19, 6, 22, 9], output: [3, 5, 6, 9, 84, 19, 17, 22, 10] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    // eslint-disable-next-line no-new
    new BinaryHeap((x, y) => x < y, input);
    expect(input).toEqual(output);
  });
});

describe("buildMaxHeap", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2, 3], output: [3, 2, 1] },
    { input: [4, 1, 3, 2, 16, 9, 10, 14, 8, 7], output: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1] },
    { input: [5, 3, 17, 10, 84, 19, 6, 22, 9], output: [84, 22, 19, 10, 3, 17, 6, 5, 9] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    // eslint-disable-next-line no-new
    new BinaryHeap((x, y) => x > y, input);
    expect(input).toEqual(output);
  });
});
