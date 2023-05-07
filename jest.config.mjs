export default {
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