<script setup lang="ts">
import { ref } from 'vue'
import {
  VueScrollPicker,
  VueScrollPickerOption,
  VueScrollPickerValue,
} from 'vue-scroll-picker'
import CurrentValue from './CurrentValue.vue'

defineProps<{
  options: VueScrollPickerOption[]
}>()

const currentValue = ref<VueScrollPickerValue>(null)

const isVisible = ref(false)
</script>
<template>
  <div>
    <div class="controller">
      <CurrentValue :value="currentValue" />
      <div class="button-group">
        <a class="button" @click="isVisible = !isVisible">{{
          isVisible ? 'Hide' : 'Show'
        }}</a>
      </div>
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
