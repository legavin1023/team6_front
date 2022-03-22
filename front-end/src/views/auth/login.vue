<template>
  <div>
    <div onsubmit="return false;" @submit.prevent="onSubmit">
      <div class="form-group">
        <input
          id="loginId"
          ref="loginId"
          v-model="userLogin.loginId"
          aria-describedby="아이디"
          type="text"
          placeholder="아이디"
        />
        <p v-if="!loginIdState">아이디를 입력해주세요.</p>
      </div>
      <div class="form-group">
        <input
          id="loginPw"
          ref="loginPw"
          v-model="userLogin.loginPw"
          aria-describedby="비밀번호"
          type="password"
          placeholder="비밀번호"
        />
        <p v-if="!loginPwState">비밀번호를 입력해주세요.</p>
      </div>
      <input type="button" value="로그인" @click="onSubmit" />
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  data() {
    return {
      userLogin: {
        loginId: null,
        loginPw: null
      }
    }
  },
  computed: {
    // 로그인 처리를 위한 computed 입니다.
    tokenUser() {
      return this.$store.getters.TokenUser
    },
    error() {
      return this.$store.getters.Error
    },

    // 로그인 validation 위한 computed 입니다.
    loginIdState() {
      return Boolean(this.userLogin.loginId)
    },
    loginPwState() {
      return Boolean(this.userLogin.loginPw)
    }
  },
  watch: {
    tokenUser(value) {
      if (value && value.id && value.id !== null) {
        // 로그인이 완료된 상황
        this.$router.replace('/home') // 메인 페이지 이동
        this.$router.go() // 새로고침
      }
    },
    error(errValue) {
      if (errValue !== null) {
        // 메시지 출력
        alert('아이디, 비밀번호를 확인해주세요.')
      }
    }
  },
  created() {
    const token = window.localStorage.getItem('accessToken')

    // 이미 토큰을 가지고 있는 경우
    if (token) {
      const decodedToken = jwtDecode(token)
      const today = new Date()
      const expDate = new Date(decodedToken.exp * 1000)

      if (expDate && expDate >= today) {
        // 이미 토큰을 가지고 있고 그 토큰이 유효한 경우
        this.$router.push('/home') //메인 페이지 이동
      } else {
        // 이미 토큰을 가지고 있으나 그 토큰이 만료된 경우
        window.localStorage.removeItem('accessToken') // 토큰 삭제
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.loginIdState && this.loginPwState) {
        this.$store.dispatch('actAuthLogin', { ...this.userLogin })
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
