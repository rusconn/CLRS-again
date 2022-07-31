import { BinaryHeapPriorityQueue } from "./binheap";
import { BuiltInArrayPriorityQueue } from "./biarray";

type Node = {
  key: number;
  val: number;
};

describe("initialize and pop", () => {
  const vals = [2, 1, 5, 3, 4];
  const data1 = vals.map(val => ({ key: val, val }));
  const data2 = vals.map(val => ({ key: val, val }));

  const pqueues = [
    { pqueue: new BinaryHeapPriorityQueue<Node>((x, y) => x.key > y.key, data1) },
    { pqueue: new BuiltInArrayPriorityQueue<Node>((x, y) => x.key > y.key, data2) },
  ];

  test.each(pqueues)("pqueue No.%#", ({ pqueue }) => {
    expect(pqueue.pop()?.val).toBe(5);
    expect(pqueue.pop()?.val).toBe(4);
    expect(pqueue.pop()?.val).toBe(3);
    expect(pqueue.pop()?.val).toBe(2);
    expect(pqueue.pop()?.val).toBe(1);
  });
});

describe("push and pop", () => {
  const pqueues = [
    { pqueue: new BinaryHeapPriorityQueue<Node>((x, y) => x.key > y.key) },
    { pqueue: new BuiltInArrayPriorityQueue<Node>((x, y) => x.key > y.key) },
  ];

  test.each(pqueues)("pqueue No.%#", ({ pqueue }) => {
    pqueue.push({ key: 2, val: 2 });
    pqueue.push({ key: 1, val: 1 });
    pqueue.push({ key: 5, val: 5 });
    pqueue.push({ key: 3, val: 3 });
    pqueue.push({ key: 4, val: 4 });

    expect(pqueue.pop()?.val).toBe(5);
    expect(pqueue.pop()?.val).toBe(4);
    expect(pqueue.pop()?.val).toBe(3);
    expect(pqueue.pop()?.val).toBe(2);
    expect(pqueue.pop()?.val).toBe(1);
  });
});
