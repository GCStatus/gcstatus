module.exports = {
  roots: ['src'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|specs|test|tests).[jt]s?(x)',
  ],
  transform: {
    '\\.svg$': '<rootDir>/test/svg-transform.cjs',
    '\\.(css|scss)$': '<rootDir>/test/jest-transform-css.cjs',
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        sourceMaps: true,
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.stories.tsx',
    '!src/mocks/**/*.ts',
  ],
  coverageReporters: ['text', 'cobertura'],
  setupFilesAfterEnv: ['./test/setup-test-framework.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      require.resolve('./test/file-mock.ts'),
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': '<rootDir>/test/style-mock.cjs',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFiles: ['<rootDir>/test/setup.jest.js'],
}
