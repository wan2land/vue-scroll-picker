import { App, Component, Plugin } from 'vue'

import VueScrollPicker, {
  type ScrollPickerValue,
  type ScrollPickerOption,
  type ScrollPickerOptionable,
} from './components/VueScrollPicker.vue'

import './style.css'

export function install(app: App) {
  app.component('VueScrollPicker', VueScrollPicker as unknown as Component)
}

if (typeof window !== 'undefined' && 'Vue' in window) {
  install(window.Vue as App)
}

const plugin: Plugin = {
  install,
}

export default plugin

export { VueScrollPicker }

export type VueScrollPickerValue = ScrollPickerValue
export type VueScrollPickerOption = ScrollPickerOption
export type VueScrollPickerOptionable<T> = ScrollPickerOptionable<T>
