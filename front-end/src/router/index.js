import jwtDecode from 'jwt-decode'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../views'),
    children: [
      {
        path: '/home',
        component: () => import('../views/edukit')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('../views/dashboard'),
    meta: { noLogin: true }
  },
  {
    path: '/mypage',
    component: () => import('../views/mypage'),
    meta: { noLogin: true }
  },
  {
    path: '/auth',
    component: () => import('../views/auth'),
    children: [
      {
        path: '/auth/login',
        component: () => import('../views/auth/login'),
        meta: { header: false, noLogin: true }
      },
      {
        path: '/auth/sign',
        component: () => import('../views/auth/signup'),
        meta: { header: false, noLogin: true }
      },
      {
        path: '/auth/logout',
        component: () => import('../views/auth/logout'),
        meta: { header: false, noLogin: true }
      }
    ]
  },
  {
    // path: '*'는 not found route 처리를 위한 것으로 항상 routes 배열 최하단에 위치해 있어야 합니다.
    path: '*',
    component: () => import('../components/NotFound.vue'),
    meta: { header: false, noLogin: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const noLogin = to.meta.noLogin
  // 이동할 페이지에서 로그인 허용여부 확인

  if (noLogin === true) {
    // 로그인이 필요없는 페이지는 그냥 이동
    return next()
  } else {
    // 로그인이 필요한 페이지는 토큰 체크 후 통과 여부 결정

    // 1. localStorage에서 토큰 추출
    const token = window.localStorage.getItem('token')

    try {
      const decodedToken = jwtDecode(token) // 토큰 디코딩
      const today = new Date() // 오늘 날짜
      const expDate = new Date(decodedToken.exp * 1000) // 토큰에서 만료일 추출

      if (expDate && expDate >= today) {
        // 토큰이 유효한 경우

        // 1. tokenUser 정보가 없어진 경우 다시 갱신한다.
        const tokenUser = store.getters['TokenUser']
        if (!tokenUser || !tokenUser.id > 0) {
          store.dispatch('authTokenUser', token)
        }

        // 2. 처리후 다음 라우터로 이동
        return next()
      } else {
        // 토큰이 만료된 경우
        return next('/auth/login')
        // 로그인 페이지로 이동 (로그인 페이지에서 토큰을 삭제한다.)
      }
    } catch (err) {
      // 토큰 추출이 실패한 경우에 대한 처리
      return next('/auth/login')
      //로그인 페이지로 이동
    }
  }
})

export default router
