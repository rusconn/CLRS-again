import { randInt } from "/util/mod.ts";

type RowImu<T> = readonly T[];
type RowMut<T> = T[];

export type Imu<T> = readonly RowImu<T>[];
export type Mut<T> = RowMut<T>[];

export const create = <T>(m: number, n: number, v: T): Mut<T> =>
  Array<RowMut<T>>(m)
    .fill([])
    .map((_) => Array<T>(n).fill(v));

export const createRand = (m: number, n: number, min: number, max: number): Mut<number> =>
  create(m, n, 0).map((row) => row.map((_) => randInt(min, max)));

/** Θ(mn) */
const additive = (f: (a: number, b: number) => number) =>
(
  A: Imu<number>,
  B: Imu<number>,
  ai = 0,
  aj = 0,
  bi = 0,
  bj = 0,
  m = A.length,
  n = A[0].length,
): Mut<number> => {
  const C = create(m, n, 0);

  for (let i = 0; i <= m - 1; i++) {
    for (let j = 0; j <= n - 1; j++) {
      C[i][j] = f(A[ai + i][aj + j], B[bi + i][bj + j]);
    }
  }

  return C;
};

/** Θ(mn) */
export const add = additive((x, y) => x + y);

/** Θ(mn) */
export const sub = additive((x, y) => x - y);

export const merge = <T>(A: Mut<T>, B: Mut<T>, C: Mut<T>, D: Mut<T>): Mut<T> => {
  const upper = mergeHorizontally(A, B);
  const lower = mergeHorizontally(C, D);
  return mergeVertically(upper, lower);
};

export const mergeHorizontally = <T>(A: Mut<T>, B: Mut<T>): Mut<T> =>
  A.map((row, i) => row.concat(B[i]));

export const mergeVertically = <T>(A: Mut<T>, B: Mut<T>): Mut<T> => A.concat(B);
