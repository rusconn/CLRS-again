import {
  addBinary,
  binarySearchIterative,
  binarySearchRecursive,
  bubbleSort,
  hasCouple,
  insertionSort,
  insertionSortDesc,
  insertionSortRecursive,
  linearSearch,
  mergeSort,
  mergeSortModified,
  mergeSortWithoutSentinel,
  selectionSort,
} from "./code";

describe("insertionSort", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    insertionSort(input);
    expect(input).toEqual(output);
  });
});

describe("insertionSortDesc", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [2, 1] },
    { input: [2, 1], output: [2, 1] },
    { input: [1, 3, 2], output: [3, 2, 1] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    insertionSortDesc(input);
    expect(input).toEqual(output);
  });
});

describe("linearSearch", () => {
  const patterns = [
    { input: { A: [], v: 0 }, output: null },
    { input: { A: [1], v: 0 }, output: null },
    { input: { A: [1], v: 1 }, output: 0 },
    { input: { A: [2, 3, 1], v: 3 }, output: 1 },
    { input: { A: [2, 3, 1], v: 1 }, output: 2 },
  ];

  test.each(patterns)("%j", ({ input: { A, v }, output }) => {
    expect(linearSearch(A, v)).toEqual(output);
  });
});

describe("addBinary", () => {
  const patterns = [
    { input: { A: [0], B: [0] }, output: [0, 0] },
    { input: { A: [1], B: [0] }, output: [0, 1] },
    { input: { A: [0, 1, 0], B: [0, 0, 1] }, output: [0, 0, 1, 1] },
    { input: { A: [0, 1, 1], B: [0, 0, 1] }, output: [0, 1, 0, 0] },
    { input: { A: [0, 1, 1], B: [1, 0, 1] }, output: [1, 0, 0, 0] },
  ];

  test.each(patterns)("%j", ({ input: { A, B }, output }) => {
    expect(addBinary(A, B)).toEqual(output);
  });
});

describe("selectionSort", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    selectionSort(input);
    expect(input).toEqual(output);
  });
});

describe("mergeSort", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    mergeSort(input);
    expect(input).toEqual(output);
  });
});

describe("mergeSortWithoutSentinel", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    mergeSortWithoutSentinel(input, 0, input.length - 1);
    expect(input).toEqual(output);
  });
});

describe("insertionSortRecursive", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    insertionSortRecursive(input);
    expect(input).toEqual(output);
  });
});

describe("binarySearchIterative", () => {
  const patterns = [
    { input: { A: [], v: 0 }, output: null },
    { input: { A: [1], v: 0 }, output: null },
    { input: { A: [1], v: 1 }, output: 0 },
    { input: { A: [1, 2, 3], v: 1 }, output: 0 },
    { input: { A: [1, 2, 3], v: 3 }, output: 2 },
  ];

  test.each(patterns)("%j", ({ input: { A, v }, output }) => {
    expect(binarySearchIterative(A, v)).toEqual(output);
  });
});

describe("binarySearchRecursive", () => {
  const patterns = [
    { input: { A: [], v: 0 }, output: null },
    { input: { A: [1], v: 0 }, output: null },
    { input: { A: [1], v: 1 }, output: 0 },
    { input: { A: [1, 2, 3], v: 1 }, output: 0 },
    { input: { A: [1, 2, 3], v: 3 }, output: 2 },
  ];

  test.each(patterns)("%j", ({ input: { A, v }, output }) => {
    expect(binarySearchRecursive(A, v)).toEqual(output);
  });
});

describe("hasCouple", () => {
  const patterns = [
    { input: { S: [], x: 0 }, output: false },
    { input: { S: [1], x: 2 }, output: false },
    { input: { S: [2, 1, 3], x: 4 }, output: true },
    { input: { S: [2, 1, 3], x: 3 }, output: true },
    { input: { S: [2, 1, 3], x: 2 }, output: false },
  ];

  test.each(patterns)("%j", ({ input: { S, x }, output }) => {
    expect(hasCouple(S, x)).toEqual(output);
  });
});

describe("mergeSortModified", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    mergeSortModified(input);
    expect(input).toEqual(output);
  });
});

describe("bubbleSort", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    bubbleSort(input);
    expect(input).toEqual(output);
  });
});
