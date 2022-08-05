import { randomizedPartition, randomizedQuickSort } from "@/ch07/code";

/** Θ(n) (comparison among elements = 2n-2 times) */
export const minmax = (A: readonly number[]): [number, number] => {
  let min = A[0];
  let max = A[0];

  for (let i = 1; i < A.length; i++) {
    if (A[i] < min) min = A[i];
    if (A[i] > max) max = A[i];
  }

  return [min, max];
};

/** Θ(n) (comparison among elements = 3⌊n/2⌋ times) */
export const minmaxByPairing = (A: readonly number[]): [number, number] => {
  let min;
  let max;
  let start;

  if (A.length % 2 === 0) {
    if (A[0] < A[1]) {
      min = A[0];
      max = A[1];
    } else {
      min = A[1];
      max = A[0];
    }
    start = 2;
  } else {
    min = A[0];
    max = A[0];
    start = 1;
  }

  let pairMin;
  let pairMax;

  for (let i = start; i < A.length - 1; i += 2) {
    if (A[i] < A[i + 1]) {
      pairMin = A[i];
      pairMax = A[i + 1];
    } else {
      pairMin = A[i + 1];
      pairMax = A[i];
    }

    if (pairMin < min) min = pairMin;
    if (pairMax > max) max = pairMax;
  }

  return [min, max];
};

/** expected: Θ(nlgn) */
export const select = (A: number[], i: number) => {
  randomizedQuickSort(A);
  return A[i - 1];
};

/** expected: Θ(n) */
export const randomizedSelect = (
  A: number[],
  i: number,
  p = 0,
  r = A.length - 1
): typeof A[number] => {
  if (p === r) {
    return A[p];
  }

  const q = randomizedPartition(A, p, r);
  const k = q - p + 1;

  if (i === k) {
    return A[q];
  }

  // prettier-ignore
  return i < k
    ? randomizedSelect(A, i, p, q - 1)
    : randomizedSelect(A, i - k, q + 1, r);
};
