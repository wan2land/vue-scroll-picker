<template>
  <div>
    <div class="hero">
      <h2>Vue Scroll Picker</h2>
      <p>iOS Style Scroll Picker Component for Vue 3. Support All Gestures of Mouse(also MouseWheel) and Touch.</p>
    </div>
    <div class="section">
      <div class="container">
        <h2>Full Binding</h2>
        <ExampleFullBinding :options="defaultOptions" />
        
        <h2>Placeholder</h2>
        <ExamplePlaceholder :options="defaultOptions" />

        <h2>Slot Support</h2>
        <ExampleSlot />

        <h2>Sensitivity</h2>
        <ExampleSensitivity :options="defaultOptions" />

        <h2>Transition</h2>
        <ExampleTransition :options="defaultOptions" />

        <h2>Dynamic Options</h2>
        <ExampleDynamicOptions />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import ExampleFullBinding from './ExampleFullBinding.vue'
import ExamplePlaceholder from './ExamplePlaceholder.vue'
import ExampleSlot from './ExampleSlot.vue'
import ExampleSensitivity from './ExampleSensitivity.vue'
import ExampleTransition from './ExampleTransition.vue'
import ExampleDynamicOptions from './ExampleDynamicOptions.vue'


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
