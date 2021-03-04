# Vue Scroll Picker

<p>
  <a href="https://npmcharts.com/compare/vue-scroll-picker?minimal=true"><img alt="Downloads" src="https://img.shields.io/npm/dt/vue-scroll-picker.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/vue-scroll-picker"><img alt="Version" src="https://img.shields.io/npm/v/vue-scroll-picker.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/vue-scroll-picker"><img alt="License" src="https://img.shields.io/npm/l/vue-scroll-picker.svg?style=flat-square" /></a>
  <img alt="VueJS 2.x" src="https://img.shields.io/badge/vue.js-2.x-brightgreen.svg?style=flat-square" />
  <br />
  <a href="https://david-dm.org/wan2land/vue-scroll-picker"><img alt="dependencies Status" src="https://img.shields.io/david/wan2land/vue-scroll-picker.svg?style=flat-square" /></a>
  <a href="https://david-dm.org/wan2land/vue-scroll-picker?type=dev"><img alt="devDependencies Status" src="https://img.shields.io/david/dev/wan2land/vue-scroll-picker.svg?style=flat-square" /></a>
</p>

Scroll Picker Component for Vue 3. Support All Gestures of Mouse(also MouseWheel) and Touch.

If you are using vue 2, please refer to the [v0.x branch](https://github.com/wan2land/vue-scroll-picker/tree/0.x-vue2).

### Examples

 - [Example](http://vue-scroll-picker.dist.be) ([sources](./examples))

## Installation

```bash
npm i vue-scroll-picker
```

## Usage

**Global Registration**

[Vue3 Global Registration Guide](https://v3.vuejs.org/guide/component-registration.html#global-registration)

```js
import { createApp } from 'vue'
import VueScrollPicker from 'vue-scroll-picker'

import 'vue-scroll-picker/lib/style.css'


const app = createApp(/* */)

app.use(VueScrollPicker)

```

**Local Registration**

[Vue3 Local Registration Guide](https://v3.vuejs.org/guide/component-registration.html#local-registration)

```vue
<script>
import { ScrollPicker } from 'vue-scroll-picker'

export default {
  components: {
    ScrollPicker,
  },
}
</script>
<style src="vue-scroll-picker/lib/style.css"></style>
```

## Options

### Props

| Name              | Type      | Default  | Example  |
| ----------------- |:--------- | -------- | -------- |
| modelValue        | `any`     | `null`   |          |
| placeholder       | `string`  | `null`   |          |
| empty             | `string`  | `'No Items'`  |     |
| options           | `(string|{ name: string, value: any })[]` | `[]`  | `["10KG", "20KG", "30KG"]` or `[{value: 10, name: "10KG"}, {value: 20, name: "20KG"}]` |
| dragSensitivity   | `number`  | `1.7`    |          |
| touchSensitivity  | `number`  | `1.7`    |          |
| scrollSensitivity | `number`  | `1`      |          |

### EventS

| Name             | Type      |
| ----------------- |:--------- |
| update:modelValue | `any`     |

### Slots

| Name            | Prop      | Default  |
| --------------- |:--------- | -------- |
| default         | `{ option: { name: string, value: any } }` | `{{ option.name }}`  |
| placeholder     | `{ text: string }`  | `{{ placeholder }}` |
| empty           | `{ text: string }`  | `No Items`          |

### Styling

- [Vue Loader Deep Selector](https://vue-loader.vuejs.org/en/features/scoped-css.html) : if you want to override css style, use deep selector!
