<template>
  <div>
    <p>currentValue = <strong>{{ currentValue === null ? '(null)' : currentValue }}</strong></p>
    <div>
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
        class="button"
        v-for="(option, index) in options"
        :key="index"
        :class="{active: currentValue == option.value}"
        @click="currentValue = option.value"
      >{{ option.name }}</a>
    </div>
    <scroll-picker :options="options" v-model="currentValue" />
  </div>
</template>
<script lang="ts">
import { ScrollPickerOption } from '../src/components/picker'
import { defineComponent, PropType } from 'vue'


export default defineComponent({
  props: {
    options: {
      type: Array as PropType<ScrollPickerOption[]>,
      default: () => [],
    },
  },
  data() {
    return {
      currentValue: null,
    }
  },
})
</script>
