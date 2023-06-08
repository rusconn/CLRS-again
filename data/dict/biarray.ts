import type { Entry } from "/data/dict/type.ts";

export class BuiltInArrayDict<K, V> {
  private array = Array<Entry<K, V>>();

  /** Θ(n) */
  search(key: K) {
    return this.searchEntry(key)?.value;
  }

  /** Θ(n) */
  insert(key: K, value: V) {
    const sameKeyNode = this.searchEntry(key);

    if (sameKeyNode == null) {
      this.array.push({ key, value });
    } else {
      sameKeyNode.value = value;
    }
  }

  /** Θ(n) */
  delete(key: K) {
    const index = this.array.findIndex((x) => x.key === key);

    if (index !== -1) {
      this.array.splice(index, 1);
    }
  }

  /** Θ(n) */
  private searchEntry(key: K) {
    return this.array.find((x) => x.key === key);
  }
}
