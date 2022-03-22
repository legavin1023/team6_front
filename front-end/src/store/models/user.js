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
    UserInsertedResult: state => state.InsertedResult
  },
  mutations: {
    setUser(state, data) {
      state.User = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    }
  },
  actions: {
    // 등록
    actUserInsert(context, payload) {
      context.commit('setInsertedResult', null)

      api
        .post('/serverApi/users', payload)
        .then(response => {
          const insertedResult = response && response.data && response.data.id
          console.log(response)
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          console.error('setInsertedResult.error', error)
          context.commit('setInsertedResult', -1)
        })
    },

    // 회원가입 데이터 초기화
    actUserInit(context, payload) {
      context.commit('setUser', { ...stateInit.User })
    }
  }
}
