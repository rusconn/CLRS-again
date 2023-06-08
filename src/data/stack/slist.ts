import { SinglyLinkedList } from "/data/list/singly.ts";

export class SinglyLinkedListStack<T> {
  private data;

  constructor() {
    this.data = new SinglyLinkedList<T>();
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
