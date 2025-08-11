import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  /*verbose: true,
  coveragePathIgnorePatterns: ['/node_modules/', '__stories__'],
  coverageReporters: ['json-summary', 'html', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  //transformIgnorePatterns: ['node_modules/?!(@nlmk/spep-ng-components)'],
  preset: 'ts-jest',
  //testEnvironment: 'node',
  automock: true,*/
  collectCoverage: true,
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  testRunner: '<rootDir>/node_modules/jest-circus/runner.js',
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js',
    '.+\\.(css|styl|less|sass|scss)$':
      '<rootDir>/node_modules/jest-css-modules-transform',
  },
  transformIgnorePatterns: ['node_modules/?!(react-icons)'],
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  resetMocks: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.husky/',
    '/config/',
    '/coverage/',
    '/public/',
    '/nginx/',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.husky/',
    '/config/',
    '/coverage/',
    '/public/',
    '/nginx/',
  ],
  coverageReporters: ['json-summary', 'html', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 20,
      branches: 20,
      functions: 20,
      lines: 20,
    },
  },
};

export default config;
