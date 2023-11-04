import { assert, assertEquals, assertFalse, assertThrows } from "std/testing/asserts";
import { describe, it } from "std/testing/bdd";

import { ArrayDeque } from "./array.ts";
import { DoublyLinkedListDeque } from "./dlist.ts";
import { SinglyLinkedListDeque } from "./slist.ts";

describe("operations", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const deques = [
    { deque: new ArrayDeque<number>(3) },
    { deque: new DoublyLinkedListDeque<number>() },
    { deque: new SinglyLinkedListDeque<number>() },
  ];

  deques.forEach(({ deque }, i) =>
    it(`${i}`, () => {
      assert(deque.empty());

      assertThrows(() => deque.popHead(), Error, "underflow.");
      assertThrows(() => deque.popTail(), Error, "underflow.");

      deque.pushTail(1);
      deque.pushTail(2);
      deque.pushTail(3);

      assertFalse(deque.empty());

      assertEquals(deque.popHead(), 1);
      assertEquals(deque.popTail(), 3);
      assertEquals(deque.popTail(), 2);

      assert(deque.empty());

      assertThrows(() => deque.popHead(), Error, "underflow.");
      assertThrows(() => deque.popTail(), Error, "underflow.");

      deque.pushHead(1);
      deque.pushHead(2);
      deque.pushHead(3);

      assertFalse(deque.empty());

      assertEquals(deque.popTail(), 1);
      assertEquals(deque.popHead(), 3);
      assertEquals(deque.popHead(), 2);

      assert(deque.empty());

      assertThrows(() => deque.popHead(), Error, "underflow.");
      assertThrows(() => deque.popTail(), Error, "underflow.");
    })
  );
});
