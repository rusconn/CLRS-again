import { range } from "@/data/array";
import { ArrayDeque } from "@/data/deque/array";
import { DoublyLinkedListDeque } from "@/data/deque/dlist";
import { SinglyLinkedListDeque } from "@/data/deque/slist";
import { bench } from "@/util";

for (const size of range(17 + 1).map(x => 2 ** x)) {
  const array = () => {
    const Q = new ArrayDeque<number>(size);
    for (let i = 0; i < size; i++) Q.pushHead(i);
    for (let i = 0; i < size; i++) Q.popHead();
    for (let i = 0; i < size; i++) Q.pushTail(i);
    for (let i = 0; i < size; i++) Q.popTail();
  };

  const dlist = () => {
    const Q = new DoublyLinkedListDeque<number>();
    for (let i = 0; i < size; i++) Q.pushHead(i);
    for (let i = 0; i < size; i++) Q.popHead();
    for (let i = 0; i < size; i++) Q.pushTail(i);
    for (let i = 0; i < size; i++) Q.popTail();
  };

  const slist = () => {
    const Q = new SinglyLinkedListDeque<number>();
    for (let i = 0; i < size; i++) Q.pushHead(i);
    for (let i = 0; i < size; i++) Q.popHead();
    for (let i = 0; i < size; i++) Q.pushTail(i);
    for (let i = 0; i < size; i++) Q.popTail();
  };

  const times = {
    array: bench(array),
    dlist: bench(dlist),
    slist: bench(slist),
  };

  console.log({ size, times });
}
