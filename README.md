Vue Scroll Picker
=================

Scroll Picker Component for Vue2. Support All Gestures of Mouse(even also MouseWheel!) and Touch.

[Demo](http://wan2land.github.io/vue-scroll-picker/)

## Installation

```
npm install vue-scroll-picker --save
```

## Usage

### ES6

```js
import Vue from 'vue'
import VueScrollPicker from 'vue-scroll-picker'

Vue.use(VueScrollPicker)
```

or

```js
import Vue from 'vue'
import {ScrollPicker, ScrollPickerGroup} from 'vue-scroll-picker'

new Vue({
    components: {
        ScrollPicker,
        ScrollPickerGroup
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

  <script src="path/to/vue.js"></script>
  <script src="path/to/vue-scroll-picker.js"></script>
  <script>
    new Vue({
      el: '#app'
    })
  </script>
</body>
</html>
```

### Example

 - [Demo](http://wan2land.github.io/vue-scroll-picker/)
 - [Sources](./example-src/App.vue)

## Options

### Props

| Props       | Type          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| value       | mixed         | null     | set value    |
| placeholder | String        | null     | placeholder  |
| options     | Array         | []       | options of value |

