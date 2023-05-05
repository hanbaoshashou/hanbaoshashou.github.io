import { createRouter, createWebHashHistory } from 'vue-router'

const List = () => import('../views/list/index.vue')

const routes = [
  {
    path: '/list',
    name: 'list',
    component: List,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
