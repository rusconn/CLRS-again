export class BuiltInMapDict<K, V> {
  private map = new Map<K, V>();

  /** O(1) */
  search(key: K) {
    return this.map.get(key);
  }

  /** O(1) */
  insert(key: K, value: V) {
    this.map.set(key, value);
  }

  /** O(1) */
  delete(key: K) {
    this.map.delete(key);
  }
}
