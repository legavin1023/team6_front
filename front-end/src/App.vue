<template>
  <div>
    <div id="app">
      <edukit />
    </div>
    <div id="nav">
      <!-- <router-link to="/main"><h1 id="logo">logo</h1></router-link> -->
      <div v-if="!isLoggedin" class="nav_box">
        <router-link to="/auth/sign">회원가입</router-link><br /><br />
        <router-link to="/auth/login">로그인</router-link>
      </div>
      <div v-if="isLoggedin" class="nav_box">
        <router-link to="/my-page" @click="onClick">마이 페이지</router-link>
        <router-link to="/auth/logout">로그아웃</router-link>
      </div>
      <div id="data">
        <router-link to="/dashboard">대시보드</router-link><br /><br />
        <router-link to="/edukit">Edukit 제어</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import edukit from './views/edukit'

export default {
  name: 'App',
  components: {
    edukit
  },
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
  z-index: 99;
  position: fixed;
  padding-left: 40px;
  a {
    color: $light;
    text-decoration: none;
    line-height: 40px;
  }
  a:hover {
    font-weight: bold;
    color: $sub1;
  }
  .nav_box {
    position: fixed;
    top: 5%;
  }
  #data {
    position: fixed;
    bottom: 5%;
  }
}
body {
  font-family: 'NEXON Lv2 Gothic';
  background: #000;
}
</style>
