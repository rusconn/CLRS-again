import { addBinary, insertionSort, insertionSortDesc, linearSearch } from "./code";

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
