export type Node<T> = {
  val: T;
  prev: Node<T>;
  next: Node<T>;
};

export class DoublyLinkedList<T> {
  /** a sentinel between head and tail */
  private readonly nil: Node<T>;

  constructor() {
    const nil = {} as Node<T>;
    nil.prev = nil;
    nil.next = nil;
    this.nil = nil;
  }

  /** Θ(n) */
  static fromArray<U>(A: U[]) {
    const li = new DoublyLinkedList<U>();
    const n = A.length;

    for (let i = 0; i < n; i++) {
      li.pushHead(A.pop() as U);
    }

    return li;
  }

  /** Θ(n) */
  intoArray() {
    const array = [];
    let node = this.nil.next;

    while (node !== this.nil) {
      array.push(node.val);
      node = node.next;
    }

    this.nil.next = this.nil;
    this.nil.prev = this.nil;

    return array;
  }

  /** O(1) */
  empty() {
    return this.nil.next === this.nil && this.nil.prev === this.nil;
  }

  /** Θ(n) */
  search(k: T, eq = (x: T, y: T) => x === y) {
    this.nil.val = k;
    let x = this.nil.next;

    while (!eq(x.val, k)) {
      x = x.next;
    }

    return x === this.nil ? undefined : x;
  }

  /** Θ(n) */
  searchBy<K>(key: K, toKey: (x: T) => K) {
    let x = this.nil.next;

    while (x !== this.nil && toKey(x.val) !== key) {
      x = x.next;
    }

    return x === this.nil ? undefined : x;
  }

  /** O(1) */
  pushHead(val: T) {
    const node = {
      val,
      prev: this.nil,
      next: this.nil.next,
    };

    this.nil.next.prev = node;
    this.nil.next = node;
  }

  /** O(1) */
  pushTail(val: T) {
    const node = {
      val,
      prev: this.nil.prev,
      next: this.nil,
    };

    this.nil.prev.next = node;
    this.nil.prev = node;
  }

  /** O(1) */
  popHead() {
    if (this.empty()) {
      throw new Error("underflow.");
    }

    const x = this.nil.next;

    this.nil.next = x.next;
    x.next.prev = this.nil;

    return x.val;
  }

  /** O(1) */
  popTail() {
    if (this.empty()) {
      throw new Error("underflow.");
    }

    const x = this.nil.prev;

    this.nil.prev = x.prev;
    x.prev.next = this.nil;

    return x.val;
  }

  /* eslint-disable class-methods-use-this */

  /** O(1) */
  insertBefore(x: Node<T>, val: T) {
    const node = {
      val,
      prev: x.prev,
      next: x,
    };

    x.prev.next = node;
    x.prev = node;
  }

  /** O(1) */
  insertAfter(x: Node<T>, val: T) {
    const node = {
      val,
      prev: x,
      next: x.next,
    };

    x.next.prev = node;
    x.next = node;
  }

  /** O(1) */
  delete(x: Node<T>) {
    x.prev.next = x.next;
    x.next.prev = x.prev;
  }

  /* eslint-enable class-methods-use-this */

  /** O(1) */
  deleteBefore(x: Node<T>) {
    if (x.prev === this.nil) {
      throw new Error("no nodes to delete.");
    }

    x.prev.prev.next = x;
    x.prev = x.prev.prev;
  }

  /** O(1) */
  deleteAfter(x: Node<T>) {
    if (x.next === this.nil) {
      throw new Error("no nodes to delete.");
    }

    x.next.next.prev = x;
    x.next = x.next.next;
  }

  /** O(1) */
  merge(other: DoublyLinkedList<T>) {
    if (other.empty()) {
      return;
    }

    other.nil.next.prev = this.nil.prev;
    this.nil.prev.next = other.nil.next;
    this.nil.prev = other.nil.prev;
    this.nil.prev.next = this.nil;
    other.nil.next = other.nil;
    other.nil.prev = other.nil;
  }

  /** Θ(n) */
  reverse() {
    let x = this.nil.next;

    while (x !== this.nil) {
      this.rev(x);
      x = x.prev;
    }

    this.rev(this.nil);
  }

  // eslint-disable-next-line class-methods-use-this
  private rev(x: Node<T>) {
    const { prev, next } = x;
    x.prev = next;
    x.next = prev;
  }
}
