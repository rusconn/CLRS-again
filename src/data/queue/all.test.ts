import { BinaryHeapQueue } from "./binheap";
import { ArrayDequeQueue } from "./adeque";
import { ArrayQueue } from "./array";
import { ArrayStackQueue } from "./astack";
import { BuiltInArrayQueue } from "./biarray";
import { DoublyLinkedListQueue } from "./dlist";
import { SinglyLinkedListQueue } from "./slist";

describe("enqueue and dequeue", () => {
  const queues = [
    { queue: new BinaryHeapQueue<number>() },
    { queue: new ArrayDequeQueue<number>(2) },
    { queue: new ArrayQueue<number>(2) },
    { queue: new ArrayStackQueue<number>(2) },
    { queue: new BuiltInArrayQueue<number>() },
    { queue: new DoublyLinkedListQueue<number>() },
    { queue: new SinglyLinkedListQueue<number>() },
  ];

  test.each(queues)("queue No.%#", ({ queue }) => {
    queue.enqueue(1);

    expect(queue.dequeue()).toBe(1);

    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);

    queue.enqueue(4);
    queue.enqueue(5);

    expect(queue.dequeue()).toBe(4);
    expect(queue.dequeue()).toBe(5);

    expect(queue.empty()).toBe(true);
  });
});