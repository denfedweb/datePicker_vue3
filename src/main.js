import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'bootstrap/scss/bootstrap.scss'
import dateModule from "@/modules/dateModule"
import './assets/main.css'
const pinia = createPinia()

dateModule()

createApp(App).use(pinia).mount('#app')
