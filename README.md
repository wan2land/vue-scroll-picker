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

iOS Style Scroll Picker Component for Vue 2. Support All Gestures of Mouse(also MouseWheel) and Touch.

If you are using vue 3, please refer to the [main](https://github.com/wan2land/vue-scroll-picker/tree/main).

[See Example](http://vue-scroll-picker.dist.be) ([sources](./example))

## Installation

```
npm i vue-scroll-picker@vue2
```

## Usage

### CSS

Import css file (only version `v0.2` or later).

```js
import "vue-scroll-picker/dist/style.css"
```

### ES6

```js
import Vue from "vue"
import VueScrollPicker from "vue-scroll-picker"

Vue.use(VueScrollPicker)
```

or

```js
import Vue from "vue"
import { ScrollPicker, ScrollPickerGroup } from "vue-scroll-picker"

new Vue({
  components: {
    ScrollPicker,
    ScrollPickerGroup,
  }
})
```

### Globals

```html
<html>
<head>
  ...
</head>
<body>
  <div id="app">
    <scroll-picker :options="[1, 2, 3, 4, 5]"></scroll-picker>
  </div>

  <script src="//cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="//cdn.jsdelivr.net/npm/vue-scroll-picker/dist/index.js"></script>
  <script>
    new Vue({ el: "#app", })
  </script>
</body>
</html>
```

## Options

### Props

| Name              | Type      | Default  | Example  |
| ----------------- |:--------- | -------- | -------- |
| modelValue        | `any`     | `null`   |          |
| placeholder       | `string`  | `null`   |          |
| empty             | `string`  | `'No Items'`  |     |
| options           | `string[]`<br />`{ name: string, value: any }[]` | `[]`  | `["10KG", "20KG", "30KG"]`<br />`[{value: 10, name: "10KG"}, {value: 20, name: "20KG"}]` |
| dragSensitivity   | `number`  | `1.7`    |          |
| touchSensitivity  | `number`  | `1.7`    |          |
| scrollSensitivity | `number`  | `1`      |          |

### Event

 - `@input` : you can use `v-model` :-)

### Styling

- [rscss](http://rscss.io/index.html)
- [Vue Loader Deep Selector](https://vue-loader.vuejs.org/en/features/scoped-css.html) : if you want to override css style, use deep selector in vue-loader!
