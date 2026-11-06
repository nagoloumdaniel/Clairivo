import { defineConfig } from "@playwright/test";

const port = process.env.E2E_PORT ?? "3000";

export default defineConfig({
  testDir: "tests/e2e",
  webServer: {
    command: `npm run build && npx next start -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  },
  use: { baseURL: `http://localhost:${port}` },
});
