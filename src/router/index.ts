import { createRouter, createWebHashHistory } from 'vue-router'

const List = () => import('../views/list/index.vue')
const Post = () => import('../views/post/index.vue')

const routes = [
  {
    path: '/',
    redirect: '/list',
  },
  {
    path: '/list',
    name: 'list',
    component: List,
  },
  {
    path: '/post',
    name: 'post',
    component: Post,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
