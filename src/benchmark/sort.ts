import { range } from "@/data/array";
import { bench, randInts } from "@/util";

import {
  bubbleSort,
  insertionSort,
  mergeSort,
  mergeSortModified,
  mergeSortWithoutSentinel,
  selectionSort,
} from "@/ch02/code";
import { heapSort } from "@/ch06/code";

for (const size of range(16 + 1).map(x => 2 ** x)) {
  const ints = randInts(size, 1, size);

  const intsForInsertion = [...ints];
  const intsForSelection = [...ints];
  const intsForBubble = [...ints];
  const intsForMerge = [...ints];
  const intsForMergeWithoutSentinel = [...ints];
  const intsFormergeModified = [...ints];
  const intsForHeap = [...ints];
  const intsForBuiltin = [...ints];

  const insertion = () => insertionSort(intsForInsertion);
  const selection = () => selectionSort(intsForSelection);
  const bubble = () => bubbleSort(intsForBubble);
  const merge = () => mergeSort(intsForMerge);
  const mergeWithoutSentinel = () => mergeSortWithoutSentinel(intsForMergeWithoutSentinel);
  const mergeModified = () => mergeSortModified(intsFormergeModified);
  const heap = () => heapSort(intsForHeap);
  const builtin = () => intsForBuiltin.sort((x, y) => x - y);

  const times = {
    insertion: bench(insertion),
    selection: bench(selection),
    bubble: bench(bubble),
    merge: bench(merge),
    mergeWithoutSentinel: bench(mergeWithoutSentinel),
    mergeModified: bench(mergeModified),
    heap: bench(heap),
    builtin: bench(builtin),
  };

  console.log({ size, times });
}
