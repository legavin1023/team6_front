<template>
  <div>
    <h1>Hello Signup</h1>
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
        <input
          id="userPhone"
          ref="userPhone"
          v-model="user.phone"
          aria-describedby="전화번호"
          type="text"
          placeholder="전화번호"
        />
      </div>
      <input class="button" type="button" value="회원가입" @click="onSubmit" />
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
        password: '',
        pwCheck: '',
        phone: ''
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
    },
    signResult() {
      return this.$store.getters.UserInsertedResult
    }
  },
  watch: {
    signResult(value) {
      // 회원가입에 성공한 경우
      if (value === true) {
        alert('회원가입 되었습니다.')
        this.$router.replace('/auth/login') // 히스토리 기록 안남음
      } else if (value === false) {
        alert('회원가입에 실패하였습니다.')
      }
    }
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

    // Sign button click
    onSubmit() {
      if (this.checkInput() === false) {
        return false
      } else {
        // 초기화
        this.$store.dispatch('actUserInit') // null 값으로 초기화
        // 등록
        this.$store.dispatch('actUserInsert', this.user)
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
  padding-top: 40px;
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
  }
  p {
    padding: 0 3%;
    color: $main;
    margin-top: 10px;
    font-size: 0.9em;
    line-height: 1.2em;
  }
  .button {
    border: 1px solid $main;
    color: $sub2;
    border-radius: 20px;
    width: 95%;
    height: 40px;
    line-height: 40px;
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
