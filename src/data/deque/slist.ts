import { SinglyLinkedList } from "@/data/list/singly";

export class SinglyLinkedListDeque<T> {
  private list = new SinglyLinkedList<T>();

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

  /** Θ(n) */
  popTail() {
    return this.list.popTail();
  }
}
