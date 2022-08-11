import { BuiltInArrayDict } from "./biarray";
import { BuiltInMapDict } from "./bimap";
import { BuiltInObjectDict } from "./biobject";
import { DirectAddressTableDict } from "./datable";

type User = {
  id: number;
  name: string;
};

const user1 = { id: 0, name: "foo" } as const;
const user2 = { id: 7, name: "bar" } as const;
const user3 = { id: 9, name: "baz" } as const;

describe("search, insert and delete", () => {
  const dicts = [
    { dict: new BuiltInArrayDict<User["id"], User>() },
    { dict: new BuiltInMapDict<User["id"], User>() },
    { dict: new BuiltInObjectDict<User["id"], User>() },
    { dict: new DirectAddressTableDict<User>(10) },
  ];

  test.each(dicts)("dict No.%#", ({ dict }) => {
    dict.insert(user1.id, user1);
    dict.insert(user2.id, user2);
    dict.insert(user3.id, user3);

    const searched1 = dict.search(user1.id);
    const searched2 = dict.search(user2.id);
    const searched3 = dict.search(user3.id);

    if (searched1 == null || searched2 == null || searched3 == null) {
      throw new Error("not found.");
    }

    expect(searched1.name).toBe(user1.name);
    expect(searched2.name).toBe(user2.name);
    expect(searched3.name).toBe(user3.name);

    // deletion should not affect other items
    dict.delete(searched1.id);
    expect(dict.search(user1.id)).toBeUndefined();
    expect(dict.search(user3.id)).not.toBeUndefined();

    // insert existing key should overwrite the value
    dict.insert(user2.id, user1);
    const searched4 = dict.search(user2.id);
    expect(searched4?.name).toBe(user1.name);
  });
});
