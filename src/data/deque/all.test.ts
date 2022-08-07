import { ArrayDeque } from "./array";
import { DoublyLinkedListDeque } from "./dlist";
import { SinglyLinkedListDeque } from "./slist";

describe("operations", () => {
  const deques = [
    { deque: new ArrayDeque<number>(3) },
    { deque: new DoublyLinkedListDeque<number>() },
    { deque: new SinglyLinkedListDeque<number>() },
  ];

  test.each(deques)("deque No.%#", ({ deque }) => {
    expect(deque.empty()).toBe(true);

    expect(() => {
      deque.popHead();
    }).toThrowError("underflow.");

    expect(() => {
      deque.popTail();
    }).toThrowError("underflow.");

    deque.pushTail(1);
    deque.pushTail(2);
    deque.pushTail(3);

    expect(deque.empty()).toBe(false);

    expect(deque.popHead()).toBe(1);
    expect(deque.popTail()).toBe(3);
    expect(deque.popTail()).toBe(2);

    expect(deque.empty()).toBe(true);

    expect(() => {
      deque.popHead();
    }).toThrowError("underflow.");

    expect(() => {
      deque.popTail();
    }).toThrowError("underflow.");

    deque.pushHead(1);
    deque.pushHead(2);
    deque.pushHead(3);

    expect(deque.empty()).toBe(false);

    expect(deque.popTail()).toBe(1);
    expect(deque.popHead()).toBe(3);
    expect(deque.popHead()).toBe(2);

    expect(deque.empty()).toBe(true);

    expect(() => {
      deque.popHead();
    }).toThrowError("underflow.");

    expect(() => {
      deque.popTail();
    }).toThrowError("underflow.");
  });
});
