module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^DB/(.*)$': '<rootDir>/DB/$1',  // Map the DB folder as in tsconfig paths
      // Add other path mappings if needed
    },
    globals: {
      'ts-jest': {
        tsconfig: './tsconfig.json', 
      },
    },
  };
  