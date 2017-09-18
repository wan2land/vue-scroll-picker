Vue Scroll Picker
=================

Support all gesture Mouse(Drag + Scroll) / Touch.

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
import {Picker, PickerGroup} from 'vue-scroll-picker'

new Vue({
    components: {
        Picker,
        PickerGroup
    }
})
```

ScrollPicker
### Globals

```html
<html>
<head>
  ...
</head>
<body>
  <div id="app">
    <scroll-picker></scroll-picker>
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
