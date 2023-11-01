// jest.config.cjs
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^DB/(.*)$': '<rootDir>/DB/$1',
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
