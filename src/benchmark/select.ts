import { range } from "@/data/array";
import { bench, randInts } from "@/util";

import { randomizedSelect, select } from "@/ch09/code";

for (const size of range(22 + 1).map(x => 2 ** x)) {
  const A = randInts(size, 0, size);
  const i = Math.floor(size / 2);

  const B = [...A];
  const C = [...A];

  const sort = () => select(B, i);
  const partition = () => randomizedSelect(C, i);

  const times = {
    sort: bench(sort),
    partition: bench(partition),
  };

  console.log({ size, times });
}
