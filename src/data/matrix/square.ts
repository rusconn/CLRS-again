import * as Mat from "./matrix.ts";

export type Mut<T> = Mat.Mut<T>;
export type Imu<T> = Mat.Imu<T>;

export const create = <T>(n: number, v: T): Mut<T> => Mat.create(n, n, v);

export const createRand = (n: number, min: number, max: number): Mut<number> =>
  Mat.createRand(n, n, min, max);

/** Θ(n^2) */
export const add = (
  A: Imu<number>,
  B: Imu<number>,
  ai = 0,
  aj = 0,
  bi = 0,
  bj = 0,
  n = A.length,
): Mut<number> => Mat.add(A, B, ai, aj, bi, bj, n, n);

/** Θ(n^2) */
export const sub = (
  A: Imu<number>,
  B: Imu<number>,
  ai = 0,
  aj = 0,
  bi = 0,
  bj = 0,
  n = A.length,
): Mut<number> => Mat.sub(A, B, ai, aj, bi, bj, n, n);

export const merge = <T, U extends Mut<T>>(A: U, B: U, C: U, D: U): Mut<T> => Mat.merge(A, B, C, D);
