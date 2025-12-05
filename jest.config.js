// jest 29+ supports ESM natively
/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testMatch: ['<rootDir>/tests/spec/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/fixtures/'],
};

export default config;
