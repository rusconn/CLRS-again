import { swap } from "/data/array.ts";
import { randInt } from "/util/mod.ts";
import { insertionSortForModify } from "/ch02/code.ts";

/** worst: Θ(n^2), best: Θ(nlgn), average: Θ(nlgn) */
export const quickSort = (A: number[], p = 0, r = A.length - 1) => {
  if (p >= r) {
    return;
  }

  if (r - p <= 128) {
    insertionSortForModify(A, p, r);
    return;
  }

  const q = partition(A, p, r);
  quickSort(A, p, q - 1);
  quickSort(A, q + 1, r);
};

/** expected: Θ(nlgn) */
export const randomizedQuickSort = (A: number[], p = 0, r = A.length - 1) => {
  if (p >= r) {
    return;
  }

  if (r - p <= 128) {
    insertionSortForModify(A, p, r);
    return;
  }

  const q = randomizedPartition(A, p, r);
  randomizedQuickSort(A, p, q - 1);
  randomizedQuickSort(A, q + 1, r);
};

/** Θ(n) (n=r-p+1) */
export const randomizedPartition = (A: number[], p: number, r: number) => {
  const i = randInt(p, r);
  swap(A, r, i);
  return partition(A, p, r);
};

/** Θ(n) (n=r-p+1) */
const partition = (A: number[], p: number, r: number) => {
  const pivot = A[r];
  let [i, same] = [p - 1, p - 1];

  // ピボット以下の要素を発見し次第配列の左へ並ばせる
  for (let j = p; j <= r - 1; j++) {
    if (A[j] === pivot) {
      same++;
    }
    if (A[j] <= pivot) {
      swap(A, ++i, j);
    }
  }

  // 並ばせた位置の右隣にピボットを移動し、大小の仕切りとする
  swap(A, i + 1, r);

  // 仕切りの位置を返す（全要素が同値だった場合は真ん中）
  return same === r - 1 ? Math.floor((p + r) / 2) : i + 1;
};
