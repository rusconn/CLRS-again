/** O(1) */
export const swap = <T>(A: T[], i: number, j: number) => {
  const tmp = A[i];
  A[i] = A[j];
  A[j] = tmp;
};

/** [start,start+1,...,end-1] */
export function range(start: number, end: number): number[];

/** [0,1,...,end-1] */
export function range(end: number): number[];

// deno-fmt-ignore
export function range(...args: [number, number] | [number]) {
  return args.length === 1
    ? [...Array(args[0]).keys()]
    : [...Array(args[1]).keys()].slice(args[0]);
}
