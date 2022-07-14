/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    // これがあると速くなる
    "ts-jest": {
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
