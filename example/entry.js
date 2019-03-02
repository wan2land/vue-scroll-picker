import Vue from "vue"
import VueRouter from "vue-router"
import VueScrollPicker from "vue-scroll-picker"
import App from "./app.vue"
import VueHighlightJS from "vue-highlightjs"


Vue.use(VueRouter)
Vue.use(VueHighlightJS)
Vue.use(VueScrollPicker)

const router = new VueRouter({
  mode: "hash",
  routes: [
    {path: "/", component: require("./example-default.vue").default, },
    {path: "/example-full-binding", component: require("./example-full-binding.vue").default, },
    {path: "/example-inherit-font-size", component: require("./example-inherit-font-size.vue").default, },
    {path: "/example-transition", component: require("./example-transition.vue").default, },
  ],
})

new Vue({
  router,
  el: "#app",
  render: h => h(App),
})
