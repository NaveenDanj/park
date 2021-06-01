import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/adminlogin',
    name: 'AdminLogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminLogin.vue')
  },
  {
    path: '/dashemp',
    name: 'EmployeeDash',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard-Emp.vue')
  },
  {
    path: '/dashadmin',
    name: 'EmployeeDash',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard-Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
