import { BinaryHeap } from "@/data/heap/binary";

export class BinaryHeapPriorityQueue<T> {
  private heap;

  /** O(n) */
  constructor(cmp: (x: T, y: T) => boolean, data: T[] = []) {
    this.heap = new BinaryHeap<T>(cmp, data);
  }

  /** O(lgn) */
  push(x: T) {
    this.heap.push(x);
  }

  /** O(lgn) */
  pop() {
    return this.heap.pop();
  }
}
