import { range } from "/data/array.ts";
import { BinaryHeapQueue } from "/data/queue/binheap.ts";
import { ArrayDequeQueue } from "/data/queue/adeque.ts";
import { ArrayQueue } from "/data/queue/array.ts";
import { BuiltInArrayQueue } from "/data/queue/biarray.ts";
import { DoublyLinkedListQueue } from "/data/queue/dlist.ts";
import { SinglyLinkedListQueue } from "/data/queue/slist.ts";
import { bench } from "/util/mod.ts";

for (const size of range(10, 18 + 1).map((x) => 2 ** x)) {
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

  const dlist = () => {
    const Q = new DoublyLinkedListQueue<number>();
    for (let i = 0; i < size; i++) Q.enqueue(i);
    for (let i = 0; i < size; i++) Q.dequeue();
  };

  const slist = () => {
    const Q = new SinglyLinkedListQueue<number>();
    for (let i = 0; i < size; i++) Q.enqueue(i);
    for (let i = 0; i < size; i++) Q.dequeue();
  };

  const times = {
    binheap: bench(binheap),
    adeque: bench(adeque),
    array: bench(array),
    biarray: bench(biarray),
    dlist: bench(dlist),
    slist: bench(slist),
  };

  console.log({ size, times });
}
