import { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const testDir = process.env.TEST_DIR || 'tests';
const config: PlaywrightTestConfig = {
  globalSetup: './globalSetup.ts',
  testDir: testDir,
  timeout: 30000, // Overall test timeout
  expect: {
    timeout: 20000 // Expect assertion timeout
  },

  //number of retries if test case fails
  retries: 0,
  workers: 1,
  reporter: [
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'test-results/allure-results',
        suiteTitle: false
      }
    ]
  ]
};

export default config;
