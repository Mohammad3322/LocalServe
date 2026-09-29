
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",

  resolver: "<rootDir>/jest.resolver.js",


  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],


  testTimeout: 30000,

  maxWorkers: "50%",

  testMatch: ["<rootDir>/test/**/*.test.ts", "<rootDir>/test/**/*.test.tsx"],
  collectCoverageFrom: [
    "lib/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "!**/*.d.ts",
  ],
};


const esmPackages = [
  "@heroui",
  "react-aria",
  "react-aria-components",
  "@react-aria",
  "@react-stately",
  "@react-types",
  "@internationalized",
  "@formatjs",
  "@tanstack",
  "@zag-js",
];

const esmTransformIgnorePattern = `/node_modules/(?!(${esmPackages.join("|")})/)`;

module.exports = async () => {
  const config = await createJestConfig(customJestConfig)();

  config.transformIgnorePatterns = [
    esmTransformIgnorePattern,
    "^.+\\.module\\.(css|sass|scss)$",
  ];

  return config;
};
