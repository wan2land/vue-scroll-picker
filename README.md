# Vue Scroll Picker

<p>
  <a href="https://github.com/wan2land/vue-scroll-picker/actions/workflows/ci.yml"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/wan2land/vue-scroll-picker/ci.yml?branch=main&logo=github&style=flat-square" /></a>
  <a href="https://npmcharts.com/compare/vue-scroll-picker?minimal=true"><img alt="Downloads" src="https://img.shields.io/npm/dm/vue-scroll-picker.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/vue-scroll-picker"><img alt="Version" src="https://img.shields.io/npm/v/vue-scroll-picker.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/vue-scroll-picker"><img alt="License" src="https://img.shields.io/npm/l/vue-scroll-picker.svg?style=flat-square" /></a>
  <img alt="VueJS 3.x" src="https://img.shields.io/badge/vue.js-3.x-brightgreen.svg?style=flat-square" />
  <img alt="Language Typescript" src="https://img.shields.io/badge/language-Typescript-007acc.svg?style=flat-square" />
</p>

iOS Style Scroll Picker Component for Vue 3. Support All Gestures of Mouse(also
MouseWheel) and Touch.

If you are using vue 2, please refer to the
[v0.x branch](https://github.com/wan2land/vue-scroll-picker/tree/0.x-vue2).

[See Example](http://vue-scroll-picker.dist.be) ([sources](./example))

## Installation

```bash
npm i vue-scroll-picker
```

## Usage

**Global Registration**

[Vue3 Global Registration Guide](https://v3.vuejs.org/guide/component-registration.html#global-registration)

```js
import { createApp } from "vue";
import VueScrollPicker from "vue-scroll-picker";

import "vue-scroll-picker/lib/style.css";

const app = createApp(); /* */

app.use(VueScrollPicker); // export default is plugin
```

**Local Registration**

[Vue3 Local Registration Guide](https://v3.vuejs.org/guide/component-registration.html#local-registration)

```vue
<template>
  <VueScrollPicker :options="options" />
</template>
<script>
import { VueScrollPicker } from 'vue-scroll-picker'

export default {
  components: {
    VueScrollPicker, // export VueScrollPicker is component
  },
}
</script>
<style src="vue-scroll-picker/lib/style.css"></style>
```

## Options

### Props

| Name              | Type                                              | Default      | Example                                                                                   |
| ----------------- | :------------------------------------------------ | ------------ | ----------------------------------------------------------------------------------------- |
| modelValue        | `any`                                             | `null`       |                                                                                           |
| placeholder       | `string`                                          | `null`       |                                                                                           |
| empty             | `string`                                          | `'No Items'` |                                                                                           |
| options           | `string[]`<br /> `{ name: string, value: any, disabled: boolean }[]` | `[]`         | `["10KG", "20KG", "30KG"]`<br /> `[{value: 10, name: "10KG"}, {value: 20, name: "20KG"}]` |
| dragSensitivity   | `number`                                          | `1.7`        |                                                                                           |
| touchSensitivity  | `number`                                          | `1.7`        |                                                                                           |
| scrollSensitivity | `number`                                          | `1`          |                                                                                           |

### Events

| Name              | Type                                  |
| ----------------- | :------------------------------------ |
| update:modelValue | `(value: any) => void`                |
| start             | `() => void`                          |
| move              | `(value: any) => void`                |
| end               | `(value: any) => void`                |
| cancel            | `() => void`                          |
| wheel             | `(value: any) => void`                |
| click             | `(value: any, oldValue: any) => void` |

### Slots

| Name        | Prop                                       | Default             |
| ----------- | :----------------------------------------- | ------------------- |
| default     | `{ option: { name: string, value: any } }` | `{{ option.name }}` |
| placeholder | `{ text: string }`                         | `{{ placeholder }}` |
| empty       | `{ text: string }`                         | `No Items`          |
