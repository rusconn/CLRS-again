import { SinglyLinkedList } from "/data/list/singly.ts";

export class SinglyLinkedListQueue<T> {
  private data;

  constructor() {
    this.data = new SinglyLinkedList<T>();
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
