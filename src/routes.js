import Home from './views/Home.vue'
import Showcase from './views/Showcase.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
    { path: '/', component: Home },
    { path: '/showcase', component: Showcase },
]