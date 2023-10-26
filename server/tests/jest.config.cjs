module.exports = {
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  globals: {
    'ts-jest': {
        useESM: true
    }
  }
};
