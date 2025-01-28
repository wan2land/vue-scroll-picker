<template>
  <div>
    <p>
      currentValue =
      <strong>{{ currentValue === null ? '(null)' : currentValue }}</strong>
    </p>
    <div class="button-group">
      <a
        class="button"
        :class="{ active: currentValue === null }"
        @click="currentValue = null"
        >(null)</a
      >
      <a
        class="button"
        :class="{ active: currentValue === 'unknown' }"
        @click="currentValue = 'unknown'"
        >(Unknown)</a
      >
      <a
        v-for="(option, index) in options"
        :key="index"
        class="button"
        :class="{
          active: currentValue == option.value,
          disabled: option.disabled,
        }"
        @click="currentValue = option.value"
        >{{ option.name }}</a
      >
    </div>
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
    <div
      :style="{
        'font-size': `${fontSize}px`,
      }"
    >
      <VueScrollPicker ref="picker" v-model="currentValue" :options="options" />
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
      fontSize: 16,
      currentValue: null as unknown,
    }
  },
})
</script>
