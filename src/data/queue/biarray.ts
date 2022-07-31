export class BuiltInArrayQueue<T> {
  private data;

  constructor() {
    // in V8, it is faster not to pass the size.
    this.data = new Array<T>();
  }

  /** O(1) */
  empty() {
    return this.data.length === 0;
  }

  /** O(1) */
  enqueue(x: T) {
    this.data.push(x);
  }

  /** Θ(n) */
  dequeue() {
    return this.data.shift();
  }
}
