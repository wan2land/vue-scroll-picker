<script setup lang="ts">
import {
  format,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
} from 'date-fns'
import { computed, ref } from 'vue'
import { VueScrollPicker, VueScrollPickerValue } from 'vue-scroll-picker'

const currentValue = ref(new Date())

const currentYear = computed(() => currentValue.value.getFullYear())
const currentMonth = computed(() => currentValue.value.getMonth() + 1)
const currentDay = computed(() => currentValue.value.getDate())
const currentAm = computed(() =>
  currentValue.value.getHours() < 12 ? 'AM' : 'PM',
)
const currentHour = computed(() => currentValue.value.getHours() % 12)
const currentMinute = computed(() => currentValue.value.getMinutes())
const currentSecond = computed(() => currentValue.value.getSeconds())

const years = computed(() => {
  const currYear = new Date().getFullYear()
  const lastYear = 1980
  return Array.from(
    { length: currYear - lastYear + 1 },
    (_, index) => lastYear + index,
  ).reverse()
})
const months = Array.from({ length: 12 }, (_, index) => index + 1)
const days = computed(() => {
  const lastDay = new Date(currentYear.value, currentMonth.value, 0).getDate()
  return Array.from({ length: lastDay }, (_, index) => index + 1)
})

const amPm = ['AM', 'PM']
const hours = Array.from({ length: 12 }, (_, index) => index)
const minutes = Array.from({ length: 60 }, (_, index) => index)
const seconds = Array.from({ length: 60 }, (_, index) => index)

function handleUpdateYear(value: VueScrollPickerValue | undefined) {
  currentValue.value = setYear(currentValue.value, value as number)
}

function handleUpdateMonth(value: VueScrollPickerValue | undefined) {
  currentValue.value = setMonth(currentValue.value, (value as number) - 1)
}

function handleUpdateDay(value: VueScrollPickerValue | undefined) {
  currentValue.value = setDate(currentValue.value, value as number)
}

function handleUpdateAm(value: VueScrollPickerValue | undefined) {
  currentValue.value = setHours(currentValue.value, value === 'AM' ? 0 : 12)
}

function handleUpdateHour(value: VueScrollPickerValue | undefined) {
  currentValue.value = setHours(
    currentValue.value,
    (value as number) + (currentAm.value === 'AM' ? 0 : 12),
  )
}

function handleUpdateMinute(value: VueScrollPickerValue | undefined) {
  currentValue.value = setMinutes(currentValue.value, value as number)
}

function handleUpdateSecond(value: VueScrollPickerValue | undefined) {
  currentValue.value = setSeconds(currentValue.value, value as number)
}
</script>
<template>
  <div>
    <div>
      Date =
      <code>{{ format(currentValue, 'yyyy-MM-dd HH:mm:ss') }}</code>
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
      <VueScrollPicker
        :options="amPm"
        :model-value="currentAm"
        @update:model-value="handleUpdateAm"
      />
      <VueScrollPicker
        :options="hours"
        :model-value="currentHour"
        @update:model-value="handleUpdateHour"
      />
      <VueScrollPicker
        :options="minutes"
        :model-value="currentMinute"
        @update:model-value="handleUpdateMinute"
      />
      <VueScrollPicker
        :options="seconds"
        :model-value="currentSecond"
        @update:model-value="handleUpdateSecond"
      />
    </div>
  </div>
</template>
<style scoped>
.picker-group {
  display: flex;
}
</style>
