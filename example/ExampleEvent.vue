<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { VueScrollPicker, VueScrollPickerOption } from 'vue-scroll-picker';

defineProps({
  options: {
    type: Array as PropType<VueScrollPickerOption[]>,
    default: () => [],
  },
})

const currentValue = ref<any>(null)

const logs = ref<string[]>([])

function log(event: string, ...args: any[]) {
  logs.value.unshift(`@${event}(${args.map(arg => JSON.stringify(arg)).join(', ')})`)
  if (logs.value.length > 100) {
    logs.value.pop()
  }
}

</script>
<template>
  <div class="container">
    <div class="example">
      <p>currentValue = <strong>{{ currentValue === null ? '(null)' : currentValue }}</strong></p>
      <div class="button-group">
        <a
          class="button"
          :class="{active: currentValue === null}"
          @click="currentValue = null"
        >(null)</a>
        <a
          class="button"
          :class="{active: currentValue === 'unknown'}"
          @click="currentValue = 'unknown'"
        >(Unknown)</a>
        <a
          v-for="(option, index) in options"
          :key="index"
          class="button"
          :class="{active: currentValue == option.value}"
          @click="currentValue = option.value"
        >{{ option.name }}</a>
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
        <div v-for="(log, index) in logs" :key="index">{{ log }}</div>
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
  .log-container{
    height: auto;
  }
}

</style>
