/**
 * Fixed size queue.
 */
export class ArrayQueue<T> {
  private head = 0;

  private tail = 0;

  private size;

  private data: Array<T>;

  constructor(size: number) {
    this.size = size + 1;
    this.data = Array<T>(size + 1);
  }

  /** O(1) */
  full() {
    return this.head === this.tail + 1 || (this.head === 0 && this.tail === this.size - 1);
  }

  /** O(1) */
  empty() {
    return this.head === this.tail;
  }

  /** O(1) */
  enqueue(x: T) {
    if (this.full()) {
      throw new Error("overflow.");
    }

    this.data[this.tail] = x;
    this.tail = this.right(this.tail);
  }

  /** O(1) */
  dequeue() {
    if (this.empty()) {
      throw new Error("underflow.");
    }

    const x = this.data[this.head];
    this.head = this.right(this.head);
    return x;
  }

  /** O(1) */
  private right(i: number) {
    return i === this.size - 1 ? 0 : i + 1;
  }
}
