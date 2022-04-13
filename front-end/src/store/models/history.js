import api from '../apiUtil'

const stateInit = {
  History: {
    id: null,
    date: null,
    productsAll: null,
    productsGood: null,
    productsError: null,
    manager: null,
    remarks: null,
    startAt: null,
    endAt: null
  }
}

export default {
  state: {
    HistoryList: [],
    History: { ...stateInit.History },
    InsertedResult: null,
    ModifiedResult: null,
    InsertMode: null // insert: 입력, update: 수정
  },
  getters: {
    HistoryList: state => state.HistoryList,
    History: state => state.History,
    HistoryInsertedResult: state => state.InsertedResult,
    HistoryModifiedResult: state => state.ModifiedResult,
    HistoryInputMode: state => state.InputMode
  },
  mutations: {
    setHistoryList(state, data) {
      state.HistoryList = data
    },
    setHistory(state, data) {
      state.History = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setModifiedResult(state, data) {
      state.ModifiedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 작업내역 조회
    actHistoryList(context, payload) {
      api
        .get('/serverApi/history')
        .then(response => {
          const HistoryList = response && response.data && response.data.rows
          context.commit('setHistoryList', HistoryList)
        })
        .catch(error => {
          console.error('setHistoryList.error', error)
          alert('작업내역 조회에 실패했습니다.')
        })
    },

    // 작업내역 등록
    actHistoryInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      api
        .post('/serverApi/history', payload)
        .then(response => {
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          console.error('setInsertedResult.error', error)
          context.commit('setInsertedResult', -1)
        })
    },

    // 작업내역 기록 초기화
    actHistoryInit(context, payload) {
      context.commit('setHistory', { ...stateInit.History })
    },

    // 입력모드 설정
    actHistoryInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },

    // 작업내역 상세정보 조회
    actHistoryInfo(context, payload) {
      // 상태값 초기화
      context.commit('setHistory', { ...stateInit.History })

      api
        .get(`/serverApi/history/${payload}`)
        .then(response => {
          const history = response && response.data
          context.commit('setHistory', history)
        })
        .catch(error => {
          console.error('HistoryInfo.error', error)
          context.commit('setHistory', null)
        })
    }
  }
}
