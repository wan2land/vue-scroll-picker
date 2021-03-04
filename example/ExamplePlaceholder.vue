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
        class="button"
        v-for="(option, index) in options"
        :key="index"
        :class="{active: currentValue == option.value}"
        @click="currentValue = option.value"
      >{{ option.name }}</a>
    </div>
    <VueScrollPicker :options="options" v-model="currentValue" placeholder="Select One" />
  </div>
</template>
<script lang="ts">
import { VueScrollPickerOption } from 'vue-scroll-picker'
import { defineComponent, PropType } from 'vue'


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
    }
  },
})
</script>
