import { swap } from "/data/array.ts";

/** worst: Θ(n^2), best: Θ(n), average: Θ(n^2) */
const isort = (cmp: (x: number, y: number) => boolean) => (A: number[]) => {
  // A[j..]を挿入していく、A[0..j-1]はソート済み
  for (let j = 1; j < A.length; j++) {
    const key = A[j];

    // keyをソート済みの列に挿入する
    let i = j - 1;
    while (i >= 0 && !cmp(A[i], key)) {
      A[i + 1] = A[i--];
    }
    A[i + 1] = key;
  }
};

/** worst: Θ(n^2), best: Θ(n), average: Θ(n^2) */
export const insertionSort = isort((x, y) => x < y);

/** worst: Θ(n^2), best: Θ(n), average: Θ(n^2) */
export const insertionSortDesc = isort((x, y) => x > y);

/** worst: Θ(n), best: O(1), average: Θ(n) */
export const linearSearch = (A: readonly number[], v: typeof A[number]) => {
  for (let i = 0; i < A.length; i++) {
    if (A[i] === v) {
      return i;
    }
  }
  return null;
};

/** worst: Θ(n), best: Θ(n), average: Θ(n) */
export const addBinary = (A: readonly number[], B: readonly number[]) => {
  const C = Array<number>(A.length + 1);
  let carry = 0;

  for (let i = A.length - 1; i >= 0; i--) {
    const sum = carry + A[i] + B[i];
    carry = Math.floor(sum / 2);
    C[i + 1] = sum % 2;
  }

  C[0] = carry;

  return C;
};

/** worst: Θ(n^2), best: Θ(n^2), average: Θ(n^2) */
export const selectionSort = (A: number[]) => {
  for (let i = 0; i < A.length - 1; i++) {
    let min = i;

    for (let j = i + 1; j < A.length; j++) {
      if (A[min] > A[j]) {
        min = j;
      }
    }

    swap(A, i, min);
  }
};

/** worst: Θ(nlgn), best: Θ(nlgn), average: Θ(nlgn) */
export const mergeSort = (A: number[], p = 0, r = A.length - 1) => {
  if (p >= r) {
    return;
  }

  const q = Math.floor((p + r) / 2);
  mergeSort(A, p, q);
  mergeSort(A, q + 1, r);
  merge(A, p, q, r);
};

