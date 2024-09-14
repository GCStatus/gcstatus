import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'j2456e',
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    experimentalFetchPolyfill: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
  env: {
    API_URL: 'http://localhost:8000',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
  nodeOptions: ['--loader', 'ts-node/esm'],
})
