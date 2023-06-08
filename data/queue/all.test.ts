import { assert, assertEquals, describe, it } from "/deps.ts";

import { BinaryHeapQueue } from "./binheap.ts";
import { ArrayDequeQueue } from "./adeque.ts";
import { ArrayQueue } from "./array.ts";
import { ArrayStackQueue } from "./astack.ts";
import { BuiltInArrayQueue } from "./biarray.ts";
import { DoublyLinkedListQueue } from "./dlist.ts";
import { SinglyLinkedListQueue } from "./slist.ts";

describe("enqueue and dequeue", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const queues = [
    { queue: new BinaryHeapQueue<number>() },
    { queue: new ArrayDequeQueue<number>(2) },
    { queue: new ArrayQueue<number>(2) },
    { queue: new ArrayStackQueue<number>(2) },
    { queue: new BuiltInArrayQueue<number>() },
    { queue: new DoublyLinkedListQueue<number>() },
    { queue: new SinglyLinkedListQueue<number>() },
  ];

  queues.forEach(({ queue }, i) =>
    it(`${i}`, () => {
      queue.enqueue(1);

      assertEquals(queue.dequeue(), 1);

      queue.enqueue(2);
      queue.enqueue(3);

      assertEquals(queue.dequeue(), 2);
      assertEquals(queue.dequeue(), 3);

      queue.enqueue(4);
      queue.enqueue(5);

      assertEquals(queue.dequeue(), 4);
      assertEquals(queue.dequeue(), 5);

      assert(queue.empty());
    })
  );
});
