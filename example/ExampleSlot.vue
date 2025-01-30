<script setup lang="ts">
import {
  siFacebook,
  siInstagram,
  siLine,
  siTwitter,
  siYoutube,
} from 'simple-icons/icons'
import { ref } from 'vue'
import {
  VueScrollPicker,
  VueScrollPickerOption,
  VueScrollPickerValue,
} from 'vue-scroll-picker'
import CurrentValue from './CurrentValue.vue'
import DefaultController from './DefaultController.vue'

const options: (VueScrollPickerOption & { icon?: string })[] = [
  { value: null, name: 'Select an option' },
  { value: 'instagram', name: ' Instagram', icon: siInstagram.svg },
  { value: 'facebook', name: 'Facebook', icon: siFacebook.svg },
  { value: 'youtube', name: 'Youtube', icon: siYoutube.svg },
  { value: 'twitter', name: 'Twitter', icon: siTwitter.svg },
  { value: 'line', name: 'Line', icon: siLine.svg },
]
const currentValue = ref<VueScrollPickerValue>(null)
</script>
<template>
  <div>
    <div class="controller">
      <CurrentValue :value="currentValue" />
      <DefaultController v-model="currentValue" :options="options" />
    </div>
    <VueScrollPicker v-model="currentValue" :options="options">
      <template #default="{ option }">
        <div class="custom-option">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="custom-option-icon" v-html="option.icon" />
          <span>{{ option.name }}</span>
        </div>
      </template>
    </VueScrollPicker>
  </div>
</template>
<style scoped>
.custom-option {
  padding: 2px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-option-icon {
  width: 20px;
  height: 20px;
  margin-right: 6px;
  fill: currentColor;
}
</style>
