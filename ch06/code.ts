import { swap } from "/data/array.ts";

/** O(nlgn) */
export const heapSort = (A: number[]) => {
  let heapSize = A.length;

  buildHeap(A);

  for (let i = heapSize - 1; i >= 1; i--) {
    swap(A, 0, i);
    heapSize -= 1;
    downHeap(A, 0, heapSize);
  }
};

/** O(n) */
const buildHeap = (A: number[]) => {
  for (let i = Math.floor(A.length / 2) - 1; i >= 0; i--) {
    downHeap(A, i);
  }
};

/** O(lgn) */
const downHeap = (A: number[], i: number, n = A.length) => {
  for (let prev = -1, most = i; prev !== i;) {
    prev = i;

    const [l, r] = [left(i), right(i)];

    if (l < n && A[l] > A[i]) {
      most = l;
    }

    if (r < n && A[r] > A[most]) {
      most = r;
    }

    if (most !== i) {
      swap(A, i, most);
      i = most;
    }
  }
};

/** O(1) */
const left = (i: number) => 2 * i + 1;

/** O(1) */
const right = (i: number) => 2 * i + 2;
