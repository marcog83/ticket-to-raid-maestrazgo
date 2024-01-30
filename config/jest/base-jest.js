module.exports = {
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test/results/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/(__mocks__|locales|constants)/',
    '/*.(test|i18n|index|constants|mock?(s)).[jt]s?(x)'
  ],
  testMatch: [ '<rootDir>/**/*.test.ts?(x)' ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
    'json'
  ]
};
