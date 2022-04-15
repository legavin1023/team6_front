import api from '../apiUtil'
import jwtDecode from 'jwt-decode'

const stateInit = {
  TokenUser: {
    id: null,
    iat: null,
    exp: null,
    auth: null
  }
}

export default {
  state: {
    TokenUser: { ...stateInit.TokenUser },
    Loading: null,
    Error: null
  },
  getters: {
    TokenUser: state => state.TokenUser,
    TokenLoading: state => state.Loading,
    Error: state => state.Error
  },
  mutations: {
    setTokenUser(state, data) {
      console.log('token:', data)
      state.TokenUser = data
    },
    setTokenLoading(state, data) {
      state.TokenLoading = data
      state.Error = null
    },
    setError(state, data) {
      state.Loading = false
      state.Error = data
      state.TokenUser = { ...stateInit.TokenUser }
    },
    clearError(state) {
      state.Error = null
    },
    setLogout(state) {
      state.Loading = false
      state.Error = null
      state.TokenUser = { ...stateInit.TokenUser }
    }
  },
  actions: {
    // 로그인 처리
    actAuthLogin(context, payload) {
      // 상태값 초기화
      context.commit('clearError')
      // context.commit('setLoading', true)

      api
        .post('/serverApi/auths/token', payload)
        .then(response => {
          const token = window.localStorage.getItem('token')
          const decodedToken = jwtDecode(token)
          console.log(token, decodedToken)

          // 정상인 경우 처리
          context.commit('setTokenUser', decodedToken)
          console.log('로그인 성공')
        })
        .catch(error => {
          // 에러인 경우 처리
          console.log('에러:', error)
          alert('아이디, 비밀번호를 확인해주세요.')
          context.commit('setError', error)
        })
    },

    async authLogout(context) {
      // 로그아웃 처리

      // 상태값 초기화
      context.commit('clearError')
      // context.commit('setLoading', true)

      setTimeout(() => {
        context.commit('setLogout') // 로그아웃 처리
        window.localStorage.removeItem('token') // 토큰 삭제
      }, 300)
    },

    authTokenUser(context, payload) {
      // 토큰 사용자 설정
      const decodedToken = jwtDecode(payload)
      context.commit('setTokenUser', decodedToken)
    }
  }
}
