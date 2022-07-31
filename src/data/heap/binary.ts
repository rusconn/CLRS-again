import { swap } from "@/data/array";

export class BinaryHeap<T> {
  private heap: T[];

  /**
   * ヒープを構築する。
   *
   * O(n)
   *
   * @param cmp ヒープ条件維持に使う比較関数
   * @param data ヒープの初期データ。デフォルトは空。**破壊される**
   */
  constructor(private cmp: (x: T, y: T) => boolean, data: T[] = []) {
    this.buildHeap(data);
    this.heap = data;
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
   * ヒープからソート済みの配列を得る。**ヒープは空になる**
   *
   * O(nlgn)
   */
  intoSortedArray() {
    let heapSize = this.size();

    for (let i = heapSize - 1; i >= 1; i--) {
      swap(this.heap, 0, i);
      heapSize -= 1;
      this.downHeap(this.heap, 0, heapSize);
    }

    const array = this.heap;

    this.heap = [];

    return array;
  }

  /**
   * 最大優先度の要素を返す。
   *
   * O(1)
   */
  peek() {
    return this.heap.at(0);
  }

  /**
   * 最大優先度の要素をヒープから削除して返す。
   *
   * O(lgn)
   */
  pop() {
    if (this.empty()) {
      throw new RangeError("heap underflow.");
    }

    swap(this.heap, 0, this.size() - 1);

    const most = this.heap.pop();

    this.downHeap(this.heap, 0);

    return most;
  }

  /**
   * ヒープに要素を追加する。
   *
   * O(lgn)
   *
   * @param key 追加する要素
   */
  push(key: T) {
    this.heap.push(key);
    this.upHeap(this.heap, this.size() - 1);
  }

  /**
   * ヒープから要素を削除する。
   *
   * O(lgn)
   *
   * @param i 削除する要素の添字
   */
  remove(i: number) {
    // 最終要素の削除 or 唯一要素の削除
    if (this.size() - 1 === i || (this.size() === 1 && i === 0)) {
      this.heap.pop();
      return;
    }

    if (this.heap.at(i) === undefined) {
      throw new Error("not exist.");
    }

    const last = this.heap.pop() as T;

    this.update(i, last);
  }

  /**
   * 指定した要素の優先度を変更する。
   *
   * O(lgn)
   *
   * @param i 優先度を変更する要素の添字
   * @param key 新しい優先度
   */
  update(i: number, key: T) {
    const oldKey = this.heap.at(i);

    if (oldKey === undefined) {
      throw new Error("not exist.");
    }

    this.heap[i] = key;

    if (this.cmp(oldKey, key)) {
      this.downHeap(this.heap, i);
    } else {
      this.upHeap(this.heap, i);
    }
  }

  /**
   * Aをヒープにする。
   *
   * O(n)
   *
   * @param A ヒープにしたい対象
   */
  private buildHeap(A: T[]) {
    for (let i = Math.floor(A.length / 2) - 1; i >= 0; i--) {
      this.downHeap(A, i);
    }
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

  /**
   * A[i] を ヒープ条件における適切な位置へ"浮上させる"。
   *
   * O(lgn)
   *
   * @param A ヒープ
   * @param i 浮上させる要素の添字
   */
  private upHeap(A: T[], i: number) {
    const key = A[i];

    while (i > 0 && !this.cmp(A[BinaryHeap.parent(i)], key)) {
      A[i] = A[BinaryHeap.parent(i)];
      i = BinaryHeap.parent(i);
    }

    A[i] = key;
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
