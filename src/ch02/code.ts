import { swap } from "@/data/array";

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
