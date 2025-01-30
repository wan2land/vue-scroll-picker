# Vue Scroll Picker

<p>
  <a href="https://github.com/wan2land/vue-scroll-picker/actions/workflows/ci.yml"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/wan2land/vue-scroll-picker/ci.yml?branch=main&logo=github&style=flat-square" /></a>
  <a href="https://npmcharts.com/compare/vue-scroll-picker?minimal=true"><img alt="Downloads" src="https://img.shields.io/npm/dm/vue-scroll-picker.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/vue-scroll-picker"><img alt="Version" src="https://img.shields.io/npm/v/vue-scroll-picker.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/vue-scroll-picker"><img alt="License" src="https://img.shields.io/npm/l/vue-scroll-picker.svg?style=flat-square" /></a>
  <img alt="VueJS 3.x" src="https://img.shields.io/badge/vue.js-3.x-brightgreen.svg?style=flat-square" />
  <img alt="Language Typescript" src="https://img.shields.io/badge/language-Typescript-007acc.svg?style=flat-square" />
</p>

Vue Scroll Picker is an iOS-style scroll picker component for Vue 3. It supports all gestures, including mouse and touch interactions, ensuring a smooth and intuitive user experience.

If you are using Vue 2, please refer to the [v0.x branch](https://github.com/wan2land/vue-scroll-picker/tree/0.x-vue2).

[Live Demo](http://vue-scroll-picker.dist.be) ([source](./example))

## Features

- **TypeScript Support**: Uses generics for strict type checking and improved developer experience.
- **Native-like Behavior**: Mimics `<select>` element behavior for consistency.
- **Lightweight & Performant**: Minimal dependencies with optimized rendering.

## Installation

```bash
npm install vue-scroll-picker
```

## Usage

Vue Scroll Picker can be used both globally and locally in your Vue application. Below are examples of how to set it up.

### Global Registration

To register Vue Scroll Picker globally in your Vue application, import it in your main file and apply it as a plugin:

[Vue3 Global Registration Guide](https://v3.vuejs.org/guide/component-registration.html#global-registration)

```js
import { createApp } from "vue";

import VueScrollPicker from "vue-scroll-picker";
import "vue-scroll-picker/style.css";

const app = createApp(); /* */

app.use(VueScrollPicker); // export default is plugin
```

### Local Registration

To use Vue Scroll Picker in a specific component, import it and register it locally:

[Vue3 Local Registration Guide](https://v3.vuejs.org/guide/component-registration.html#local-registration)

```vue
<script setup>
import { VueScrollPicker } from 'vue-scroll-picker'
import "vue-scroll-picker/style.css";

const options = [
  { name: 'Option 1', value: 1 },
  { name: 'Option 2', value: 2 },
  { name: 'Option 3', value: 3 },
]
const modelValue = ref(1)
</script>
<template>
  <VueScrollPicker :options="options" v-model="modelValue" />
</template>
```

### Nuxt

```ts
import VueScrollPicker from "vue-scroll-picker" // export default is plugin
import 'vue-scroll-picker/style.css'

export default defineNuxtPlugin({
  async setup({ vueApp }) {
    vueApp.use(VueScrollPicker)
  }
})
```

## Options

### Props

Vue Scroll Picker accepts several props to customize its behavior:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number \| boolean \| null` | `undefined` | The selected value of the picker. |
| `options` | `Array<{ name: string; value: any; disabled?: boolean }>` | `[]` | The list of options displayed in the picker. |
| `emptyText` | `string` | `'No options available'` | Text displayed when there are no options available. |
| `dragSensitivity` | `number` | `1.7` | Sensitivity of dragging interaction. |
| `touchSensitivity` | `number` | `1.7` | Sensitivity of touch interaction. |
| `wheelSensitivity` | `number` | `1` | Sensitivity of mouse wheel scrolling. |

### Events

Vue Scroll Picker emits several events to notify changes:

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number \| boolean \| null` | Fired when the selected value changes. |
| `start` | `void` | Fired when interaction starts. |
| `move` | `string \| number \| boolean \| null` | Fired when the selection moves. |
| `end` | `string \| number \| boolean \| null` | Fired when interaction ends. |
| `cancel` | `void` | Fired when interaction is canceled. |
| `wheel` | `string \| number \| boolean \| null` | Fired when using the mouse wheel. |
| `click` | `string \| number \| boolean \| null` | Fired when the picker is clicked. |

### Slots

Vue Scroll Picker provides slots for custom rendering:

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ option: { name: string; value: any; disabled?: boolean } }` | Custom rendering for each option. |
| `empty` | `{ text: string }` | Custom rendering when no options are available. |
