import { ArrayStack } from "@/data/stack/array";

/**
 * A queue implementation using two stacks.
 */
export class ArrayStackQueue<T> {
  /** actual queue data */
  private s1;

  /** save area */
  private s2;

  constructor(size: number) {
    this.s1 = new ArrayStack<T>(size);
    this.s2 = new ArrayStack<T>(size);
  }

  /** O(1) */
  full() {
    return this.s1.full();
  }

  /** O(1) */
  empty() {
    return this.s1.empty();
  }

  /** Θ(n) */
  enqueue(x: T) {
    while (!this.s1.empty()) {
      this.s2.push(this.s1.pop());
    }

    this.s1.push(x);

    while (!this.s2.empty()) {
      this.s1.push(this.s2.pop());
    }
  }

  /** O(1) */
  dequeue() {
    return this.s1.pop();
  }
}
