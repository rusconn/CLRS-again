import { assertEquals } from "std/testing/asserts";
import { describe, it } from "std/testing/bdd";

import { range } from "/data/array.ts";
import { randInts } from "/util/mod.ts";
import { mergeSort } from "/ch02/code.ts";
import { heapSort } from "./code.ts";

describe("heapSort", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((_) => ({
    input: randInts(10, -10, 10),
  }));

  patterns.forEach(({ input }) =>
    it(JSON.stringify({ input }), () => {
      const input2 = [...input]; // プリミティブ要素なのでディープコピー
      heapSort(input);
      mergeSort(input2);
      assertEquals(input, input2);
    })
  );
});
