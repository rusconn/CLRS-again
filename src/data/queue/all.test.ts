import { BinaryHeapQueue } from "./binheap";
import { BuiltInArrayQueue } from "./biarray";

describe("enqueue and dequeue", () => {
  const queues = [
    { queue: new BinaryHeapQueue<number>() },
    { queue: new BuiltInArrayQueue<number>() },
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
