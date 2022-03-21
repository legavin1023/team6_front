<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/main"><h1 id="logo">logo</h1></router-link> -->
      <div v-if="!isLoggedin">
        <router-link to="/auth/sign">회원가입</router-link>
        <router-link to="/auth/login">로그인</router-link>
      </div>
      <div v-if="isLoggedin">
        <router-link to="/my-page" @click="onClick">마이 페이지</router-link>
        <router-link to="/auth/logout">로그아웃</router-link>
      </div>
      <div class="data">
        <router-link to="/dashboard">대쉬보드</router-link>
        <router-link to="/edukit">Edukit 제어</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedin() {
      let login = false
      // const test = this.$store.getters.TokenUser
      const token = window.localStorage.getItem('accessToken')

      if (token) {
        // 로컬스토리지에 토큰 존재여부 확인
        login = true
      }

      return login
    }
  }
}
</script>

<style lang="scss">
#nav {
  position: fixed;
}
</style>
