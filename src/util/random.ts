import { range } from "@/data/array";

export const randInts = (count: number, min = 0, max = 1) =>
  range(count).map(_ => randInt(min, max));

export const randInt = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1) + min);
