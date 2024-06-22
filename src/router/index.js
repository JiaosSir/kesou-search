import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                Home: () => import('@/views/Home/Home.vue')
            }
        }
    ]
})

export default router
