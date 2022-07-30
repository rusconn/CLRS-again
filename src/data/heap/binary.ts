import { swap } from "@/data/array";

export class BinaryHeap<T> {
  private heap: T[];

  /**
   * ヒープを構築する。
   *
   * O(n)
   *
   * @param cmp ヒープ条件維持に使う比較関数
   */
  constructor(private cmp: (x: T, y: T) => boolean) {
    this.heap = [];
  }

  /**
   * ヒープのサイズを返す。
   *
   * O(1)
   */
  size() {
    return this.heap.length;
  }

  /**
   * ヒープが空かどうかを返す。
   *
   * O(1)
   */
  empty() {
    return this.size() === 0;
  }

  /**
   * A の 節点 i を根とする部分木をヒープにする。
   *
   * A[i] を 適切な位置へ"滑り落とす"。
   *
   * O(lgn)
   *
   * @param A 節点 i の左右の子が ヒープである２分木
   * @param i ヒープとしたい部分木の根の添字
   * @param n Aのサイズ
   */
  private downHeap(A: T[], i: number, n = A.length) {
    for (let prev = -1, most = i; prev !== i; ) {
      prev = i;

      const [l, r] = [BinaryHeap.left(i), BinaryHeap.right(i)];

      if (l < n && this.cmp(A[l], A[i])) {
        most = l;
      }

      if (r < n && this.cmp(A[r], A[most])) {
        most = r;
      }

      if (most !== i) {
        swap(A, i, most);
        i = most;
      }
    }
  }

  /** O(1) */
  private static parent(i: number) {
    return Math.ceil(i / 2) - 1;
  }

  /** O(1) */
  private static left(i: number) {
    return 2 * i + 1;
  }

  /** O(1) */
  private static right(i: number) {
    return 2 * i + 2;
  }
}
