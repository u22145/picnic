import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import fromPage from '../views/fromPage.vue'
import gamPage from '../views/gamPage.vue'
import friendPage from '../views/friendPage.vue'
import winnerPage from '../views/winnerPage.vue'
import attractionsPage from '../views/attractionsPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/fromPage',
    name: 'fromPage',
    component: fromPage
  },
  {
    path: '/gamPage',
    name: 'gamPage',
    component: gamPage
  },
  {
    path: '/friendPage',
    name: 'friendPage',
    component: friendPage
  },
  {
    path: '/winnerPage',
    name: 'winnerPage',
    component: winnerPage
  },
  {
    path: '/attractionsPage',
    name: 'attractionsPage',
    component: attractionsPage
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
