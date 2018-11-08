
import Vue from "vue"
import VueScrollPicker from "vue-scroll-picker"

import App from "./app.vue"

Vue.use(VueScrollPicker)

new Vue({
  el: "#app",
  render: h => h(App),
})
