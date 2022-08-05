/**
 * Fixed size stack.
 */
export class ArrayStack<T> {
  private top = -1;

  private data: Array<T>;

  constructor(private size: number) {
    this.data = Array<T>(size);
  }

  /** O(1) */
  full() {
    return this.top === this.size - 1;
  }

  /** O(1) */
  empty() {
    return this.top === -1;
  }

  /** O(1) */
  push(x: T) {
    if (this.full()) {
      throw new Error("overflow.");
    }

    this.data[++this.top] = x;
  }

  /** O(1) */
  pop() {
    if (this.empty()) {
      throw new Error("underflow.");
    }

    return this.data[this.top--];
  }
}
