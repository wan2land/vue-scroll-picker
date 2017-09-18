
import Vue from 'vue'
import App from './App.vue';
import Picker from 'vue-scroll-picker';

Vue.use(Picker);

new Vue({
  el: '#app',
  render: h => h(App)
});
