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

describe("peek", () => {
  const patterns = [
    { input: [1], output: { min: 1, max: 1 } },
    { input: [1, 2], output: { min: 1, max: 2 } },
    { input: [2, 1], output: { min: 1, max: 2 } },
    { input: [2, 3, 1], output: { min: 1, max: 3 } },
    { input: [15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1], output: { min: 0, max: 15 } },
  ];

  test.each(patterns)("%j", ({ input, output: { min } }) => {
    const minHeap = new BinaryHeap((x, y) => x < y, input);
    expect(minHeap.peek()).toBe(min);
    expect(minHeap.peek()).toBe(min);
  });

  test.each(patterns)("%j", ({ input, output: { max } }) => {
    const maxHeap = new BinaryHeap((x, y) => x > y, input);
    expect(maxHeap.peek()).toBe(max);
    expect(maxHeap.peek()).toBe(max);
  });
});

describe("pop minHeap", () => {
  const patterns = [
    { input: [1, 2], output: { min: 1, min2: 2 } },
    { input: [2, 1], output: { min: 1, min2: 2 } },
    { input: [2, 3, 1], output: { min: 1, min2: 2 } },
    { input: [15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1], output: { min: 0, min2: 1 } },
  ];

  test.each(patterns)("%j", ({ input, output: { min, min2 } }) => {
    const minHeap = new BinaryHeap((x, y) => x < y, input);
    expect(minHeap.pop()).toBe(min);
    expect(minHeap.pop()).toBe(min2);
  });
});

describe("pop maxHeap", () => {
  const patterns = [
    { input: [1, 2], output: { max: 2, max2: 1 } },
    { input: [2, 1], output: { max: 2, max2: 1 } },
    { input: [2, 3, 1], output: { max: 3, max2: 2 } },
    { input: [15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1], output: { max: 15, max2: 13 } },
  ];

  test.each(patterns)("%j", ({ input, output: { max, max2 } }) => {
    const maxHeap = new BinaryHeap((x, y) => x > y, input);
    expect(maxHeap.pop()).toBe(max);
    expect(maxHeap.pop()).toBe(max2);
  });
});

describe("push minHeap", () => {
  const patterns = [
    { input: { A: [], key: 0 }, output: { min: 0 } },
    { input: { A: [1], key: 0 }, output: { min: 0 } },
    { input: { A: [1], key: 2 }, output: { min: 1 } },
    { input: { A: [2, 3, 1], key: 0 }, output: { min: 0 } },
    { input: { A: [15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1], key: 10 }, output: { min: 0 } },
  ];

  test.each(patterns)("%j", ({ input: { A, key }, output: { min } }) => {
    const minHeap = new BinaryHeap((x, y) => x < y, A);
    minHeap.push(key);
    expect(minHeap.pop()).toBe(min);
  });
});

describe("push maxHeap", () => {
  const patterns = [
    { input: { A: [], key: 0 }, output: { max: 0 } },
    { input: { A: [1], key: 0 }, output: { max: 1 } },
    { input: { A: [1], key: 2 }, output: { max: 2 } },
    { input: { A: [2, 3, 1], key: 0 }, output: { max: 3 } },
    { input: { A: [15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1], key: 10 }, output: { max: 15 } },
  ];

  test.each(patterns)("%j", ({ input: { A, key }, output: { max } }) => {
    const maxHeap = new BinaryHeap((x, y) => x > y, A);
    maxHeap.push(key);
    expect(maxHeap.pop()).toBe(max);
  });
});

describe("remove minHeap", () => {
  const patterns = [
    { input: { A: [1], i: 0 }, output: [] },
    { input: { A: [1, 3, 2], i: 1 }, output: [1, 2] },
    { input: { A: [1, 3, 2], i: 2 }, output: [1, 3] },
    {
      input: { A: [1, 3, 2, 7, 9, 10, 14, 8, 16], i: 1 },
      output: [1, 7, 2, 8, 9, 10, 14, 16],
    },
    {
      input: { A: [1, 3, 2, 7, 9, 10, 14, 8, 16], i: 2 },
      output: [1, 3, 10, 7, 9, 16, 14, 8],
    },
  ];

  test.each(patterns)("%j", ({ input: { A, i }, output }) => {
    const minHeap = new BinaryHeap((x, y) => x < y, A);
    minHeap.remove(i);
    expect(A).toEqual(output);
  });
});

describe("remove maxHeap", () => {
  const patterns = [
    { input: { A: [1], i: 0 }, output: [] },
    { input: { A: [3, 1, 2], i: 1 }, output: [3, 2] },
    { input: { A: [3, 1, 2], i: 2 }, output: [3, 1] },
    {
      input: { A: [16, 9, 14, 8, 1, 10, 2, 3, 7], i: 1 },
      output: [16, 8, 14, 7, 1, 10, 2, 3],
    },
    {
      input: { A: [16, 9, 14, 8, 1, 10, 2, 3, 7], i: 2 },
      output: [16, 9, 10, 8, 1, 7, 2, 3],
    },
  ];

  test.each(patterns)("%j", ({ input: { A, i }, output }) => {
    const maxHeap = new BinaryHeap((x, y) => x > y, A);
    maxHeap.remove(i);
    expect(A).toEqual(output);
  });
});

describe("update minHeap", () => {
  const patterns = [
    { input: { A: [1], i: 0, key: 2 }, output: [2] },
    { input: { A: [1, 3, 2], i: 1, key: 4 }, output: [1, 4, 2] },
    { input: { A: [1, 3, 2], i: 1, key: 0 }, output: [0, 1, 2] },
    {
      input: { A: [1, 3, 2, 7, 9, 10, 14, 8, 16], i: 1, key: 11 },
      output: [1, 7, 2, 8, 9, 10, 14, 11, 16],
    },
    {
      input: { A: [1, 3, 2, 7, 9, 10, 14, 8, 16], i: 2, key: 0 },
      output: [0, 3, 1, 7, 9, 10, 14, 8, 16],
    },
  ];

  test.each(patterns)("%j", ({ input: { A, i, key }, output }) => {
    const minHeap = new BinaryHeap((x, y) => x < y, A);
    minHeap.update(i, key);
    expect(A).toEqual(output);
  });
});

describe("update maxHeap", () => {
  const patterns = [
    { input: { A: [1], i: 0, key: 2 }, output: [2] },
    { input: { A: [3, 1, 2], i: 1, key: 0 }, output: [3, 0, 2] },
    { input: { A: [3, 1, 2], i: 1, key: 4 }, output: [4, 3, 2] },
    {
      input: { A: [16, 9, 14, 8, 1, 10, 2, 3, 7], i: 1, key: 17 },
      output: [17, 16, 14, 8, 1, 10, 2, 3, 7],
    },
    {
      input: { A: [16, 9, 14, 8, 1, 10, 2, 3, 7], i: 2, key: 0 },
      output: [16, 9, 10, 8, 1, 0, 2, 3, 7],
    },
  ];

  test.each(patterns)("%j", ({ input: { A, i, key }, output }) => {
    const maxHeap = new BinaryHeap((x, y) => x > y, A);
    maxHeap.update(i, key);
    expect(A).toEqual(output);
  });
});
