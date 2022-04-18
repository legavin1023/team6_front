<template>
  <div>
    <div class="box" onsubmit="return false;" @submit.prevent="onSubmit">
      <div class="form-group">
        <span class="img">프로필 사진</span>
        <input
          id="userName"
          ref="userName"
          v-model="user.name"
          aria-describedby="이름"
          type="text"
          placeholder="이름"
        />
        <p v-if="!userNameState">이름은 한글 2자리 이상 입력해야 합니다.</p>
      </div>
      <div class="form-group">
        <input
          id="userEmail"
          ref="userEmail"
          v-model="user.email"
          aria-describedby="이메일"
          type="text"
          placeholder="이메일"
        />
        <p v-if="!userEmailState">이메일 형식이 다릅니다.</p>
      </div>
      <div class="form-group">
        <input
          id="userId"
          ref="userId"
          v-model="user.userid"
          aria-describedby="아이디"
          type="text"
          placeholder="아이디"
        />
        <!-- <p v-if="!userIdState">아이디는 영문 대소문자와 숫자 5-12자리로 입력해야 합니다.</p> -->
        <p v-if="!userIdState">영문 대소문자와 숫자 5-12자리.</p>
      </div>
      <div class="form-group">
        <input
          id="userPw"
          ref="userPw"
          v-model="user.password"
          aria-describedby="비밀번호"
          type="password"
          placeholder="비밀번호"
        />
        <!-- <p v-if="!userPwState">비밀번호는 영문 대소문자, 숫자, 특수문자 8-20자리로 입력해야 합니다.</p> -->
        <p v-if="!userPwState">영문 대소문자, 숫자, 특수문자 8-20자리</p>
      </div>
      <div class="form-group">
        <input
          id="pwCheck"
          ref="pwCheck"
          v-model="user.pwCheck"
          aria-describedby="비밀번호 재확인"
          type="password"
          placeholder="비밀번호 재확인"
        />
        <p v-if="!userPwCheckState">비밀번호가 일치하지 않습니다.</p>
      </div>
      <div class="form-group">
        <select id="auth" v-model="user.auth" name="auth">
          <option v-for="(item, index) in userAuth.auth" :key="index" :value="item.value">{{ item.text }}</option>
        </select>
      </div>
      <div class="form-group">
        <input
          id="userPhone"
          ref="userPhone"
          v-model="user.phone"
          aria-describedby="전화번호"
          type="text"
          placeholder="전화번호"
          @keyup="getPhoneMask(user.phone)"
        />
      </div>
      <input class="button" type="button" value="회원가입" @click="onSubmit" />
      <router-link class="login" to="/auth/login">로그인 하러 가기</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        userid: '',
        auth: null,
        password: '',
        pwCheck: '',
        phone: ''
      },
      userAuth: {
        default: 0,
        auth: [
          { value: 0, text: '담당자' },
          { value: 1, text: '관리자' }
        ]
      }
    }
  },
  computed: {
    // 각 input validation
    userNameState() {
      return this.user.name.length > 1 && /^[가-힣]*$/.test(this.user.name) // 한글 2자리 이상
    },
    userEmailState() {
      return (
        this.user.email.length > 5 &&
        /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/.test(this.user.email)
      )
      // 이메일 형식 ( 영문대소문자 / 숫자 + @ + 영문대소문자 / 숫자 + . + 영문대소문자 3자리)
    },
    userIdState() {
      return this.user.userid.length > 4 && this.user.userid.length < 13 && /^[a-zA-Z0-9]*$/.test(this.user.userId)
    },
    userPwState() {
      return (
        this.user.password.length > 7 &&
        this.user.password.length < 21 &&
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/.test(this.user.password)
      )
      // 영문 대문자 + 소문자 + 특수문자 8~20자리
    },
    userPwCheckState() {
      return this.user.pwCheck === this.user.password
    }
  },
  created() {
    this.setDefaultValues() // 기본값 세팅
  },
  methods: {
    // 공란, 유효성 여부 확인
    checkInput() {
      const inputForm = this.user

      // name 확인
      if (inputForm.name == '') {
        alert('이름을 입력해주세요.')
        this.$refs.userName.focus()
        return false
      } else if (this.userNameState === false) {
        this.$refs.userName.focus()
        return false
      }

      // email 확인
      if (inputForm.email == '') {
        alert('이메일을 입력해주세요.')
        this.$refs.userEmail.focus()
        return false
      } else if (this.userEmailState === false) {
        this.$refs.userEmail.focus()
        return false
      }

      // userid 확인
      if (inputForm.userid == '') {
        alert('아이디를 입력해주세요.')
        this.$refs.userId.focus()
        return false
      } else if (this.userIdState === false) {
        this.$refs.userId.focus()
        return false
      }

      // password 확인
      if (inputForm.password == '') {
        alert('비밀번호를 입력해주세요.')
        this.$refs.userPw.focus()
        return false
      } else if (this.userPwState === false) {
        this.$refs.userPw.focus()
        return false
      }

      // pwCheck 확인
      if (inputForm.pwCheck == '') {
        alert('비밀번호를 확인해주세요.')
        this.$refs.pwCheck.focus()
        return false
      } else if (this.userPwCheckState === false) {
        this.$refs.pwCheck.focus()
        return false
      }

      // phone 확인
      if (inputForm.phone == '') {
        alert('전화번호를 입력해주세요.')
        this.$refs.userPhone.focus()
        return false
      } else if (this.userPwState === false) {
        this.$refs.userPhone.focus()
        return false
      }
    },

    // 전화번호 숫자만 입력 시 파이프(-) 자동 입력
    getPhoneMask(val) {
      let res = this.getMask(val)
      this.user.phone = res
    },

    getMask(inputNumber) {
      if (!inputNumber) return inputNumber
      inputNumber = inputNumber.replace(/[^0-9]/g, '')

      let res = ''
      if (inputNumber.length < 8) {
        res = inputNumber
      } else if (inputNumber.length == 8) {
        res = inputNumber.substr(0, 4) + '-' + inputNumber.substr(4)
      } else if (inputNumber.length == 9) {
        res = inputNumber.substr(0, 3) + '-' + inputNumber.substr(3, 3) + '-' + inputNumber.substr(6)
      } else if (inputNumber.length == 10) {
        res = inputNumber.substr(0, 3) + '-' + inputNumber.substr(3, 3) + '-' + inputNumber.substr(6)
      } else if (inputNumber.length > 10) {
        res = inputNumber.substr(0, 3) + '-' + inputNumber.substr(3, 4) + '-' + inputNumber.substr(7)
      }

      return res
    },

    // auth default setting
    setDefaultValues() {
      this.user.auth = this.userAuth.default // 사용자 권한
    },

    // Sign button click
    onSubmit() {
      if (this.checkInput() === false) {
        return false
      } else {
        // 초기화
        this.$store.dispatch('actUserInit') // null 값으로 초기화
        // 등록 및 home 화면으로 이동
        this.$store.dispatch('actUserInsert', this.user).then(this.$router.push('/home').catch(() => true))
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
  padding-top: 20px;
  .img {
    display: block;
    margin: 0 auto;
    width: 70px;
    height: 70px;
    background: url('../../assets/image/hi.png') center/cover no-repeat;
    text-indent: -9999px;
    filter: invert(88%) sepia(14%) saturate(1356%) hue-rotate(199deg) brightness(99%) contrast(91%);
  }
  input,
  select {
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
  .login {
    display: block;
    color: $main;
    padding-top: 10px;
    font-size: 0.9em;
  }
  .login:hover {
    color: $light;
  }
}
</style>
