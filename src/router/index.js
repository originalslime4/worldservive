import { createRouter, createWebHistory } from 'vue-router'
import Base from '../App.vue'
import Home from '../views/home.vue'
import Down from '../views/down.vue'

const routes = [
  { path: '/app', name:"App", component: Base },
  { path: '/download', name:"downPage", component: Down },
  { path: '/', name:"homePage", component: Home },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
