import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['./myCustomReporter.ts'], ['html'], ['list']],  testDir: './tests', // Directory where your test files are located
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true, // Enable parallel execution
  workers: 8, // Adjust the number of workers based on your CPU cores
  use: {
    headless: true,
    baseURL: 'https://graphqlzero.almansi.me/api'
    // Other shared context options
  },
  // Configure test project or add multiple projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
       },
    },
  ],
});
