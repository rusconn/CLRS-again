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
import { quickSort, randomizedQuickSort } from "@/ch07/code";
import { bucketSort, countingSort } from "@/ch08/code";

for (const size of range(16 + 1).map(x => 2 ** x)) {
  const ints = randInts(size, 1, size);

  const intsForInsertion = [...ints];
  const intsForSelection = [...ints];
  const intsForBubble = [...ints];
  const intsForMerge = [...ints];
  const intsForMergeWithoutSentinel = [...ints];
  const intsFormergeModified = [...ints];
  const intsForHeap = [...ints];
  const intsForQuick = [...ints];
  const intsForRandQuick = [...ints];
  const intsForBuiltin = [...ints];
  const intsForCounting = [...ints];
  const numsForBucket = [...ints].map(int => (int - 1) / size);

  const insertion = () => insertionSort(intsForInsertion);
  const selection = () => selectionSort(intsForSelection);
  const bubble = () => bubbleSort(intsForBubble);
  const merge = () => mergeSort(intsForMerge);
  const mergeWithoutSentinel = () => mergeSortWithoutSentinel(intsForMergeWithoutSentinel);
  const mergeModified = () => mergeSortModified(intsFormergeModified);
  const heap = () => heapSort(intsForHeap);
  const quick = () => quickSort(intsForQuick);
  const randQuick = () => randomizedQuickSort(intsForRandQuick);
  const builtin = () => intsForBuiltin.sort((x, y) => x - y);
  const counting = () => countingSort(intsForCounting, size);
  const bucket = () => bucketSort(numsForBucket);

  const times = {
    insertion: bench(insertion),
    selection: bench(selection),
    bubble: bench(bubble),
    merge: bench(merge),
    mergeWithoutSentinel: bench(mergeWithoutSentinel),
    mergeModified: bench(mergeModified),
    heap: bench(heap),
    quick: bench(quick),
    randQuick: bench(randQuick),
    builtin: bench(builtin),
    counting: bench(counting),
    bucket: bench(bucket),
  };

  console.log({ size, times });
}
