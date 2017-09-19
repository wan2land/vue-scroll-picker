
import Vue from 'vue'
import App from './App.vue';
import Picker from '../src/index.js';

Vue.use(Picker);

new Vue({
  el: '#app',
  render: h => h(App)
});
