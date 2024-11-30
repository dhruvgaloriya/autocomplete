// jest.config.cjs

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files using ts-jest
  },
  testEnvironment: "jest-environment-jsdom", // Set test environment to jsdom
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Path alias support,
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
};
