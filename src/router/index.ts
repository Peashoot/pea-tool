import { createRouter, createWebHashHistory } from 'vue-router'
import { Welcome, WakeOnWan, Authorization, EncryptAndDecrypt, QRCode, CameraPreview, Translator } from '../pages'

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
  },
  {
    path: '/encrypt',
    name: 'Encrypt',
    component: EncryptAndDecrypt,
  },
  {
    path: '/qrcode',
    name: 'QRCode',
    component: QRCode,
  },
  {
    path: '/camera',
    name: 'Camera',
    component: CameraPreview,
  },
  {
    path: '/translate',
    name: 'Translator',
    component: Translator,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
