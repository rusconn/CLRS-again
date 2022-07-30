import { range } from "@/data/array";
import { randInts } from "@/util";
import { mergeSort } from "@/ch02/code";
import { heapSort } from "./code";

describe("heapSort", () => {
  const patterns = range(5).map(_ => ({
    input: randInts(10, -10, 10),
  }));

  test.each(patterns)("%j", ({ input }) => {
    const input2 = [...input]; // プリミティブ要素なのでディープコピー
    heapSort(input);
    mergeSort(input2);
    expect(input).toEqual(input2);
  });
});
