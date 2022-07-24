import { range } from "@/data/array";
import * as SMat from "@/data/matrix/square";
import { bench } from "@/util";

import { sMatMulDaC, sMatMulIjk, sMatMulIkj, strassen } from "@/ch04/code";

for (const size of range(10 + 1).map(x => 2 ** x)) {
  const A = SMat.createRand(size, -100, 100);
  const B = SMat.createRand(size, -100, 100);

  const ijk = () => sMatMulIjk(A, B);
  const ikj = () => sMatMulIkj(A, B);
  const dac = () => sMatMulDaC(A, B);
  const str = () => strassen(A, B);

  const times = {
    ijk: bench(ijk),
    ikj: bench(ikj),
    dac: bench(dac),
    str: bench(str),
  };

  console.log({ size, times });
}
