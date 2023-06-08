import { DoublyLinkedList } from "/data/list/doubly.ts";

export class DoublyLinkedListStack<T> {
  private data;

  constructor() {
    this.data = new DoublyLinkedList<T>();
  }

  /** O(1) */
  empty() {
    return this.data.empty();
  }

  /** O(1) */
  push(x: T) {
    this.data.pushHead(x);
  }

  /** O(1) */
  pop() {
    return this.data.popHead();
  }
}
