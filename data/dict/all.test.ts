import { assertEquals, assertNotEquals } from "std/testing/asserts";
import { describe, it } from "std/testing/bdd";

import { BuiltInArrayDict } from "./biarray.ts";
import { BuiltInMapDict } from "./bimap.ts";
import { BuiltInObjectDict } from "./biobject.ts";
import { ChainingHashTableDict } from "./chtable.ts";
import { DirectAddressTableDict } from "./datable.ts";
import { OpenAddressingHashTableDict } from "./oahtable.ts";

type User = {
  id: number;
  name: string;
};

const user1 = { id: 0, name: "foo" } as const;
const user2 = { id: 7, name: "bar" } as const;
const user3 = { id: 9, name: "baz" } as const;

describe("search, insert and delete", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const dicts = [
    { dict: new BuiltInArrayDict<User["id"], User>() },
    { dict: new BuiltInMapDict<User["id"], User>() },
    { dict: new BuiltInObjectDict<User["id"], User>() },
    { dict: new ChainingHashTableDict<User["id"], User>((id) => id % 3) },
    { dict: new DirectAddressTableDict<User>(10) },
    {
      dict: new OpenAddressingHashTableDict<User["id"], User>((key, i) => {
        const m = 2 ** 4;
        const h1 = (k: number) => k % m;
        const h2 = (k: number) => 1 + (k % (m - 1));
        return (h1(key) + i * h2(key)) % m;
      }, 2 ** 4),
    },
  ];

  dicts.forEach(({ dict }, i) =>
    it(`${i}`, () => {
      dict.insert(user1.id, user1);
      dict.insert(user2.id, user2);
      dict.insert(user3.id, user3);

      const searched1 = dict.search(user1.id);
      const searched2 = dict.search(user2.id);
      const searched3 = dict.search(user3.id);

      if (searched1 == null || searched2 == null || searched3 == null) {
        throw new Error("not found.");
      }

      assertEquals(searched1.name, user1.name);
      assertEquals(searched2.name, user2.name);
      assertEquals(searched3.name, user3.name);

      // deletion should not affect other items
      dict.delete(searched1.id);
      assertEquals(dict.search(user1.id), undefined);
      assertNotEquals(dict.search(user3.id), undefined);

      // insert existing key should overwrite the value
      dict.insert(user2.id, user1);
      const searched4 = dict.search(user2.id);
      assertEquals(searched4?.name, user1.name);
    })
  );
});
