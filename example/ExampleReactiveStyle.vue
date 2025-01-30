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

const fontSize = ref(16)
</script>
<template>
  <div>
    <div class="controller">
      <CurrentValue :value="currentValue" />
      <DefaultController v-model="currentValue" :options="options" />
      <div>
        <span>Font Size: {{ fontSize }}px</span>
        <input
          v-model="fontSize"
          type="range"
          :min="4"
          :max="128"
          :step="1"
          @input="($refs.picker as any).resize()"
        />
      </div>
    </div>
    <div
      :style="{
        'font-size': `${fontSize}px`,
      }"
    >
      <VueScrollPicker ref="picker" v-model="currentValue" :options="options" />
    </div>
  </div>
</template>
