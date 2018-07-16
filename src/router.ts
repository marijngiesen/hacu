import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/main/main'
import Climate from '@/views/climate/climate'
import Entertainment from '@/views/entertainment/entertainment'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        },
        {
            path: '/climate',
            name: 'climate',
            component: Climate
        },
        {
            path: '/entertainment',
            name: 'entertainment',
            component: Entertainment
        }
    ],
})
