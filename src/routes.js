import Home from './views/Home.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
    { path: '/', component: Home, meta: { title: 'Home' } },
    { path: '/about', component: About, meta: { title: 'About' } },
    { path: '/:path(.*)', component: NotFound },
]