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
  }
}

export default {
  state: {
    UserList: [],
    User: { ...stateInit.User },
    InsertedResult: null,
    ModifiedResult: null,
    DeletedResult: null,
    ShowMode: 'show'
    // 쇼잉모드 (show: 모달 사용자 정보 쇼잉, modify: 모달 사용자 정보 수정)
  },
  getters: {
    UserList: state => state.UserList,
    User: state => state.User,
    UserInsertedResult: state => state.InsertedResult,
    UserModifiedResult: state => state.ModifiedResult,
    UserDeletedResult: state => state.DeletedResult,
    UserShowMode: state => state.ShowMode
  },
  mutations: {
    setUserList(state, data) {
      state.UserList = data
    },
    setUser(state, data) {
      state.User = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setModifiedResult(state, data) {
      state.ModifiedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setShowMode(state, data) {
      state.ShowMode = data
    }
  },
  actions: {
    // 리스트 조회
    actUserList(context, payload) {
      api
        .get('/serverApi/users', { params: payload })
        .then(response => {
          const UserList = response && response.data && response.data.rows
          context.commit('setUserList', UserList)
        })
        .catch(error => {
          console.error('setUserList.error', error)
          alert('담당자 정보 로드에 실패했습니다.')
          context.commit('setUserList', [])
        })
    },

    // 등록
    actUserInsert(context, payload) {
      context.commit('setInsertedResult', null)

      api
        .post('/serverApi/users', payload)
        .then(response => {
          const insertedResult = response && response.data && response.data.id
          // console.log(insertedResult)
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          console.error('setInsertedResult.error', error)
          alert('회원가입 정보를 다시 확인해주세요.')
          context.commit('setInsertedResult', -1)
        })
    },

    // 회원가입 데이터 초기화
    actUserInit(context, payload) {
      context.commit('setUser', { ...stateInit.User })
    },

    // 쇼잉모드
    actUserShowMode(context, payload) {
      context.commit('setShowMode', payload)
    },

    // 사용자 상세정보 조회
    actUserInfo(context, payload) {
      // 상태값 초기화
      context.commit('setUser', { ...stateInit.User })

      api
        .get(`/serverApi/users/${payload}`)
        .then(response => {
          const user = response && response.data
          context.commit('setUser', user)
        })
        .catch(error => {
          console.error('UserInfo.error', error)
          context.commit('setUser', null)
        })
    },

    // 사용자 정보 수정
    actUserModify(context, payload) {
      // 상태값 초기화
      context.commit('setModifiedResult', null)

      api
        .put(`/serverApi/users/${payload.id}`, payload)
        .then(response => {
          const modifiedResult = response && response.data && response.data.updatedCount
          context.commit('setModifiedResult', modifiedResult)
        })
        .catch(error => {
          console.error('UserModify.error', error)
          context.commit('setModifiedResult', -1)
        })
    },

    // 사용자 정보 삭제
    actUserDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      api
        .delete(`/serverApi/users/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          console.error('UserDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
