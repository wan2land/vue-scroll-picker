<style>
a.btn {
  margin: .25rem;
}
a.btn-outline-primary {
  color: #007bff !important;
}
a.btn-outline-primary.active,
a.btn-outline-primary:hover {
  color: #fff !important;
}
.vue-scroll-picker-item-placeholder.-selected {
  color: #17A2B8;
}
.vue-scroll-picker-item.-selected {
  color: #007BFF;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
<template>
  <div class="waniexample">
    <div class="hero">
      <h2>Vue Scroll Picker</h2>
      <p>:-)</p>
    </div>
    <div class="section">
      <div class="container">
        <h2>HTML Support</h2>
        <ExampleHtmlSupport />

        <h2>Example</h2>
        <h3>Full Binding</h3>
        <h3>Styling</h3>
        <h3>Transition</h3>
        <h3>Dynamic Options</h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import ExampleHtmlSupport from './ExampleHtmlSupport.vue'


export default defineComponent({
  components: {
    ExampleHtmlSupport,
  },
})
</script>
