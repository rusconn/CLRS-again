import { assertEquals, describe, it } from "/deps.ts";

import {
  addBinary,
  binarySearchIterative,
  binarySearchRecursive,
  bubbleSort,
  countInversions,
  hasCouple,
  horner,
  insertionSort,
  insertionSortDesc,
  insertionSortRecursive,
  linearSearch,
  mergeSort,
  mergeSortModified,
  mergeSortWithoutSentinel,
  polynomial,
  selectionSort,
} from "./code.ts";

describe("insertionSort", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      insertionSort(input);
      assertEquals(input, output);
    })
  );
});

describe("insertionSortDesc", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [2, 1] },
    { input: [2, 1], output: [2, 1] },
    { input: [1, 3, 2], output: [3, 2, 1] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      insertionSortDesc(input);
      assertEquals(input, output);
    })
  );
});

describe("linearSearch", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { A: [], v: 0 }, output: null },
    { input: { A: [1], v: 0 }, output: null },
    { input: { A: [1], v: 1 }, output: 0 },
    { input: { A: [2, 3, 1], v: 3 }, output: 1 },
    { input: { A: [2, 3, 1], v: 1 }, output: 2 },
  ];

  patterns.forEach(({ input: { A, v }, output }, i) =>
    it(`${i}`, () => {
      assertEquals(linearSearch(A, v), output);
    })
  );
});

describe("addBinary", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { A: [0], B: [0] }, output: [0, 0] },
    { input: { A: [1], B: [0] }, output: [0, 1] },
    { input: { A: [0, 1, 0], B: [0, 0, 1] }, output: [0, 0, 1, 1] },
    { input: { A: [0, 1, 1], B: [0, 0, 1] }, output: [0, 1, 0, 0] },
    { input: { A: [0, 1, 1], B: [1, 0, 1] }, output: [1, 0, 0, 0] },
  ];

  patterns.forEach(({ input: { A, B }, output }, i) =>
    it(`${i}`, () => {
      assertEquals(addBinary(A, B), output);
    })
  );
});

describe("selectionSort", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      selectionSort(input);
      assertEquals(input, output);
    })
  );
});

describe("mergeSort", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      mergeSort(input);
      assertEquals(input, output);
    })
  );
});

describe("mergeSortWithoutSentinel", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      mergeSortWithoutSentinel(input);
      assertEquals(input, output);
    })
  );
});

describe("insertionSortRecursive", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      insertionSortRecursive(input);
      assertEquals(input, output);
    })
  );
});

describe("binarySearchIterative", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { A: [], v: 0 }, output: null },
    { input: { A: [1], v: 0 }, output: null },
    { input: { A: [1], v: 1 }, output: 0 },
    { input: { A: [1, 2, 3], v: 1 }, output: 0 },
    { input: { A: [1, 2, 3], v: 3 }, output: 2 },
  ];

  patterns.forEach(({ input: { A, v }, output }, i) =>
    it(`${i}`, () => {
      assertEquals(binarySearchIterative(A, v), output);
    })
  );
});

describe("binarySearchRecursive", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { A: [], v: 0 }, output: null },
    { input: { A: [1], v: 0 }, output: null },
    { input: { A: [1], v: 1 }, output: 0 },
    { input: { A: [1, 2, 3], v: 1 }, output: 0 },
    { input: { A: [1, 2, 3], v: 3 }, output: 2 },
  ];

  patterns.forEach(({ input: { A, v }, output }, i) =>
    it(`${i}`, () => {
      assertEquals(binarySearchRecursive(A, v), output);
    })
  );
});

describe("hasCouple", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { S: [], x: 0 }, output: false },
    { input: { S: [1], x: 2 }, output: false },
    { input: { S: [2, 1, 3], x: 4 }, output: true },
    { input: { S: [2, 1, 3], x: 3 }, output: true },
    { input: { S: [2, 1, 3], x: 2 }, output: false },
  ];

  patterns.forEach(({ input: { S, x }, output }, i) =>
    it(`${i}`, () => {
      assertEquals(hasCouple(S, x), output);
    })
  );
});

describe("mergeSortModified", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      mergeSortModified(input);
      assertEquals(input, output);
    })
  );
});

describe("bubbleSort", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
    { input: [2, 1], output: [1, 2] },
    { input: [1, 3, 2], output: [1, 2, 3] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      bubbleSort(input);
      assertEquals(input, output);
    })
  );
});

describe("horner", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { A: [], x: 4 }, output: 0 },
    { input: { A: [2], x: 4 }, output: 2 },
    { input: { A: [2, 1], x: 3 }, output: 5 },
    { input: { A: [2, 1], x: 0 }, output: 2 },
    { input: { A: [2, 1, 3], x: 5 }, output: 82 },
  ];

  patterns.forEach(({ input: { A, x }, output }, i) =>
    it(`${i}`, () => {
      assertEquals(horner(A, x), output);
    })
  );
});

describe("polynomial", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { A: [], x: 4 }, output: 0 },
    { input: { A: [2], x: 4 }, output: 2 },
    { input: { A: [2, 1], x: 3 }, output: 5 },
    { input: { A: [2, 1], x: 0 }, output: 2 },
    { input: { A: [2, 1, 3], x: 5 }, output: 82 },
  ];

  patterns.forEach(({ input: { A, x }, output }, i) =>
    it(`${i}`, () => {
      assertEquals(polynomial(A, x), output);
    })
  );
});

describe("countInversions", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: 0 },
    { input: [1], output: 0 },
    { input: [1, 2], output: 0 },
    { input: [2, 1], output: 1 },
    { input: [2, 3, 8, 6, 1], output: 5 },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      assertEquals(countInversions(input), output);
    })
  );
});
