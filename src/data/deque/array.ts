/**
 * Fixed size deque (double-ended queue).
 */
export class ArrayDeque<T> {
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
  pushHead(x: T) {
    if (this.full()) {
      throw new Error("overflow.");
    }

    this.head = this.left(this.head);
    this.data[this.head] = x;
  }

  /** O(1) */
  pushTail(x: T) {
    if (this.full()) {
      throw new Error("overflow.");
    }

    this.data[this.tail] = x;
    this.tail = this.right(this.tail);
  }

  /** O(1) */
  popHead() {
    if (this.empty()) {
      throw new Error("underflow.");
    }

    const x = this.data[this.head];
    this.head = this.right(this.head);
    return x;
  }

  /** O(1) */
  popTail() {
    if (this.empty()) {
      throw new Error("underflow.");
    }

    this.tail = this.left(this.tail);
    return this.data[this.tail];
  }

  /** O(1) */
  private left(i: number) {
    return i === 0 ? this.size - 1 : i - 1;
  }

  /** O(1) */
  private right(i: number) {
    return i === this.size - 1 ? 0 : i + 1;
  }
}
