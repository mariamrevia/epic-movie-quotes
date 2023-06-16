import './assets/main.css'

import { createApp } from 'vue/dist/vue.esm-bundler'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
import i18n from './i18n'
import '@/plugins/vee-validate/rules'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
