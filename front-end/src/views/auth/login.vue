<template>
  <div>
    <div class="box" onsubmit="return false;" @submit.prevent="onSubmit">
      <div class="form-group">
        <span class="img">프로필 사진</span>
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
      <input class="button" type="button" value="로그인" @click="onSubmit" />
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
      if (value && value.id && value.id > 0) {
        // 로그인이 완료된 상황
        this.$router.push('/home').catch() // 메인 페이지 이동
        // this.$router.go() // 새로고침
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
    const token = window.localStorage.getItem('token')

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
        window.localStorage.removeItem('token') // 토큰 삭제
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

<style lang="scss" scoped>
div.box {
  width: 300px;
  margin: 0 auto;
  text-align: center;
  padding-top: 140px;
  .img {
    display: block;
    margin: 0 auto;
    width: 70px;
    height: 70px;
    background: url('../../assets/image/hi.png') center/cover no-repeat;
    text-indent: -9999px;
    filter: invert(88%) sepia(14%) saturate(1356%) hue-rotate(199deg) brightness(99%) contrast(91%);
  }
  input {
    width: 95%;
    height: 35px;
    line-height: 40px;
    border: 1px solid $main;
    color: $dark;
    border-radius: 20px;
    padding-left: 5%;
    margin-top: 15px;
    font-family: 'NEXON Lv2 Gothic';
  }
  p {
    padding: 0 3%;
    color: $main;
    margin-top: 10px;
    font-size: 0.9em;
    line-height: 1.2em;
  }
  .button {
    border: 3px solid $main;
    color: $sub2;
    border-radius: 20px;
    width: 95%;
    height: 40px;
    line-height: 35px;
    margin-top: 40px;
    transition-duration: 1s;
    background: linear-gradient(45deg, rgba(136, 139, 191, 0.3) 0%, #ffffff00 100%);
    cursor: pointer;
  }
  .button:hover {
    background: rgba(136, 139, 191, 0.3);
  }
}
</style>
