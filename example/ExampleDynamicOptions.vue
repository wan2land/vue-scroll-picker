<script setup lang="ts">
import { ref } from 'vue'
import {
  VueScrollPicker,
  VueScrollPickerOptionable,
  VueScrollPickerValue,
} from 'vue-scroll-picker'
import CurrentValue from './CurrentValue.vue'

const options = ref<VueScrollPickerOptionable<number>[]>([])
const currentValue = ref<VueScrollPickerValue>(null)

function pushItem() {
  options.value.push(~~(Math.random() * 100000))
}
function popItem() {
  options.value.pop()
}
function unshiftItem() {
  options.value.unshift(~~(Math.random() * 100000))
}
function shiftItem() {
  options.value.shift()
}
function replaceItems() {
  options.value = [...new Array(10)].map(() => ~~(Math.random() * 100000))
}
</script>
<template>
  <div>
    <div class="controller">
      <CurrentValue :value="currentValue" />
      <div class="button-group">
        <a class="button" @click="pushItem">Push Random Item</a>
        <a class="button" @click="popItem">Pop Item</a>
        <a class="button" @click="unshiftItem">Unshift Random Item</a>
        <a class="button" @click="shiftItem">Shift Item</a>
        <a class="button" @click="replaceItems">Replace 10 Items</a>
      </div>
    </div>
    <VueScrollPicker v-model="currentValue" :options="options" />
  </div>
</template>
