<template>
  <div>
    <div id="app">
      <!-- <edukit /> -->
    </div>
    <div id="nav">
      <!-- <router-link to="/main"><h1 id="logo">logo</h1></router-link> -->
      <div v-if="!isLoggedin" class="nav_box">
        <router-link to="/auth/sign"><img src="@/assets/image/signup.png" alt="회원가입" /></router-link><br /><br />
        <router-link to="/auth/login"><img src="@/assets/image/login.png" alt="로그인" /></router-link>
      </div>
      <div v-if="isLoggedin" class="nav_box">
        <router-link to="/mypage" @click="onClick"
          ><img src="@/assets/image/mypage.png" alt="마이페이지"
        /></router-link>
        <router-link to="/auth/logout"><img src="@/assets/image/logout.png" alt="로그아웃" /></router-link>
      </div>
      <div id="data">
        <router-link to="/dashboard"><img src="@/assets/image/dashboard.png" alt="대시보드" /></router-link><br /><br />
        <router-link to="/edukit"><img src="@/assets/image/edukit.png" alt="Edukit 제어" /></router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
// import edukit from './views/edukit'
export default {
  name: 'App',
  components: {
    // edukit
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
  // width: 135px;
  // height: 100vh;
  // background-color: rgba(31, 28, 59, 0.4);
  a {
    img {
      width: 30px;
      height: 30px;
    }
  }
  a:hover {
    filter: invert(56%) sepia(53%) saturate(7244%) hue-rotate(250deg) brightness(87%) contrast(89%);
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
</style>
