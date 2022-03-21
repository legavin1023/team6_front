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
        <router-link to="/dashboard">대쉬보드</router-link><br /><br />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
