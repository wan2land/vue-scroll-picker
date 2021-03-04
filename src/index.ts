import { App, Plugin } from 'vue'

import ScrollPicker from './components/picker'


export function install(app: App) {
  app.component('ScrollPicker', ScrollPicker)
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}

const plugin: Plugin = {
  install,
}

export default plugin

// re-define: https://github.com/vitejs/vite/issues/2117
export interface ScrollPickerOption {
  name: string
  value: any
}

export {
  ScrollPicker,
}
