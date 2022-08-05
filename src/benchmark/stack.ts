import { range } from "@/data/array";
import { BinaryHeapStack } from "@/data/stack/binheap";
import { ArrayDequeStack } from "@/data/stack/adeque";
import { ArrayStack } from "@/data/stack/array";
import { BuiltInArrayStack } from "@/data/stack/biarray";
import { bench } from "@/util";

for (const size of range(23 + 1).map(x => 2 ** x)) {
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

  const times = {
    binheap: bench(binheap),
    adeque: bench(adeque),
    array: bench(array),
    biarray: bench(biarray),
  };

  console.log({ size, times });
}
