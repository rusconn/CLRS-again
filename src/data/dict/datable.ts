export class DirectAddressTableDict<V> {
  private table;

  /**
   * space: Θ(tableSize)
   *
   * @param tableSize MAX(key of value) + 1
   */
  constructor(tableSize: number) {
    this.table = Array<V | undefined>(tableSize);
  }

  /** O(1) */
  search(key: number) {
    return this.table[key];
  }

  /** O(1) */
  insert(key: number, value: V) {
    this.table[key] = value;
  }

  /** O(1) */
  delete(key: number) {
    this.table[key] = undefined;
  }
}
