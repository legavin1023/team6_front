<template>
  <div>
    <div id="nav">
      <div v-if="!isLoggedin" class="nav_box">
        <router-link to="/auth/sign"><img src="@/assets/image/signup.png" alt="회원가입" /></router-link>
        <router-link to="/auth/login"><img src="@/assets/image/login.png" alt="로그인" /></router-link>
      </div>
      <div v-if="isLoggedIn" class="nav_box">
        <router-link to="/my-page"><img src="@/assets/image/mypage.png" alt="마이페이지" /></router-link>
        <router-link to="/auth/logout"><img src="@/assets/image/logout.png" alt="로그아웃" /></router-link>
      </div>
      <div id="data">
        <router-link to="/dashboard"><img src="@/assets/image/dashboard.png" alt="대시보드" /></router-link>
        <router-link to="/home"><img src="@/assets/image/edukit.png" alt="Edukit 제어" /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      let login = false
      // const test = this.$store.getters.TokenUser
      const token = window.localStorage.getItem('token')

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
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    position: fixed;
    top: 5%;
    a {
      margin-bottom: 20px;
    }
  }
  #data {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    position: fixed;
    bottom: 5%;
    a {
      margin-top: 20px;
    }
  }
}
</style>
