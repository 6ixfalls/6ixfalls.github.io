import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

let app = createApp(App)
let router = createRouter({
  history: createWebHistory(),
  routes: import.meta.hot ? [] : routes,
})

app.use(router)

app.mount('#app')
