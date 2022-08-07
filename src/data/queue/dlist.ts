import { DoublyLinkedList } from "@/data/list/doubly";

export class DoublyLinkedListQueue<T> {
  private data;

  constructor() {
    this.data = new DoublyLinkedList<T>();
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
