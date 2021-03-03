<template>
  <div>
    <p>currentValue = <strong>{{ currentValue === null ? '(null)' : currentValue }}</strong></p>
    <div class="button-group">
      <a
        class="button"
        v-for="(option, index) in options"
        :key="index"
        :class="{active: currentValue == option.value}"
        @click="currentValue = option.value"
        v-html="option.name"
      ></a>
    </div>
    <scroll-picker :options="options" v-model="currentValue" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  data() {
    return {
      options: [
        {value: "instagram", name: "<i class=\"fab fa-instagram\"></i> Instagram"},
        {value: "facebook", name: "<i class=\"fab fa-facebook\"></i> Facebook"},
        {value: "youtube", name: "<i class=\"fab fa-youtube\"></i> Youtube"},
        {value: "twitter", name: "<i class=\"fab fa-twitter\"></i> Twitter"},
        {value: "line", name: "<i class=\"fab fa-line\"></i> Line"},
      ],
      currentValue: null,
    }
  },
})
</script>
