import { range } from "@/data/array";
import { bench, randInt, randInts } from "@/util";

import { countIntervalRanked, countIntervalNaive, countIntervalByRanking, rank } from "@/ch08/code";

for (const size of range(24 + 1).map(x => 2 ** x)) {
  const A = randInts(size, 0, 10_000);
  const k = 10_000;
  const a = randInt(0, 5_000);
  const b = randInt(5_000, 10_000);

  const C = rank(A, k);

  const naive = () => countIntervalNaive(A, a, b);
  const withPreprocess = () => countIntervalByRanking(A, k, a, b);
  const preprocessed = () => countIntervalRanked(C, k, a, b);

  const times = {
    naive: bench(naive),
    withPreprocess: bench(withPreprocess),
    preprocessed: bench(preprocessed),
  };

  console.log({ size, times });
}
