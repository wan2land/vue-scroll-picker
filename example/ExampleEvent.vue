<script lang="ts" setup>
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

const logMessages = ref<string[]>([])

function log(event: string, ...args: unknown[]) {
  logMessages.value.unshift(
    `@${event}(${args.map((arg) => JSON.stringify(arg)).join(', ')})`,
  )
  if (logMessages.value.length > 100) {
    logMessages.value.pop()
  }
}
</script>
<template>
  <div class="container">
    <div class="example">
      <div class="controller">
        <CurrentValue :value="currentValue" />
        <DefaultController v-model="currentValue" :options="options" />
      </div>
      <VueScrollPicker
        v-model="currentValue"
        :options="options"
        @start="(...args) => log('start', ...args)"
        @cancel="(...args) => log('cancel', ...args)"
        @end="(...args) => log('end', ...args)"
        @click="(...args) => log('click', ...args)"
        @move="(...args) => log('move', ...args)"
        @wheel="(...args) => log('wheel', ...args)"
        @update:model-value="(...args) => log('update:model-value', ...args)"
      />
    </div>
    <div class="log-container">
      <div class="log">
        <div v-for="(logMessage, index) in logMessages" :key="index">
          {{ logMessage }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 16px;
}
.example {
  flex: 1;
}
.log-container {
  position: relative;
  min-width: 320px;
  height: 240px;
}
.log {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #ccc;
  padding: 4px;
  overflow: scroll;
}
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
  .log-container {
    height: auto;
  }
}
</style>
