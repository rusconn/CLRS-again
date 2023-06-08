import { assert, assertEquals, describe, it } from "/deps.ts";

import { BinaryHeapStack } from "./binheap.ts";
import { ArrayDequeStack } from "./adeque.ts";
import { ArrayQueueStack } from "./aqueue.ts";
import { ArrayStack } from "./array.ts";
import { BuiltInArrayStack } from "./biarray.ts";
import { DoublyLinkedListStack } from "./dlist.ts";
import { SinglyLinkedListStack } from "./slist.ts";

describe("push and pop", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const stacks = [
    { stack: new BinaryHeapStack<number>() },
    { stack: new ArrayDequeStack<number>(2) },
    { stack: new ArrayQueueStack<number>(2) },
    { stack: new ArrayStack<number>(2) },
    { stack: new BuiltInArrayStack<number>() },
    { stack: new DoublyLinkedListStack<number>() },
    { stack: new SinglyLinkedListStack<number>() },
  ];

  stacks.forEach(({ stack }, i) =>
    it(`${i}`, () => {
      stack.push(1);

      assertEquals(stack.pop(), 1);

      stack.push(2);
      stack.push(3);

      assertEquals(stack.pop(), 3);
      assertEquals(stack.pop(), 2);

      stack.push(4);
      stack.push(5);

      assertEquals(stack.pop(), 5);
      assertEquals(stack.pop(), 4);

      assert(stack.empty());
    })
  );
});
