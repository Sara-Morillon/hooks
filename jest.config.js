module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['dist'],
  coveragePathIgnorePatterns: ['mock'],
  testMatch: ['<rootDir>/tests/**/*.test.*'],
}
