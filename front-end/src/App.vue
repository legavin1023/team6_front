<template>
  <div>
    <div v-if="this.$route.meta.header !== false" id="app">
      <!-- <Header v-if="this.$route.meta.header !== false" /> -->
      <div id="nav">
        <div v-if="!token" class="nav_box">
          <router-link to="/auth/sign"><img src="@/assets/image/signup.png" alt="회원가입" /></router-link>
          <router-link to="/auth/login"><img src="@/assets/image/login.png" alt="로그인" /></router-link>
        </div>
        <div v-if="token" class="nav_box">
          <a @click="showModal = true"><img src="@/assets/image/mypage.png" alt="마이페이지" /></a>
          <router-link to="/auth/logout"><img src="@/assets/image/logout.png" alt="로그아웃" /></router-link>
        </div>
        <div id="data">
          <router-link to="/dashboard"><img src="@/assets/image/dashboard.png" alt="대시보드" /></router-link>
          <router-link to="/home"><img src="@/assets/image/edukit.png" alt="Edukit 제어" /></router-link>
        </div>
      </div>
      <!-- <edukit /> -->
    </div>
    <router-view />
    <div v-if="showModal" class="black-bg" @click="showModal = false"></div>
    <div v-if="showModal" class="white-bg">
      <span class="xbtn" @click="showModal = false">X</span>
      <span class="my">마이페이지</span>
      <p>{{}}</p>
      <p>{{}}</p>
      <p>{{}}</p>
      <p>{{}}</p>
      <button class="btnmy">수정하기</button>
    </div>
  </div>
</template>

<script>
// import header from './components/header.vue'
export default {
  name: 'App',
  components: {
    // Header: header,
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    token() {
      return window.localStorage.getItem('token')
    }
  },
  watch: {
    token(value) {
      if (value && value.id && value.id !== null) {
        // 로그인이 완료된 상황
        console.log('login')
        this.login = true
      } else {
        console.log('not login')
        this.login = false
      }
    }
  },
  methods: {
    clickmodar: function (mymodal) {
      if (mymodal == false) {
        console.log('펄스')
        this.mymodal = true
      } else if (mymodal == true) {
        console.log('트루')
        this.mymodal = false
      }
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
      cursor: pointer;
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
.black-bg {
  z-index: 95;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
.white-bg {
  z-index: 98;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -185px;
  margin-left: -150px;
  width: 300px;
  height: 370px;
  border-radius: 20px;
  padding: 20px;
  background: $light;
  text-align: center;
  .xbtn {
    display: block;
    text-indent: -9999px;
    width: 30px;
    height: 30px;
    background: url('assets/image/x.png') center/cover no-repeat;
    margin: auto;
    position: relative;
    cursor: pointer;
    left: 115px;
  }

  .my {
    display: block;
    text-indent: -9999px;
    width: 70px;
    height: 70px;
    background: url('assets/image/my.png') center/cover no-repeat;
    margin: auto;
  }
  p {
    margin-top: 20px;
  }
  button.btnmy {
    border: 3px solid $main;
    border-radius: 20px;
    padding: 10px 20px;
    margin-top: 20px;
    color: $main;
    cursor: pointer;
    font-weight: bold;
    background: linear-gradient(45deg, rgba(136, 139, 191, 0.3) 0%, #ffffff00 100%);
  }
  button.btnmy:hover {
    background: rgba(136, 139, 191, 0.3);
  }
}
</style>
