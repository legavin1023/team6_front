import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/home',
    component: () => import('../views')
    // children: [
    //   {
    //     path: '/home',
    //     component: () => import('../views/edukit')
    //   }
    // ]
  },
  {
    path: '/dashboard',
    component: () => import('../views/dashboard')
  },
  {
    path: '/auth',
    component: () => import('../views/auth'),
    children: [
      {
        path: '/auth/login',
        component: () => import('../views/auth/login'),
        meta: { header: false }
      },
      {
        path: '/auth/sign',
        component: () => import('../views/auth/signup'),
        meta: { header: false }
      },
      {
        path: '/auth/logout',
        component: () => import('../views/auth/logout'),
        meta: { header: false }
      }
    ]
  }
  // {
  // path: '*'는 not found route 처리를 위한 것으로 항상 routes 배열 최하단에 위치해 있어야 합니다.
  // path: '*',
  // component: () => import('../components/NotFound.vue'),
  // meta: { header: false }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
