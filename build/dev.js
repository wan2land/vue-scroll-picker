
import Vue from 'vue'
import VueScrollPicker from '../src/index.js';

import App from '../example-src/App.vue';

Vue.use(VueScrollPicker);

new Vue({
  el: '#app',
  render: h => h(App)
});
