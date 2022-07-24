import { range } from "@/data/array";
import { bench, randInts } from "@/util";

import {
  maxDiffBruteForce,
  maxDiffKadane,
  maxDiffSubarrayBruteForce,
  maxDiffSubarrayDaC,
} from "@/ch04/code";

for (const size of range(16 + 1).map(x => 2 ** x)) {
  const A = randInts(size, 80, 120);

  const brute = () => maxDiffBruteForce(A);
  const subBrute = () => maxDiffSubarrayBruteForce(A);
  const subDac = () => maxDiffSubarrayDaC(A);
  const kadane = () => maxDiffKadane(A);

  const times = {
    brute: bench(brute),
    subBrute: bench(subBrute),
    subDac: bench(subDac),
    kadane: bench(kadane),
  };

  console.log({ size, times });
}