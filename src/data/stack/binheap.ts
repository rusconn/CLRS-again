import { BinaryHeap } from "/data/heap/binary.ts";

type Item<T> = {
  key: number;
  val: T;
};

export class BinaryHeapStack<T> {
  private heap;

  private key = 0;

  /** O(1) */
  constructor() {
    this.heap = new BinaryHeap<Item<T>>((x, y) => x.key > y.key);
  }

  /** O(1) */
  size() {
    return this.heap.size();
  }

  /** O(1) */
  empty() {
    return this.size() === 0;
  }

  /** O(lgn) */
  push(val: T) {
    this.heap.push({
      key: this.key++,
      val,
    });
  }

  /** O(lgn) */
  pop() {
    return this.heap.pop()?.val;
  }
}
