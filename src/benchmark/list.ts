import { range } from "@/data/array";
import { DoublyLinkedList } from "@/data/list/doubly";
import { SinglyLinkedList } from "@/data//list/singly";
import { bench } from "@/util";

for (const size of range(23 + 1).map(x => 2 ** x)) {
  const A = range(size);
  const DL = DoublyLinkedList.fromArray<number>([...A]);
  const SL = SinglyLinkedList.fromArray<number>([...A]);

  const center = Math.floor(A.length / 2);
  const centerNodeDl = DL.search(center);
  const centerNodeSl = SL.search(center);

  if (centerNodeDl == null) {
    throw new Error();
  }

  if (centerNodeSl == null) {
    throw new Error();
  }

  const array = () => {
    for (let i = 0; i < 100; i++) A.splice(center, 0, i);
    for (let i = 0; i < 100; i++) A.splice(center, 1);
    for (let i = 0; i < 100; i++) A.splice(center + 1, 0, i);
    for (let i = 0; i < 100; i++) A.splice(center + 1, 1);
  };

  const dlist = () => {
    for (let i = 0; i < 100; i++) DL.insertBefore(centerNodeDl, i);
    for (let i = 0; i < 100; i++) DL.deleteBefore(centerNodeDl);
    for (let i = 0; i < 100; i++) DL.insertAfter(centerNodeDl, i);
    for (let i = 0; i < 100; i++) DL.deleteAfter(centerNodeDl);
  };

  const slist = () => {
    for (let i = 0; i < 100; i++) SL.insertBefore(centerNodeSl, i);
    for (let i = 0; i < 100; i++) SL.deleteBefore(centerNodeSl);
    for (let i = 0; i < 100; i++) SL.insertAfter(centerNodeSl, i);
    for (let i = 0; i < 100; i++) SL.deleteAfter(centerNodeSl);
  };

  const times = {
    array: bench(array),
    dlist: bench(dlist),
    slist: bench(slist),
  };

  console.log({ size, times });
}
