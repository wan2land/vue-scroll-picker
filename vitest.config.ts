import { mergeConfig, ViteUserConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, {
  test: {
    include: ['src/**/*.spec.ts'],
    setupFiles: ['vitest-browser-vue'],
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
} satisfies ViteUserConfig)
