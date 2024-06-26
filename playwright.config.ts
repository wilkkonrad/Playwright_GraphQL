import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', 
  reporter: 'line',
  expect: {
    timeout: 5000
  },
  fullyParallel: true, 
  workers: 8, 
  use: {
    headless: true,
    baseURL: 'https://graphqlzero.almansi.me/api', 

  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
       },
    },
  ],
});
