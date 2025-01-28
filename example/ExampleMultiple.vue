<template>
  <div>
    <p>
      Date =
      <strong>{{ currentYear }}-{{ currentMonth }}-{{ currentDay }}</strong>
    </p>
    <div class="picker-group">
      <VueScrollPicker v-model="currentYear" :options="years" />
      <VueScrollPicker v-model="currentMonth" :options="months" />
      <VueScrollPicker v-model="currentDay" :options="days" />
    </div>
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
      currentYear: new Date().getFullYear(),
      currentMonth: 1,
      currentDay: 1,
    }
  },
  computed: {
    years() {
      const currYear = new Date().getFullYear()
      const lastYear = 1980
      return Array.from(
        { length: currYear - lastYear + 1 },
        (_, index) => lastYear + index,
      ).reverse()
    },
    months() {
      return Array.from({ length: 12 }, (_, index) => index + 1)
    },
    days() {
      const lastDay = new Date(this.currentYear, this.currentMonth, 0).getDate()
      return Array.from({ length: lastDay }, (_, index) => index + 1)
    },
  },
})
</script>
<style scoped>
.picker-group {
  display: flex;
}
</style>
