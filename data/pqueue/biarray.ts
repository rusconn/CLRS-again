export class BuiltInArrayPriorityQueue<T> {
  private data;

  /** O(nlgn) */
  constructor(private cmp: (x: T, y: T) => boolean, data: T[] = []) {
    data.sort((x, y) => (cmp(x, y) ? 1 : -1));
    this.data = data;
  }

  /** O(n) */
  push(x: T) {
    let i = this.data.length - 1;

    while (i >= 0 && this.cmp(this.data[i], x)) {
      this.data[i + 1] = this.data[i--];
    }

    this.data[i + 1] = x;
  }

  /** O(1) */
  pop() {
    return this.data.pop();
  }
}
