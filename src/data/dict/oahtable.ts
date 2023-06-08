import type { Entry } from "/data/dict/type.ts";

/**
 * Fixed size open addressing hash table dictionary.
 */
export class OpenAddressingHashTableDict<K, V> {
  /** undefined means unused, null means used and deleted */
  private table;

  /**
   * @param hasher must run in O(1)
   * @param size size of hash table
   */
  constructor(private hasher: (k: K, i: number) => number, private size: number) {
    this.table = Array<Entry<K, V> | undefined | null>(size);
  }

  /** O(1) (if the hasher hashes uniformly) */
  search(key: K) {
    for (let i = 0; i < this.size; i++) {
      const j = this.hasher(key, i);
      const entry = this.table[j];

      if (entry === undefined) {
        return undefined;
      }

      if (entry?.key === key) {
        return entry?.value;
      }
    }

    return undefined;
  }

  /** O(1) (if the hasher hashes uniformly) */
  insert(key: K, value: V) {
    for (let i = 0; i < this.size; i++) {
      const j = this.hasher(key, i);
      const entry = this.table[j];

      // unused or deleted
      if (entry == null) {
        this.table[j] = { key, value };
        return;
      }

      // exist
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }

    throw new Error("hash table overflow.");
  }

  /** O(1) (if the hasher hashes uniformly) */
  delete(key: K) {
    for (let i = 0; i < this.size; i++) {
      const j = this.hasher(key, i);
      const entry = this.table[j];

      if (entry === undefined) {
        return;
      }

      if (entry?.key === key) {
        this.table[j] = null;
        return;
      }
    }
  }
}
