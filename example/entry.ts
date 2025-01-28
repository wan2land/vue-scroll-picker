import './example.css'
import 'vue-scroll-picker/vue-scroll-picker.css'

import { createApp } from 'vue'
import VueScrollPicker from 'vue-scroll-picker'

import Example from './Example.vue'

const app = createApp(Example)

app.use(VueScrollPicker)

app.mount('#app')
