<template>
  <div>
    <h1>담당자 관리</h1>
    <div>
      <div>
        <input v-model="search.name" type="text" placeholder="사용자 이름 검색" />
        <button @click="searchUserList">검색</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <td v-for="(item, index) in fields" :key="index">{{ item.label }}</td>
          <td>수정</td>
          <td>삭제</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in userList" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.userid }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.auth == 1 ? '관리자' : '담당자' }}</td>
          <td>
            <button size="sm" variant="success" @click="onClickEdit(item.id)">수정</button>
          </td>
          <td>
            <button size="sm" variant="danger" @click="onClickDelete(item.id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
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
        { key: 'id', label: '번호' },
        { key: 'name', label: '이름' },
        { key: 'userid', label: '아이디' },
        { key: 'email', label: '이메일' },
        { key: 'Phone', label: '전화번호' },
        { key: 'auth', label: '권한' }
      ],
      search: {
        name: null
      },
      show: false
    }
  },
  computed: {
    userList() {
      return this.$store.getters.UserList
    },
    modifiedResult() {
      return this.$store.getters.UserModifiedResult
    },
    deletedResult() {
      return this.$store.getters.UserDeletedResult
    }
  },
  watch: {
    modifiedResult(value) {
      // 수정 후 처리
      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우

          // 1. 메세지 출력
          alert('담당자 정보 수정이 성공하였습니다.')
          // 2. 리스트 재 검색
          this.searchUserList()
          this.show = false
        } else {
          // 수정이 실패한 경우
          alert('담당자 정보 수정이 실패하였습니다.')
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메세지 출력
          alert('담당자 정보 삭제가 성공하였습니다.')
          // 2. 리스트 재 검색
          this.searchUserList()
        } else {
          // 삭제가 실패한 경우
          alert('담당자 정보 삭제가 실패하였습니다.')
        }
      }
    }
  },
  created() {
    this.searchUserList()
  },
  methods: {
    searchUserList() {
      console.log('search')
      this.$store.dispatch('actUserList', this.search)
    },
    onClickEdit(id) {
      // (수정을 위한)상세정보

      if (!this.show) {
        // 1. 상세정보 호출
        this.$store.dispatch('actUserInfo', id)

        // 2. 모달 출력
        this.show = true
      } else {
        this.show = false
      }
    },
    onClickDelete(id) {
      // 삭제
      const result = window.confirm('삭제 하시겠습니까?')
      if (result == true) {
        console.log(id)
        this.$store.dispatch('actUserDelete', id)
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
