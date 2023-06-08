import { range } from "/data/array.ts";
import { BinaryHeapPriorityQueue } from "/data/pqueue/binheap.ts";
import { BuiltInArrayPriorityQueue } from "/data/pqueue/biarray.ts";
import { bench, randInts } from "/util/mod.ts";

type Node = {
  key: number;
  val: number;
};

for (const size of range(16 + 1).map((x) => 2 ** x)) {
  const nodes = randInts(size, 0, 100).map((int) => ({ key: int, val: int }));

  const binheap = () => {
    const pqueue = new BinaryHeapPriorityQueue<Node>((x, y) => x.key > y.key);
    for (let i = 0; i < size; i++) pqueue.push(nodes[i]);
    for (let i = 0; i < size; i++) pqueue.pop();
  };

  const biarray = () => {
    const pqueue = new BuiltInArrayPriorityQueue<Node>((x, y) => x.key > y.key);
    for (let i = 0; i < size; i++) pqueue.push(nodes[i]);
    for (let i = 0; i < size; i++) pqueue.pop();
  };

  const times = {
    binheap: bench(binheap),
    biarray: bench(biarray),
  };

  console.log({ size, times });
}
