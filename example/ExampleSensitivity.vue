<template>
  <div>
    <p>
      currentValue =
      <strong>{{ currentValue === null ? '(null)' : currentValue }}</strong>
    </p>
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
    <VueScrollPicker
      v-model="currentValue"
      :drag-sensitivity="dragSensitivity"
      :touch-sensitivity="touchSensitivity"
      :scroll-sensitivity="scrollSensitivity"
      :options="options"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { VueScrollPickerOption } from 'vue-scroll-picker'

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<VueScrollPickerOption[]>,
      default: () => [],
    },
  },
  data() {
    return {
      currentValue: null,
      dragSensitivity: 1.7,
      touchSensitivity: 1.7,
      scrollSensitivity: 1,
    }
  },
})
</script>
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
