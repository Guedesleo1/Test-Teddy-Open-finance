const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  roots: ['<rootDir>/test'],
  compilerOptions: {
    module: 'CommonJS',
    allowCommonjsInEsmPackage: true
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!<rootDir>/src/main/docs/**',
    '!<rootDir>/src/domain/usecases/**',
    '!<rootDir>/src/infra/database/typeorm/**',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/core/interfaces/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      functions: 90,
      lines: 90,
      statements: 90,
      branches: 90
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/**/*.test.ts',
    '**/**/*.spec.ts',
    '**/__tests__/**/*.[jt]s?(x)',
    '**/tests/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
