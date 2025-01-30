<script setup lang="ts">
import { ref } from 'vue'
import {
  VueScrollPicker,
  VueScrollPickerOption,
  VueScrollPickerValue,
} from 'vue-scroll-picker'
import CurrentValue from './CurrentValue.vue'

defineProps<{
  options: VueScrollPickerOption[]
}>()

const currentValue = ref<VueScrollPickerValue>(null)

const dragSensitivity = ref(1.7)
const touchSensitivity = ref(1.7)
const scrollSensitivity = ref(1)
</script>
<template>
  <div>
    <div class="controller">
      <CurrentValue :value="currentValue" />
      <div class="nobs">
        <div class="nob">
          <label>Drag Sensitivity (default = 1.7)</label>
          <div>
            <input
              v-model.number="dragSensitivity"
              type="range"
              min="0.5"
              max="10"
              step="0.1"
            />
            {{ dragSensitivity }}
          </div>
        </div>
        <div class="nob">
          <label>Touch Sensitivity (default = 1.7)</label>
          <div>
            <input
              v-model.number="touchSensitivity"
              type="range"
              min="0.5"
              max="10"
              step="0.1"
            />
            {{ touchSensitivity }}
          </div>
        </div>
        <div class="nob">
          <label>Scroll Sensitivity (default = 1)</label>
          <div>
            <input
              v-model.number="scrollSensitivity"
              type="range"
              min="0.5"
              max="10"
              step="0.1"
            />
            {{ scrollSensitivity }}
          </div>
        </div>
      </div>
    </div>
    <VueScrollPicker
      v-model="currentValue"
      :drag-sensitivity="dragSensitivity"
      :touch-sensitivity="touchSensitivity"
      :scroll-sensitivity="scrollSensitivity"
      :options="options"
    />
  </div>
</template>
<style scoped>
.nobs {
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
}
.nob {
  margin: 0.5rem;
}
</style>
