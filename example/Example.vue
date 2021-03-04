<template>
  <div>
    <div class="hero">
      <h2>Vue Scroll Picker</h2>
      <p>iOS Style Scroll Picker Component for Vue 3. Support All Gestures of Mouse(also MouseWheel) and Touch.</p>
    </div>
    <div class="section">
      <div class="container">
        <h2>Full Binding</h2>
        <p>Vue Scroll Picker provides full binding. <a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleDynamicOptions.vue">[Source]</a></p>
        <ExampleFullBinding :options="defaultOptions" />

        <h2>Placeholder</h2>
        <p>Vue Scroll Picker provides a placeholder option. When setting a placeholder, you can use null as a value. <a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExamplePlaceholder.vue">[Source]</a></p>
        <ExamplePlaceholder :options="defaultOptions" />

        <h2>Slot Support</h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleSlot.vue">[Source]</a></p>
        <ExampleSlot />

        <h2>Sensitivity</h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleSensitivity.vue">[Source]</a></p>
        <ExampleSensitivity :options="defaultOptions" />

        <h2>Transition</h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleTransition.vue">[Source]</a></p>
        <ExampleTransition :options="defaultOptions" />

        <h2>Dynamic Options</h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleDynamicOptions.vue">[Source]</a></p>
        <ExampleDynamicOptions />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import ExampleDynamicOptions from './ExampleDynamicOptions.vue'
import ExampleFullBinding from './ExampleFullBinding.vue'
import ExamplePlaceholder from './ExamplePlaceholder.vue'
import ExampleSensitivity from './ExampleSensitivity.vue'
import ExampleSlot from './ExampleSlot.vue'
import ExampleTransition from './ExampleTransition.vue'


export default defineComponent({
  components: {
    ExampleFullBinding,
    ExamplePlaceholder,
    ExampleSlot,
    ExampleSensitivity,
    ExampleTransition,
    ExampleDynamicOptions,
  },
  data() {
    return {
      defaultOptions: [
        { value: 0, name: '0KG' },
        { value: 10, name: '10KG' },
        { value: 20, name: '20KG' },
        { value: 30, name: '30KG' },
        { value: 40, name: '40KG' },
        { value: 50, name: '50KG' },
        { value: 60, name: '60KG' },
        { value: 70, name: '70KG' },
        { value: 80, name: '80KG' },
        { value: 90, name: '90KG' },
        { value: 100, name: '100KG' },
      ],
    }
  },
})
</script>
