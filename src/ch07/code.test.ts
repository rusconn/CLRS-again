import { range } from "@/data/array";
import { randInts } from "@/util";
import { mergeSort } from "@/ch02/code";
import { quickSort, randomizedQuickSort } from "./code";

describe("quickSort", () => {
  const patterns = range(5)
    .map(_ => randInts(512, -10, 10))
    .map(ints => ({ input: ints, input2: [...ints] }));

  test.each(patterns)("%j", ({ input, input2 }) => {
    quickSort(input);
    mergeSort(input2);
    expect(input).toEqual(input2);
  });
});

describe("randomizedQuickSort", () => {
  const patterns = range(5)
    .map(_ => randInts(512, -10, 10))
    .map(ints => ({ input: ints, input2: [...ints] }));

  test.each(patterns)("%j", ({ input, input2 }) => {
    randomizedQuickSort(input);
    mergeSort(input2);
    expect(input).toEqual(input2);
  });
});
