<template>
  <div>
    <div id="modal-user-inform">
      <div>
        <h1>{{ user.name }}</h1>
        <!-- <div v-if="inputMode === 'update'" label="id" label-for="id">
          <input id="id" v-model="user.id" />
        </div> -->
        <!-- <div label="이름" label-for="name">
          <input id="name" v-model="user.name" />
        </div> -->
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
          <select id="auth" v-model="user.auth" name="auth">
            <option value="" disabled selected required>권한을 선택해주세요.</option>
            <option v-for="(item, index) in options" :key="index" :value="item.value">
              {{ item.text }}
            </option>
          </select>
        </div>
      </div>
      <button @click="onSubmit">수정 완료</button>
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
        phone: null,
        auth: null
      },
      options: [
        { value: 1, text: '관리자' },
        { value: 0, text: '담당자' }
      ]
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
      console.log(this.user)
      this.$store.dispatch('actUserModify', this.user) // 수정 실행
    }
  }
}
</script>

<style lang="scss" scoped></style>
