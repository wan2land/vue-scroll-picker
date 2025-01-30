<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  VueScrollPicker,
  VueScrollPickerOption,
  VueScrollPickerValue,
} from 'vue-scroll-picker'
import { format, setDate, setMonth, setYear } from 'date-fns'

defineProps<{
  options: VueScrollPickerOption[]
}>()

const currentValue = ref(new Date())

const currentYear = computed(() => currentValue.value.getFullYear())
const currentMonth = computed(() => currentValue.value.getMonth() + 1)
const currentDay = computed(() => currentValue.value.getDate())

const years = computed(() => {
  const currYear = new Date().getFullYear()
  const lastYear = 1980
  return Array.from(
    { length: currYear - lastYear + 1 },
    (_, index) => lastYear + index,
  ).reverse()
})
const months = computed(() =>
  Array.from({ length: 12 }, (_, index) => index + 1),
)
const days = computed(() => {
  const lastDay = new Date(currentYear.value, currentMonth.value, 0).getDate()
  return Array.from({ length: lastDay }, (_, index) => index + 1)
})

function handleUpdateYear(value: VueScrollPickerValue | undefined) {
  currentValue.value = setYear(currentValue.value, value as number)
}

function handleUpdateMonth(value: VueScrollPickerValue | undefined) {
  currentValue.value = setMonth(currentValue.value, (value as number) - 1)
}

function handleUpdateDay(value: VueScrollPickerValue | undefined) {
  currentValue.value = setDate(currentValue.value, value as number)
}
</script>
<template>
  <div>
    <div>
      Date =
      <code>{{ format(currentValue, 'yyyy-MM-dd') }}</code>
    </div>
    <div class="picker-group">
      <VueScrollPicker
        :options="years"
        :model-value="currentYear"
        @update:model-value="handleUpdateYear"
      />
      <VueScrollPicker
        :options="months"
        :model-value="currentMonth"
        @update:model-value="handleUpdateMonth"
      />
      <VueScrollPicker
        :options="days"
        :model-value="currentDay"
        @update:model-value="handleUpdateDay"
      />
    </div>
  </div>
</template>
<style scoped>
.picker-group {
  display: flex;
}
</style>
