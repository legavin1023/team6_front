import api from '../apiUtil'

const stateInit = {
  User: {
    id: null,
    userid: null,
    password: null,
    name: null,
    phone: null,
    email: null,
    auth: null
  },
  SignSuccess: null
}

export default {
  state: {
    User: { ...stateInit.User },
    InsertedResult: stateInit.SignSuccess
  },
  getters: {
    User: state => state.User,
    UserInsertedResult: state => state.InsertedResult,
    SignSuccessResult: state => state.SignSuccessResult
  },
  mutations: {
    setUser(state, data) {
      state.User = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setSignSuccessResult(state, data) {
      state.SignSuccessResult = data
    }
  },
  actions: {
    // 등록
    actUserInsert(context, payload) {
      context.commit('setInsertedResult', null)
      api
        .post('/serverApi/user', payload)
        .then(response => {
          const insertedResult = response && response.data && response.data.success
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          console.error('SignSuccessResult.error', error)
          context.commit('setInsertedResult', -1)
        })
    },

    // 회원가입 데이터 초기화
    actUserInit(context, payload) {
      context.commit('setUser', { ...stateInit.User })
    }
  }
}
