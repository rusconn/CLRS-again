import { assertEquals } from "std/testing/asserts";
import { describe, it } from "std/testing/bdd";

import { range } from "/data/array.ts";
import { randInts } from "/util/mod.ts";
import { mergeSort } from "/ch02/code.ts";
import { quickSort, randomizedQuickSort } from "./code.ts";

describe("quickSort", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5)
    .map((_) => randInts(512, -10, 10))
    .map((ints) => ({ input: ints, input2: [...ints] }));

  patterns.forEach(({ input, input2 }) =>
    it(JSON.stringify({ input }), () => {
      quickSort(input);
      mergeSort(input2);
      assertEquals(input, input2);
    })
  );
});

describe("randomizedQuickSort", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5)
    .map((_) => randInts(512, -10, 10))
    .map((ints) => ({ input: ints, input2: [...ints] }));

  patterns.forEach(({ input, input2 }) =>
    it(JSON.stringify({ input }), () => {
      randomizedQuickSort(input);
      mergeSort(input2);
      assertEquals(input, input2);
    })
  );
});
