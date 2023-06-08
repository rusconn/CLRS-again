import { ArrayQueue } from "/data/queue/array.ts";

/**
 * A stack implementation using two queues.
 */
export class ArrayQueueStack<T> {
  /** actual stack data */
  private q1;

  /** save area */
  private q2;

  constructor(size: number) {
    this.q1 = new ArrayQueue<T>(size);
    this.q2 = new ArrayQueue<T>(size);
  }

  /** O(1) */
  full() {
    return this.q1.full();
  }

  /** O(1) */
  empty() {
    return this.q1.empty();
  }

  /** Θ(n) */
  push(x: T) {
    while (!this.q1.empty()) {
      this.q2.enqueue(this.q1.dequeue());
    }

    this.q1.enqueue(x);

    while (!this.q2.empty()) {
      this.q1.enqueue(this.q2.dequeue());
    }
  }

  /** O(1) */
  pop() {
    return this.q1.dequeue();
  }
}
