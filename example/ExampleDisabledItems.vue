<template>
  <div>
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
        :class="{
          active: currentValue == option.value,
          disabled: option.disabled,
        }"
        @click="currentValue = option.value"
      >{{ option.name }}</a>
    </div>
    <VueScrollPicker v-model="currentValue" :options="options" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { VueScrollPickerOption } from 'vue-scroll-picker'

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<VueScrollPickerOption[]>,
      default: () => [
        { value: 0, name: '0KG' },
        { value: 10, name: '10KG', disabled: true },
        { value: 20, name: '20KG' },
        { value: 30, name: '30KG' },
        { value: 40, name: '40KG' },
        { value: 50, name: '50KG', disabled: true },
        { value: 60, name: '60KG', disabled: true },
        { value: 70, name: '70KG' },
        { value: 80, name: '80KG' },
        { value: 90, name: '90KG', disabled: true },
        { value: 100, name: '100KG', disabled: true },
      ],
    },
  },
  data() {
    return {
      currentValue: null as unknown,
    }
  },
})
</script>
