<style scoped>
.nobs {
  display: flex;
  flex-wrap: wrap;
  margin-left: -.5rem;
  margin-right: -.5rem;
}
.nob {
  margin: .5rem;
}
</style>
<template>
  <div>
    <p>currentValue = <strong>{{ currentValue === null ? '(null)' : currentValue }}</strong></p>
    <div class="nobs">
      <div class="nob">
        <label>Drag Sensitivity (default = 1.7)</label>
        <div>
          <input type="range" min="0.5" max="10" step="0.1" v-model.number="dragSensitivity" /> {{ dragSensitivity }}
        </div>
      </div>
      <div class="nob">
        <label>Touch Sensitivity (default = 1.7)</label>
        <div>
          <input type="range" min="0.5" max="10" step="0.1" v-model.number="touchSensitivity" /> {{ touchSensitivity }}
        </div>
      </div>
      <div class="nob">
        <label>Scroll Sensitivity (default = 1)</label>
        <div>
          <input type="range" min="0.5" max="10" step="0.1" v-model.number="scrollSensitivity" /> {{ scrollSensitivity }}
        </div>
      </div>
    </div>
    <VueScrollPicker
      :drag-sensitivity="dragSensitivity"
      :touch-sensitivity="touchSensitivity"
      :scroll-sensitivity="scrollSensitivity"
      :options="options"
      v-model="currentValue"
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
