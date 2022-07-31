import { range } from "@/data/array";
import { BinaryHeapQueue } from "@/data/queue/binheap";
import { BuiltInArrayQueue } from "@/data/queue/biarray";
import { bench } from "@/util";

for (const size of range(18 + 1).map(x => 2 ** x)) {
  const binheap = () => {
    const Q = new BinaryHeapQueue<number>();
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
    biarray: bench(biarray),
  };

  console.log({ size, times });
}
