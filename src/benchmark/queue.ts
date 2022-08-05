import { range } from "@/data/array";
import { BinaryHeapQueue } from "@/data/queue/binheap";
import { ArrayDequeQueue } from "@/data/queue/adeque";
import { ArrayQueue } from "@/data/queue/array";
import { BuiltInArrayQueue } from "@/data/queue/biarray";
import { bench } from "@/util";

for (const size of range(18 + 1).map(x => 2 ** x)) {
  const binheap = () => {
    const Q = new BinaryHeapQueue<number>();
    for (let i = 0; i < size; i++) Q.enqueue(i);
    for (let i = 0; i < size; i++) Q.dequeue();
  };

  const adeque = () => {
    const Q = new ArrayDequeQueue<number>(size);
    for (let i = 0; i < size; i++) Q.enqueue(i);
    for (let i = 0; i < size; i++) Q.dequeue();
  };

  const array = () => {
    const Q = new ArrayQueue<number>(size);
    for (let i = 0; i < size; i++) Q.enqueue(i);
    for (let i = 0; i < size; i++) Q.dequeue();
  };

  const biarray = () => {
    const Q = new BuiltInArrayQueue<number>();
    for (let i = 0; i < size; i++) Q.enqueue(i);
    for (let i = 0; i < size; i++) Q.dequeue();
  };

  const times = {
    binheap: bench(binheap),
    adeque: bench(adeque),
    array: bench(array),
    biarray: bench(biarray),
  };

  console.log({ size, times });
}
