export default {
  state: {
    keyShowMode: false
  },
  getters: {
    keyShowMode: state => state.keyShowMode
    // 쇼잉모드 (true: 방향키 보임, false: 방향키 사라짐)
  },
  mutations: {
    setKeyShowMode(state, data) {
      state.keyShowMode = data
      // console.log('바뀜')
    }
  },
  actions: {
    // 쇼잉모드
    actKeyShowMode(context, payload) {
      context.commit('setKeyShowMode', payload)
    }
  }
}
