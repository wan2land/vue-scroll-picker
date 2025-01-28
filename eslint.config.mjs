import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginVue from 'eslint-plugin-vue'
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  {
    ignores: ['example-dist/*'],
  },
  eslintPluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'no-console': 'error',
    },
  },
)
