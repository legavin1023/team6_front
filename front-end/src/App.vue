<template>
  <div>
    <div v-if="this.$route.meta.header !== false">
      <!-- <Header v-if="this.$route.meta.header !== false" /> -->
      <div id="nav">
        <div v-if="!token" class="nav_box">
          <router-link to="/auth/sign"><img src="@/assets/image/signup.png" alt="회원가입" /></router-link>
          <router-link to="/auth/login"><img src="@/assets/image/login.png" alt="로그인" /></router-link>
        </div>
        <div v-if="token" class="nav_box">
          <a @click="clickModal"><img src="@/assets/image/mypage.png" alt="마이페이지" /></a>
          <a @click="logout"><img src="@/assets/image/logout.png" alt="로그아웃" /></a>
        </div>
        <div id="data">
          <router-link to="/dashboard"><img src="@/assets/image/dashboard.png" alt="대시보드" /></router-link>
          <router-link to="/home"><img src="@/assets/image/settings.png" alt="Edukit 제어" /></router-link>
        </div>
      </div>
    </div>
    <router-view />
    <div v-if="showModal" class="black-bg" :class="{ closed: isActive }" @click="closed"></div>
    <div v-if="showModal" class="white-bg" :class="{ closedW: isActive }">
      <span class="xbtn" @click="closed">X</span>
      <span class="my">마이페이지</span>
      <div v-if="showMode === 'show'">
        <p class="name">{{ mypage.name }}</p>
        <p>{{ mypage.email }}</p>
        <p>{{ mypage.userid }}</p>
        <p>{{ mypage.phone }}</p>
        <button class="btnmy" @click="onClickEdit">수정하기</button>
      </div>
      <div v-if="showMode === 'modify'">
        <input v-model="mypage.name" type="text" />
        <input v-model="mypage.email" type="text" />
        <input v-model="mypage.userid" type="text" />
        <input v-model="mypage.phone" type="text" />
        <button class="btnmy" @click="onClickSubmit">저장하기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      showModal: false,
      mypage: {
        name: null,
        email: null,
        userid: null,
        phone: null
      }
    }
  },
  computed: {
    // token 확인 computed 입니다.
    token() {
      return this.$store.getters['TokenUser']
    },
    tokenUserId() {
      return this.$store.getters['TokenUser'] && this.$store.getters['TokenUser'].id
    },

    // 마이페이지 모달 관련 computed 입니다.
    infoData() {
      return this.$store.getters.User
    },
    showMode() {
      return this.$store.getters.UserShowMode
    },
    modifiedResult() {
      return this.$store.getters.UserModifiedResult
    }
  },
  watch: {
    // token 확인 watch 입니다.
    token(value) {
      if (value && value.id && value.id !== null) {
        // 로그인이 완료된 상황 (토큰이 존재함)
        return
      } else {
        // 로그아웃 후 라우팅 처리 (토큰이 존재하지 않음)
        // 로그인 화면으로 이동시킨다.
        this.$router.push('/auth/login')
        this.$router.go()
      }
    },

    // 마이페이지 모달 관련 watch 입니다.
    infoData(value) {
      this.mypage = { ...value }
    },
    modifiedResult(value) {
      // 수정 후 처리
      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우
          return
        } else {
          // 수정이 실패한 경우
          alert('사용자 정보 수정이 실패하였습니다.')
        }
      }
    }
  },
  created() {},
  methods: {
    closed() {
      this.isActive = true
      setTimeout(() => {
        this.isActive = false
        this.showModal = false
      }, 1000)
    },
    // 로그아웃 처리
    logout() {
      this.$store.dispatch('authLogout')
    },

    // 마이페이지 모달 제어 method입니다.
    clickModal() {
      if (this.showModal === true) {
        this.showModal = false
      } else {
        this.showModal = true
        this.searchInfoData()
      }
    },
    onClickEdit() {
      // 입력모드 '수정'으로 전환
      this.$store.dispatch('actUserShowMode', 'modify')
    },
    onClickSubmit() {
      // 사용자 정보 수정
      this.$store.dispatch('actUserModify', this.mypage)
      // 입력모드 '쇼잉'으로 전환
      this.$store.dispatch('actUserShowMode', 'show')
      this.searchInfoData()
    },
    searchInfoData() {
      this.$store.dispatch('actUserInfo', this.tokenUserId)
      this.mypage = { ...this.infoData }
    }
  }
}
</script>

<style lang="scss">
@media screen and (min-width: 481px) {
  #nav {
    z-index: 80;
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
}
@media screen and (max-width: 480px) {
  #nav {
    padding-top: 10px;
    width: 100%;
    height: 50px;
    z-index: 80;
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: #000;
    a {
      padding: 20px;
      img {
        width: 30px;
        height: 30px;
      }
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
  .name {
    font-weight: bold;
  }
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
    margin-top: -30px;
  }
  p {
    margin-top: 20px;
  }
  input {
    margin-top: 12px;
    height: 30px;
    width: 80%;
    border: 1px solid $main;
    border-radius: 20px;
    padding-left: 10px;
  }
  button.btnmy {
    position: absolute;
    width: 120px;
    bottom: 40px;
    left: 50%;
    margin-left: -60px;
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

.black-bg {
  animation-name: fadein;
  animation-duration: 1s;
}
@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.white-bg {
  animation-name: fadeinW;
  animation-duration: 1s;
}
@keyframes fadeinW {
  0% {
    top: 100%;
    opacity: 0;
  }
  100% {
    top: 50%;
    opacity: 1;
  }
}
.closed {
  animation-name: fadeout;
}
@keyframes fadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.closedW {
  animation-name: fadeoutW;
}
@keyframes fadeoutW {
  0% {
    top: 50%;
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}
</style>
