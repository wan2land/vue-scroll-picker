
import Vue from 'vue'
import App from './App.vue';
import Picker from '../src';

Vue.use(Picker);

new Vue({
  el: '#app',
  render: h => h(App)
});
