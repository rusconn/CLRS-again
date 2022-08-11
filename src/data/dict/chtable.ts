import type { Entry } from "@/data/dict/type";
import { DoublyLinkedList } from "@/data/list/doubly";

/**
 * Fixed size chaining hash table dictionary.
 */
export class ChainingHashTableDict<K, V> {
  private table = Array<DoublyLinkedList<Entry<K, V>> | undefined>();

  /**
   * @param hasher must run in O(1)
   */
  constructor(private hasher: (k: K) => number) {}

  /** O(1) (if the hasher hashes simple uniformly) */
  search(key: K) {
    const hash = this.hasher(key);
    const list = this.table[hash];
    return list?.searchBy(key, x => x.key)?.val.value;
  }

  /** O(1) (if the hasher hashes simple uniformly) */
  insert(key: K, value: V) {
    const hash = this.hasher(key);
    const list = this.table[hash];

    if (list == null) {
      const newList = new DoublyLinkedList<Entry<K, V>>();
      newList.pushHead({ key, value });
      this.table[hash] = newList;
    } else {
      const sameKeyNode = list.searchBy(key, x => x.key);

      // upsert
      if (sameKeyNode != null) {
        sameKeyNode.val.value = value;
      } else {
        list.pushHead({ key, value });
      }
    }
  }

  /** O(1) (if the hasher hashes simple uniformly) */
  delete(key: K) {
    const hash = this.hasher(key);
    const list = this.table[hash];
    list?.deleteBy(key, x => x.key);
  }
}
