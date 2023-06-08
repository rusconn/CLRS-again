import { ArrayDeque } from "/data/deque/array.ts";

export class ArrayDequeStack<T> {
  private data;

  constructor(size: number) {
    this.data = new ArrayDeque<T>(size);
  }

  /** O(1) */
  full() {
    return this.data.full();
  }

  /** O(1) */
  empty() {
    return this.data.empty();
  }

  /** O(1) */
  push(x: T) {
    this.data.pushTail(x);
  }

  /** O(1) */
  pop() {
    return this.data.popTail();
  }
}
