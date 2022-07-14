/** O(1) */
export const swap = <T>(A: T[], i: number, j: number) => {
  const tmp = A[i];
  A[i] = A[j];
  A[j] = tmp;
};
