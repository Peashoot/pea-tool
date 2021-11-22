import { createRouter, createWebHashHistory } from 'vue-router'
import { Welcome, WakeOnWan, Authorization } from '../pages'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/wow',
    name: 'WakeOnWan',
    component: WakeOnWan,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Authorization,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
