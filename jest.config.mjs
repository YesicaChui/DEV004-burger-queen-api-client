export default {
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/api/api.js',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/(?!@my-module)'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};