/** worst: Θ(n), best: Θ(n), average: Θ(n) (n=r-p) */
const merge = (A: number[], p: number, q: number, r: number) => {
  const [n1, n2] = [q - p + 1, r - q];
  const [L, R] = [Array<number>(n1 + 1), Array<number>(n2 + 1)];

  for (let i = 0; i < n1; i++) {
    L[i] = A[p + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = A[q + 1 + j];
  }

  // 番兵
  L[n1] = Infinity;
  R[n2] = Infinity;

  for (let i = 0, j = 0, k = p; k <= r; k++) {
    A[k] = L[i] <= R[j] ? L[i++] : R[j++];
  }
};

/** worst: Θ(nlgn), best: Θ(nlgn), average: Θ(nlgn) */
export const mergeSortWithoutSentinel = (A: number[], p = 0, r = A.length - 1) => {
  if (p >= r) {
    return;
  }

  const q = Math.floor((p + r) / 2);
  mergeSortWithoutSentinel(A, p, q);
  mergeSortWithoutSentinel(A, q + 1, r);
  mergeWithoutSentinel(A, p, q, r);
};

/** worst: Θ(n), best: Θ(n), average: Θ(n) (n=r-p) */
const mergeWithoutSentinel = (A: number[], p: number, q: number, r: number) => {
  const [n1, n2] = [q - p + 1, r - q];
  const [L, R] = [Array<number>(n1), Array<number>(n2)];

  for (let i = 0; i < n1; i++) {
    L[i] = A[p + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = A[q + 1 + j];
  }

  for (let i = 0, j = 0, k = p; k <= r; k++) {
    if (i === n1) {
      A[k] = R[j++];
    } else if (j === n2) {
      A[k] = L[i++];
    } else {
      A[k] = L[i] <= R[j] ? L[i++] : R[j++];
    }
  }
};

/** worst: Θ(n^2), best: Θ(n), average: Θ(n^2) */
export const insertionSortRecursive = (A: number[], i = A.length - 1) => {
  if (i < 1) {
    return;
  }

  insertionSortRecursive(A, i - 1);

  const key = A[i];

  // keyをソート済みの列に挿入する
  let j = i - 1;
  while (j >= 0 && A[j] > key) {
    A[j + 1] = A[j--];
  }
  A[j + 1] = key;
};

/** worst: Θ(lgn), best: O(1), average: Θ(lgn) */
export const binarySearchIterative = (
  A: readonly number[],
  v: typeof A[number],
  i = 0,
  j = A.length - 1,
) => {
  while (i <= j) {
    const mid = Math.floor((i + j) / 2);

    if (v === A[mid]) {
      return mid;
    }

    if (v < A[mid]) {
      j = mid - 1;
    } else {
      i = mid + 1;
    }
  }

  return null;
};

/** worst: Θ(lgn), best: O(1), average: Θ(lgn) */
export const binarySearchRecursive = (
  A: readonly number[],
  v: typeof A[number],
  i = 0,
  j = A.length - 1,
): number | null => {
  if (i > j) {
    return null;
  }

  const mid = Math.floor((i + j) / 2);

  if (v === A[mid]) {
    return mid;
  }

  return v < A[mid]
    ? binarySearchRecursive(A, v, i, mid - 1)
    : binarySearchRecursive(A, v, mid + 1, j);
};

/** worst: Θ(nlgn), best: Θ(nlgn), average: Θ(nlgn) */
export const hasCouple = (S: number[], x: number) => {
  mergeSort(S, 0, S.length - 1);

  for (let i = 0; i < S.length - 1; i++) {
    if (binarySearchIterative(S, x - S[i], i + 1, S.length - 1) !== null) {
      return true;
    }
  }

  return false;
};

/** worst: Θ(nlgn), best: Θ(nlgn), average: Θ(nlgn) */
export const mergeSortModified = (A: number[], p = 0, r = A.length - 1) => {
  if (p >= r) {
    return;
  }

  // 閾値に根拠はない
  if (r - p <= 64) {
    insertionSortForModify(A, p, r);
    return;
  }

  const q = Math.floor((p + r) / 2);
  mergeSortModified(A, p, q);
  mergeSortModified(A, q + 1, r);
  mergeWithoutSentinel(A, p, q, r);
};

/** worst: Θ(n^2), best: Θ(n), average: Θ(n^2) (n=r-p) */
export const insertionSortForModify = (A: number[], p: number, r: number) => {
  for (let j = p + 1; j <= r; j++) {
    const key = A[j];

    let i = j - 1;
    while (i >= p && A[i] > key) {
      A[i + 1] = A[i--];
    }
    A[i + 1] = key;
  }
};

/** worst: Θ(n^2), best: Θ(n^2), average: Θ(n^2) */
export const bubbleSort = (A: number[]) => {
  for (let i = 0; i < A.length - 1; i++) {
    for (let j = A.length - 1; j >= i + 1; j--) {
      if (A[j] < A[j - 1]) {
        swap(A, j, j - 1);
      }
    }
  }
};

/** Θ(n) */
export const horner = (A: readonly number[], x: number) => {
  let y = 0;
  for (let i = A.length - 1; i >= 0; i--) {
    y = A[i] + x * y;
  }
  return y;
};

/** Θ(n^2) */
export const polynomial = (A: readonly number[], x: number) => {
  let y = 0;
  for (let i = 0; i < A.length; i++) {
    let z = 1;
    for (let j = 1; j <= i; j++) {
      z *= x;
    }
    y += A[i] * z;
  }
  return y;
};

/** worst: Θ(nlgn), best: Θ(nlgn), average: Θ(nlgn) */
export const countInversions = (A: number[], p = 0, r = A.length - 1): number => {
  if (p >= r) {
    return 0;
  }

  const q = Math.floor((p + r) / 2);
  const a = countInversions(A, p, q);
  const b = countInversions(A, q + 1, r);
  return a + b + mergeInversions(A, p, q, r);
};

/** worst: Θ(n), best: Θ(n), average: Θ(n) (n=r-p) */
const mergeInversions = (A: number[], p: number, q: number, r: number) => {
  const [n1, n2] = [q - p + 1, r - q];
  const [L, R] = [Array<number>(n1 + 1), Array<number>(n2 + 1)];

  for (let i = 0; i < n1; i++) {
    L[i] = A[p + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = A[q + 1 + j];
  }

  // 番兵
  L[n1] = Infinity;
  R[n2] = Infinity;

  let inversions = 0;

  for (let i = 0, j = 0, k = p; k <= r; k++) {
    if (L[i] <= R[j]) {
      A[k] = L[i++];
    } else {
      A[k] = R[j++];
      inversions += n1 - i;
    }
  }

  return inversions;
};
