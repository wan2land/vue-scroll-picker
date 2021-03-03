<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
<template>
  <div>
    <p>currentValue = <strong>{{ currentValue === null ? '(null)' : currentValue }}</strong></p>
    <div>
      <a class="button" @click="isVisible = !isVisible">{{ isVisible ? 'Hide' : 'Show' }}</a>
    </div>
    <transition name="fade">
      <scroll-picker :options="options" v-model="currentValue" v-if="isVisible"></scroll-picker>
    </transition>
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
      isVisible: false,
      currentValue: 0,
    }
  },
})
</script>
