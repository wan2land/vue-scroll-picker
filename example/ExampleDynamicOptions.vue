<template>
  <div>
    <p>
      currentValue =
      <strong>{{ currentValue === null ? '(null)' : currentValue }}</strong>
    </p>
    <div class="button-group">
      <a class="button" @click="pushItem">Push Random Item</a>
      <a class="button" @click="popItem">Pop Item</a>
      <a class="button" @click="unshiftItem">Unshift Random Item</a>
      <a class="button" @click="shiftItem">Shift Item</a>
      <a class="button" @click="replaceItems">Replace 10 Items</a>
    </div>
    <VueScrollPicker v-model="currentValue" :options="options" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      options: [] as number[],
      currentValue: null,
    }
  },
  methods: {
    pushItem() {
      this.options.push(~~(Math.random() * 100000))
    },
    popItem() {
      this.options.pop()
    },
    unshiftItem() {
      this.options.unshift(~~(Math.random() * 100000))
    },
    shiftItem() {
      this.options.shift()
    },
    replaceItems() {
      this.options = [...new Array(10)].map(() => ~~(Math.random() * 100000))
    },
  },
})
</script>
