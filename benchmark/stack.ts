import { range } from "/data/array.ts";
import { BinaryHeapStack } from "/data/stack/binheap.ts";
import { ArrayDequeStack } from "/data/stack/adeque.ts";
import { ArrayStack } from "/data/stack/array.ts";
import { BuiltInArrayStack } from "/data/stack/biarray.ts";
import { DoublyLinkedListStack } from "/data/stack/dlist.ts";
import { SinglyLinkedListStack } from "/data/stack/slist.ts";
import { bench } from "/util/mod.ts";

for (const size of range(23 + 1).map((x) => 2 ** x)) {
  const binheap = () => {
    const S = new BinaryHeapStack<number>();
    for (let i = 0; i < size; i++) S.push(i);
    for (let i = 0; i < size; i++) S.pop();
  };

  const adeque = () => {
    const S = new ArrayDequeStack<number>(size);
    for (let i = 0; i < size; i++) S.push(i);
    for (let i = 0; i < size; i++) S.pop();
  };

  const array = () => {
    const S = new ArrayStack<number>(size);
    for (let i = 0; i < size; i++) S.push(i);
    for (let i = 0; i < size; i++) S.pop();
  };

  const biarray = () => {
    const S = new BuiltInArrayStack<number>();
    for (let i = 0; i < size; i++) S.push(i);
    for (let i = 0; i < size; i++) S.pop();
  };

  const dlist = () => {
    const S = new DoublyLinkedListStack<number>();
    for (let i = 0; i < size; i++) S.push(i);
    for (let i = 0; i < size; i++) S.pop();
  };

  const slist = () => {
    const S = new SinglyLinkedListStack<number>();
    for (let i = 0; i < size; i++) S.push(i);
    for (let i = 0; i < size; i++) S.pop();
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
