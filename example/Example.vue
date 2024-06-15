<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="hero">
      <h2>Vue Scroll Picker</h2>
      <p>iOS Style Scroll Picker Component for Vue 3. Support All Gestures of Mouse(also MouseWheel) and Touch.</p>
      <a class="github" href="https://github.com/wan2land/vue-scroll-picker" target="_blank" v-html="iconGithub" />
    </div>
    <div class="section">
      <div class="container">
        <h2 id="full_binding"><a href="#full_binding">Full Binding</a></h2>
        <p>Vue Scroll Picker provides full data binding. <a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleDynamicOptions.vue">[Source]</a></p>
        <ExampleFullBinding :options="defaultOptions" />

        <h2 id="disabled_items"><a href="#disabled_items">Disabled Items</a></h2>
        <p>You can add a disabled property to the select options. A disabled value cannot be selected. <a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleDisabledItems.vue">[Source]</a></p>
        <ExampleDisabledItems />

        <h2 id="placeholder"><a href="#placeholder">Placeholder</a></h2>
        <p>Vue Scroll Picker provides a placeholder option. When setting a placeholder, you can use null as the value. <a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExamplePlaceholder.vue">[Source]</a></p>
        <ExamplePlaceholder :options="defaultOptions" />

        <h2 id="slot_support"><a href="#slot_support">Slot Support</a></h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleSlot.vue">[Source]</a></p>
        <ExampleSlot />

        <h2 id="event"><a href="#event">Event</a></h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleEvent.vue">[Source]</a></p>
        <ExampleEvent :options="defaultOptions" />

        <h2 id="sensitivity"><a href="#sensitivity">Sensitivity</a></h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleSensitivity.vue">[Source]</a></p>
        <ExampleSensitivity :options="defaultOptions" />

        <h2 id="transition"><a href="#transition">Transition</a></h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleTransition.vue">[Source]</a></p>
        <ExampleTransition :options="defaultOptions" />

        <h2 id="dynamic_options"><a href="#dynamic_options">Dynamic Options</a></h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleDynamicOptions.vue">[Source]</a></p>
        <ExampleDynamicOptions />

        <h2 id="reactive_style"><a href="#reactive_style">Reactive Style</a></h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleReactiveStyle.vue">[Source]</a></p>
        <ExampleReactiveStyle :options="defaultOptions" />

        <h2 id="dialog"><a href="#dialog">Dialog</a></h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleDialog.vue">[Source]</a></p>
        <ExampleDialog :options="defaultOptions" />

        <h2 id="multiple"><a href="#multiple">Multiple</a></h2>
        <p><a href="https://github.com/wan2land/vue-scroll-picker/blob/main/example/ExampleMultiple.vue">[Source]</a></p>
        <ExampleMultiple />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { siGithub } from 'simple-icons/icons'
import { defineComponent } from 'vue'

import { VueScrollPickerOption } from 'vue-scroll-picker'
import ExampleDisabledItems from './ExampleDisabledItems.vue'
import ExampleDynamicOptions from './ExampleDynamicOptions.vue'
import ExampleEvent from './ExampleEvent.vue'
import ExampleFullBinding from './ExampleFullBinding.vue'
import ExampleMultiple from './ExampleMultiple.vue'
import ExamplePlaceholder from './ExamplePlaceholder.vue'
import ExampleDialog from './ExampleDialog.vue'
import ExampleReactiveStyle from './ExampleReactiveStyle.vue'
import ExampleSensitivity from './ExampleSensitivity.vue'
import ExampleSlot from './ExampleSlot.vue'
import ExampleTransition from './ExampleTransition.vue'


export default defineComponent({
  components: {
    ExampleFullBinding,
    ExampleDialog,
    ExampleDisabledItems,
    ExamplePlaceholder,
    ExampleSlot,
    ExampleEvent,
    ExampleSensitivity,
    ExampleTransition,
    ExampleDynamicOptions,
    ExampleReactiveStyle,
    ExampleMultiple,
  },
  data() {
    return {
      iconGithub: siGithub.svg,
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
      ] satisfies VueScrollPickerOption[],
    }
  },
})
</script>
