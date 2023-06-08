import { ArrayDeque } from "/data/deque/array.ts";

export class ArrayDequeQueue<T> {
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
  enqueue(x: T) {
    this.data.pushTail(x);
  }

  /** O(1) */
  dequeue() {
    return this.data.popHead();
  }
}
