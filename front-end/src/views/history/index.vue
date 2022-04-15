<template>
  <div>
    <h1>PLC 작업내역</h1>
    <div>
      <button @click="onClickAddNew">등록</button>
    </div>
    <table>
      <thead>
        <tr>
          <td>번호</td>
          <td v-for="(item, index) in fields" :key="index">{{ item.label }}</td>
          <td>수정</td>
          <td>삭제</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in historyList" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.productsAll }}</td>
          <td>{{ item.productsGood }}</td>
          <td>{{ item.productsError }}</td>
          <td>{{ item.startAt.substring(0, 10) }}</td>
          <td>{{ item.endAt.substring(0, 10) }}</td>
          <td>{{ item.Users.name }}</td>
          <!-- <template v-for="item in userList">
            <td :key="item.id">{{ item.id }}</td>
          </template> -->
          <td>{{ item.remarks }}</td>
          <td>
            <button @click="onClickEdit(item.id)">수정</button>
          </td>
          <td>
            <button @click="onClickDelete(item.id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    {{ historyList }}
    <inform v-if="show" />
  </div>
</template>

<script>
import inform from './inform.vue'

export default {
  components: {
    inform: inform
  },
  data() {
    return {
      fields: [
        { key: 'date', label: '날짜' },
        { key: 'products_all', label: '총 생산량' },
        { key: 'products_good', label: '양품 수량' },
        { key: 'products_error', label: '불량품 수량' },
        { key: 'start_at', label: '가동 시작 시간' },
        { key: 'end_at', label: '가동 종료 시간' },
        { key: 'manager', label: '담당자' },
        { key: 'remarks', label: '비고란' }
      ],
      show: false
    }
  },
  computed: {
    historyList() {
      return this.$store.getters.HistoryList
    },
    userList() {
      return this.$store.getters.UserList
    },
    insertedResult() {
      return this.$store.getters.HistoryInsertedResult
    },
    updatedResult() {
      return this.$store.getters.HistoryModifiedResult
    },
    deletedResult() {
      return this.$store.getters.HistoryDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      // 등록 후 처리

      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메세지 출력
          alert('작업내역 등록이 성공하였습니다.')
          // 2. 리스트 재 검색
          this.searchHistoryList()
          // 3. 모달 닫기
          this.show = false
        } else {
          // 등록이 실패한 경우
          alert('작업내역 등록이 실패하였습니다.')
        }
      }
    },
    updatedResult(value) {
      // 수정 후 처리
      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우
          // 1. 메세지 출력
          alert('작업내역 수정이 성공하였습니다.')
          // 2. 리스트 재 검색
          this.searchHistoryList()
          // 3. 모달 닫기
          this.show = false
        } else {
          // 수정이 실패한 경우
          alert('작업내역 수정이 실패하였습니다.')
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메세지 출력
          alert('작업내역 삭제가 성공하였습니다.')
          // 2. 리스트 재 검색
          this.searchHistoryList()
        } else {
          // 삭제가 실패한 경우
          alert('작업내역 삭제가 실패하였습니다.')
        }
      }
    }
  },
  created() {
    this.searchHistoryList()
    this.$store.dispatch('actUserList')
  },
  methods: {
    searchHistoryList() {
      this.$store.dispatch('actHistoryList')
    },
    onClickAddNew() {
      // 신규등록
      // 1. 입력모드 설정
      this.$store.dispatch('actHistoryInputMode', 'insert')
      // 2. 상세정보 초기화
      this.$store.dispatch('actHistoryInit')

      if (!this.show) {
        // 3. 모달 출력
        this.show = true
      } else {
        this.show = false
      }
    },
    onClickEdit(id) {
      // (수정을 위한)상세정보
      // 1. 입력모드 설정
      this.$store.dispatch('actHistoryInputMode', 'update')
      // 2. 상세정보 호출
      this.$store.dispatch('actHistoryInfo', id)

      if (!this.show) {
        // 3. 모달 출력
        this.show = true
      } else {
        this.show = false
      }
    },
    onClickDelete(id) {
      // 삭제
      const result = window.confirm('해당 작업내역을 삭제 하시겠습니까?')
      if (result == true) {
        console.log(id)
        this.$store.dispatch('actHistoryDelete', id)
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  border: 1px solid red;
}
</style>
