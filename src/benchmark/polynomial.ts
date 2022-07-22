import { range } from "@/data/array";
import { bench, randInt, randInts } from "@/util";

import { horner, polynomial } from "@/ch02/code";

for (const size of range(16 + 1).map(x => 2 ** x)) {
  const as = randInts(size, 0, 100);
  const x = randInt(0, 10);

  const poly = () => polynomial(as, x);
  const horn = () => horner(as, x);

  const times = {
    poly: bench(poly),
    horn: bench(horn),
  };

  console.log({ size, times });
}
