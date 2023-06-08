import { DoublyLinkedList } from "/data/list/doubly.ts";

export class DoublyLinkedListDeque<T> {
  private list = new DoublyLinkedList<T>();

  /** O(1) */
  empty() {
    return this.list.empty();
  }

  /** O(1) */
  pushHead(x: T) {
    this.list.pushHead(x);
  }

  /** O(1) */
  pushTail(x: T) {
    this.list.pushTail(x);
  }

  /** O(1) */
  popHead() {
    return this.list.popHead();
  }

  /** O(1) */
  popTail() {
    return this.list.popTail();
  }
}
