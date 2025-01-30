<script setup lang="ts">
import { ref } from 'vue'
import {
  VueScrollPicker,
  VueScrollPickerOption,
  VueScrollPickerValue,
} from 'vue-scroll-picker'
import CurrentValue from './CurrentValue.vue'
import DefaultController from './DefaultController.vue'

defineProps<{
  options: VueScrollPickerOption[]
}>()

const currentValue = ref<VueScrollPickerValue>(null)
</script>

<template>
  <div>
    <div class="controller">
      <CurrentValue :value="currentValue" />
      <DefaultController v-model="currentValue" :options="options" />
    </div>
    <VueScrollPicker
      v-model="currentValue"
      placeholder="Select"
      :options="options"
    />
  </div>
</template>
