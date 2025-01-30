<script setup lang="ts">
import { VueScrollPickerOption, VueScrollPickerValue } from 'vue-scroll-picker'

defineProps<{
  modelValue?: VueScrollPickerValue
  options: VueScrollPickerOption[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: VueScrollPickerValue): void
}>()
</script>
<template>
  <div class="button-group">
    <a
      v-for="(option, index) in options"
      :key="index"
      class="button"
      :class="{
        active: modelValue === option.value,
        disabled: option.disabled,
      }"
      @click="emit('update:modelValue', option.value)"
      >{{ option.value === null ? 'NULL' : option.name }}</a
    >
    <a
      class="button"
      :class="{ active: modelValue === 'unknown' }"
      @click="emit('update:modelValue', 'unknown')"
      >(Unknown)</a
    >
  </div>
</template>
