<template>
  <div>
    <div id="modal-user-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <div v-if="inputMode === 'update'" label="id" label-for="id">
          <input id="id" v-model="user.id" />
        </div>
        <div label="이름" label-for="name">
          <input id="name" v-model="user.name" />
        </div>
        <div label="아이디" label-for="userid">
          <input id="userid" v-model="user.userid" />
        </div>
        <div label="이메일" label-for="email">
          <input id="email" v-model="user.email" />
        </div>
        <div label="전화번호" label-for="phone">
          <input id="phone" v-model="user.phone" />
        </div>
        <div label="권한" label-for="auth">
          <input id="auth" v-model="user.auth" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: null,
        name: null,
        userid: null,
        email: null,
        Phone: null,
        auth: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.User
    },
    inputMode() {
      return this.$store.getters.UserInputMode
    },
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '사용자 입력'
      } else if (this.inputMode === 'update') {
        title = '사용자 수정'
      }

      return title
    },
    getCreatedAt() {
      return this.user.createdAt && this.user.createdAt.substring(0, 10)
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.user = { ...value }
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.user = { ...this.infoData }
  },
  methods: {
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actUserInsert', this.user) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actUserUpdate', this.user) // 수정 실행
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
