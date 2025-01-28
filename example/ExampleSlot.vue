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
        :class="{ active: currentValue == option.value }"
        @click="currentValue = option.value"
        v-html="option.name"
      ></a>
    </div>
    <VueScrollPicker v-model="currentValue" :options="options">
      <template #placeholder> Select One 🥲 </template>
      <template #default="{ option }">
        <div class="custom-option">
          <div class="custom-option-icon" v-html="option.icon" />
          <span>{{ option.name }}</span>
        </div>
      </template>
    </VueScrollPicker>
  </div>
</template>
<script lang="ts">
import {
  siInstagram,
  siFacebook,
  siYoutube,
  siTwitter,
  siLine,
} from 'simple-icons/icons'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      options: [
        { value: 'instagram', name: ' Instagram', icon: siInstagram.svg },
        { value: 'facebook', name: 'Facebook', icon: siFacebook.svg },
        { value: 'youtube', name: 'Youtube', icon: siYoutube.svg },
        { value: 'twitter', name: 'Twitter', icon: siTwitter.svg },
        { value: 'line', name: 'Line', icon: siLine.svg },
      ],
      currentValue: null as string | null,
    }
  },
})
</script>
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
