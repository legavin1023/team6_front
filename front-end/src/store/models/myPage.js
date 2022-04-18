import api from '../apiUtil'

export default {
  state: {
    ModifiedResult: null,
    ShowMode: 'show'
    // 쇼잉모드 (show: 모달 사용자 정보 쇼잉, modify: 모달 사용자 정보 수정)
  },
  getters: {
    ModalModifiedResult: state => state.ModifiedResult,
    ModalShowMode: state => state.ShowMode
  },
  mutations: {
    setModalModifiedResult(state, data) {
      state.ModifiedResult = data
    },
    setShowMode(state, data) {
      state.ShowMode = data
    }
  },
  actions: {
    // 쇼잉모드
    actModalShowMode(context, payload) {
      context.commit('setShowMode', payload)
    },

    actModalModify(context, payload) {
      // 상태값 초기화
      context.commit('setModalModifiedResult', null)

      api
        .put(`/serverApi/users/${payload.id}`, payload)
        .then(response => {
          const modifiedResult = response && response.data && response.data.updatedCount
          context.commit('setModalModifiedResult', modifiedResult)
        })
        .catch(error => {
          // console.error('UserModify.error', error)
          context.commit('setModalModifiedResult', -1)
        })
    }
  }
}
