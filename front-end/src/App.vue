<template>
  <div>
    <div id="app">
      <edukit />
    </div>
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
import edukit from './views/index.vue'

export default {
  name: 'App',
  components: {
    edukit
  }
}
</script>
<style lang="scss">
#nav {
  position: fixed;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
