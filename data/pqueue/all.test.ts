import { assertEquals } from "std/testing/asserts";
import { describe, it } from "std/testing/bdd";

import { BinaryHeapPriorityQueue } from "./binheap.ts";
import { BuiltInArrayPriorityQueue } from "./biarray.ts";

type Node = {
  key: number;
  val: number;
};

describe("initialize and pop", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const vals = [2, 1, 5, 3, 4];
  const data1 = vals.map((val) => ({ key: val, val }));
  const data2 = vals.map((val) => ({ key: val, val }));

  const pqueues = [
    { pqueue: new BinaryHeapPriorityQueue<Node>((x, y) => x.key > y.key, data1) },
    { pqueue: new BuiltInArrayPriorityQueue<Node>((x, y) => x.key > y.key, data2) },
  ];

  pqueues.forEach(({ pqueue }, i) =>
    it(`${i}`, () => {
      assertEquals(pqueue.pop()?.val, 5);
      assertEquals(pqueue.pop()?.val, 4);
      assertEquals(pqueue.pop()?.val, 3);
      assertEquals(pqueue.pop()?.val, 2);
      assertEquals(pqueue.pop()?.val, 1);
    })
  );
});

describe("push and pop", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const pqueues = [
    { pqueue: new BinaryHeapPriorityQueue<Node>((x, y) => x.key > y.key) },
    { pqueue: new BuiltInArrayPriorityQueue<Node>((x, y) => x.key > y.key) },
  ];

  pqueues.forEach(({ pqueue }, i) =>
    it(`${i}`, () => {
      pqueue.push({ key: 2, val: 2 });
      pqueue.push({ key: 1, val: 1 });
      pqueue.push({ key: 5, val: 5 });
      pqueue.push({ key: 3, val: 3 });
      pqueue.push({ key: 4, val: 4 });

      assertEquals(pqueue.pop()?.val, 5);
      assertEquals(pqueue.pop()?.val, 4);
      assertEquals(pqueue.pop()?.val, 3);
      assertEquals(pqueue.pop()?.val, 2);
      assertEquals(pqueue.pop()?.val, 1);
    })
  );
});
