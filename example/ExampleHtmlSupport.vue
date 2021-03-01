<template>
  <div>
    <p>Current value is <strong>{{ currentValue }}</strong></p>
    <scroll-picker :options="options" v-model="currentValue" />
    <div>
      <a
        class="btn btn-outline-primary btn-sm"
        v-for="(option, index) in options"
        :key="index"
        :class="{active: currentValue == option.value}"
        @click="currentValue = option.value"
        v-html="option.name"
      ></a>
    </div>
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
