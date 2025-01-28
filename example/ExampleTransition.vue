<template>
  <div>
    <p>
      currentValue =
      <strong>{{ currentValue === null ? '(null)' : currentValue }}</strong>
    </p>
    <div class="button-group">
      <a class="button" @click="isVisible = !isVisible">{{
        isVisible ? 'Hide' : 'Show'
      }}</a>
    </div>
    <transition name="fade">
      <VueScrollPicker
        v-if="isVisible"
        v-model="currentValue"
        :options="options"
      />
    </transition>
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
      isVisible: false,
      currentValue: 0,
    }
  },
})
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
