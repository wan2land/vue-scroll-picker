import { App, Plugin } from 'vue'

import VueScrollPicker, { type ScrollPickerOption, type ScrollPickerOptionable } from './components/picker'

export function install(app: App) {
  app.component('VueScrollPicker', VueScrollPicker)
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}

const plugin: Plugin = {
  install,
}

export default plugin

export {
  VueScrollPicker,
}

export type VueScrollPickerOption = ScrollPickerOption
export type VueScrollPickerOptionable = ScrollPickerOptionable
