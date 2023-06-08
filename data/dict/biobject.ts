export class BuiltInObjectDict<K extends number | string | symbol, V> {
  private object: { [key: number | string | symbol]: V | undefined } = {};

  /** O(1) */
  search(key: K) {
    return this.object[key];
  }

  /** O(1) */
  insert(key: K, value: V) {
    this.object[key] = value;
  }

  /** O(1) */
  delete(key: K) {
    // in V8, assigning undefined is faster than delete property
    this.object[key] = undefined;
  }
}
