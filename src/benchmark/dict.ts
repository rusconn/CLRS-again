import { range } from "@/data/array";
import { BuiltInArrayDict } from "@/data/dict/biarray";
import { BuiltInMapDict } from "@/data/dict/bimap";
import { BuiltInObjectDict } from "@/data/dict/biobject";
import { ChainingHashTableDict } from "@/data/dict/chtable";
import { DirectAddressTableDict } from "@/data/dict/datable";
import { OpenAddressingHashTableDict } from "@/data/dict/oahtable";
import { bench } from "@/util";

type User = {
  id: number;
  name: string;
};

for (const size of range(16 + 1).map(x => 2 ** x)) {
  const users = range(size).map(n => ({ id: n, name: `user${n}` }));

  const biarray = () => {
    const D = new BuiltInArrayDict<User["id"], User>();
    for (let i = 0; i < size; i++) D.insert(users[i].id, users[i]);
    for (let i = 0; i < size; i++) {
      const searched = D.search(users[i].id) as User;
      D.delete(searched.id);
    }
  };

  const bimap = () => {
    const D = new BuiltInMapDict<User["id"], User>();
    for (let i = 0; i < size; i++) D.insert(users[i].id, users[i]);
    for (let i = 0; i < size; i++) {
      const searched = D.search(users[i].id) as User;
      D.delete(searched.id);
    }
  };

  const biobject = () => {
    const D = new BuiltInObjectDict<User["id"], User>();
    for (let i = 0; i < size; i++) D.insert(users[i].id, users[i]);
    for (let i = 0; i < size; i++) {
      const searched = D.search(users[i].id) as User;
      D.delete(searched.id);
    }
  };

  const chtable = () => {
    const D = new ChainingHashTableDict<User["id"], User>(x => x % Math.floor(size / 3));
    for (let i = 0; i < size; i++) D.insert(users[i].id, users[i]);
    for (let i = 0; i < size; i++) {
      const searched = D.search(users[i].id) as User;
      D.delete(searched.id);
    }
  };

  const datable = () => {
    const D = new DirectAddressTableDict<User>(size);
    for (let i = 0; i < size; i++) D.insert(users[i].id, users[i]);
    for (let i = 0; i < size; i++) {
      const searched = D.search(users[i].id) as User;
      D.delete(searched.id);
    }
  };

  const oahtable = () => {
    const D = new OpenAddressingHashTableDict<User["id"], User>((key, i) => {
      const m = size;
      const h1 = (k: number) => k % m;
      const h2 = (k: number) => 1 + (k % (m - 1));
      return (h1(key) + i * h2(key)) % m;
    }, size);
    for (let i = 0; i < size; i++) D.insert(users[i].id, users[i]);
    for (let i = 0; i < size; i++) {
      const searched = D.search(users[i].id) as User;
      D.delete(searched.id);
    }
  };

  const times = {
    biarray: bench(biarray),
    bimap: bench(bimap),
    biobject: bench(biobject),
    chtable: bench(chtable),
    datable: bench(datable),
    oahtable: bench(oahtable),
  };

  console.log({ size, times });
}
