export type Node<T> = {
  val: T;
  next: Node<T>;
};

export class SinglyLinkedList<T> {
  /** a sentinel between head and tail */
  private readonly nil: Node<T>;

  private tail: Node<T>;

  constructor() {
    const nil = {} as Node<T>;
    nil.next = nil;
    this.nil = nil;
    this.tail = nil;
  }

  /** Θ(n) */
  static fromArray<U>(A: U[]) {
    const li = new SinglyLinkedList<U>();
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

    return array;
  }

  /** O(1) */
  empty() {
    return this.nil.next === this.nil;
  }

  /** Θ(n) */
  search(val: T) {
    this.nil.val = val;
    let x = this.nil.next;

    while (x.val !== val) {
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
    const node = { val, next: this.nil.next };

    if (this.tail === this.nil) {
      this.tail = node;
    }

    this.nil.next = node;
  }

  /** O(1) */
  pushTail(val: T) {
    const node = { val, next: this.nil };

    if (this.empty()) {
      this.nil.next = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
  }

  /** O(1) */
  popHead() {
    if (this.empty()) {
      throw new Error("underflow.");
    }

    const x = this.nil.next;
    this.nil.next = x.next;

    if (this.empty()) {
      this.tail = this.nil;
    }

    return x.val;
  }

  /** Θ(n) */
  popTail() {
    if (this.empty()) {
      throw new Error("underflow.");
    }

    const { val } = this.tail;

    const tail = this.prev(this.tail);
    tail.next = this.nil;
    this.tail = tail;

    return val;
  }

  /** Θ(n) */
  insertBefore(x: Node<T>, val: T) {
    const node = { val, next: x };
    const prev = this.prev(x);
    prev.next = node;
  }

  /** O(1) */
  insertAfter(x: Node<T>, val: T) {
    const node = { val, next: x.next };
    x.next = node;
  }

  /** Θ(n) */
  delete(x: Node<T>) {
    const prev = this.prev(x);
    prev.next = x.next;
  }

  /** Θ(n) */
  deleteBefore(x: Node<T>) {
    const prevprev = this.prevprev(x);

    if (prevprev === x) {
      throw new Error("no nodes to delete.");
    }

    prevprev.next = x;
  }

  /** O(1) */
  deleteAfter(x: Node<T>) {
    if (x.next === this.nil) {
      throw new Error("no nodes to delete.");
    }

    x.next = x.next.next;
  }

  /** O(1) */
  merge(other: SinglyLinkedList<T>) {
    if (other.empty()) {
      return;
    }

    this.tail.next = other.nil.next;
    this.tail = other.tail;
    this.tail.next = this.nil;
    other.nil.next = other.nil;
    other.tail = other.nil;
  }

  /** Θ(n) */
  reverse() {
    let x = this.nil;
    let y = this.nil.next;

    this.tail = y;

    while (y !== this.nil) {
      const next = y.next;
      y.next = x;
      x = y;
      y = next;
    }

    this.nil.next = x;
    this.tail.next = this.nil;
  }

  /** Θ(n) */
  private prev(x: Node<T>) {
    let prev = this.nil;

    while (prev.next !== x) {
      prev = prev.next;

      if (prev === this.nil) {
        throw new Error("not found.");
      }
    }

    return prev;
  }

  /** Θ(n) */
  private prevprev(x: Node<T>) {
    let prevprev = this.nil;

    while (prevprev.next.next !== x) {
      prevprev = prevprev.next;

      if (prevprev === this.nil) {
        throw new Error("not found.");
      }
    }

    return prevprev;
  }
}
