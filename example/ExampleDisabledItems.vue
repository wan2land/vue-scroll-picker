<script setup lang="ts">
import { ref } from 'vue'
import {
  VueScrollPicker,
  VueScrollPickerOption,
  VueScrollPickerValue,
} from 'vue-scroll-picker'
import CurrentValue from './CurrentValue.vue'
import DefaultController from './DefaultController.vue'

const options: VueScrollPickerOption[] = [
  { value: null, name: 'Select an option' },
  { value: 0, name: '0KG' },
  { value: 10, name: '10KG', disabled: true },
  { value: 20, name: '20KG' },
  { value: 30, name: '30KG' },
  { value: 40, name: '40KG' },
  { value: 50, name: '50KG', disabled: true },
  { value: 60, name: '60KG', disabled: true },
  { value: 70, name: '70KG' },
  { value: 80, name: '80KG' },
  { value: 90, name: '90KG', disabled: true },
  { value: 100, name: '100KG', disabled: true },
]

const currentValue = ref<VueScrollPickerValue>(null)
</script>
<template>
  <div>
    <div class="controller">
      <CurrentValue :value="currentValue" />
      <DefaultController v-model="currentValue" :options="options" />
    </div>
    <VueScrollPicker v-model="currentValue" :options="options" />
  </div>
</template>
