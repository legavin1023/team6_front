<template>
  <div class="black-bg">
    <div id="modal-history-inform" class="white-bg" @ok="onSubmit">
      <span class="xbtn" @click="closed">X</span>
      <div>
        <h1 v-if="inputMode === 'update'">{{ history.date }}</h1>
        <!-- <div v-if="inputMode === 'update'" label="id" label-for="id">
          <input id="id" v-model="history.id" />
        </div> -->
        <div class="box">
          <div v-if="inputMode === 'insert'" label="날짜" label-for="date">
            <p>날짜</p>
            <input id="date" ref="date" v-model="history.date" type="date" />
          </div>
          <div label="총 생산량" label-for="products_all">
            <p>총 생산량</p>
            <input id="products_all" ref="productsAll" v-model="history.productsAll" />
          </div>
        </div>

        <div class="box">
          <div label="양품 수량" label-for="products_good">
            <p>양품 수량</p>
            <input id="products_good" ref="productsGood" v-model="history.productsGood" />
            <p v-if="!historyProductLimitState" class="explanation">
              양품과 불량품의 수량 합은 총 생산량을 넘어선 안됩니다.
            </p>
          </div>
          <div label="불량품 수량" label-for="products_error">
            <p>불량품 수량</p>
            <input id="products_error" ref="productsError" v-model="history.productsError" />
            <p v-if="!historyProductLimitState" class="explanation">
              양품과 불량품의 수량 합은 총 생산량을 넘어선 안됩니다.
            </p>
          </div>
        </div>
        <div class="box">
          <div label="가동 시작 날짜" label-for="start_at">
            <p>가동 시작 날짜</p>
            <input id="start_at" ref="startAt" v-model="history.startAt" type="date" />
          </div>
          <div label="가동 종료 날짜" label-for="end_at">
            <p>가동 종료 날짜</p>
            <input id="end_at" ref="endAt" v-model="history.endAt" type="date" />
          </div>
        </div>
        <div label="담당자" label-for="manager">
          <p>담당자</p>
          <!-- <input id="manager" v-model="history.manager" /> -->
          <select id="manager" v-model="history.userId" name="manager">
            <option v-if="inputMode == 'insert'" value="" disabled selected required>담당자를 선택해주세요.</option>
            <option v-for="item in userList" :key="item.id" :value="item.id">
              {{ item.name }}
              <!-- {{ history.userId }}
              {{ userList[index] }} -->
            </option>
          </select>
        </div>
        <div label="비고란" label-for="remarks">
          <p>비고란</p>
          <textarea id="remarks" v-model="history.remarks" />
        </div>
      </div>
      <button class="btnmy" @click="onSubmit">{{ inputMode == 'insert' ? '등록하기' : '수정하기' }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: {
        id: null,
        date: null,
        productsAll: 0,
        productsGood: 0,
        productsError: 0,
        userId: null,
        startAt: null,
        endAt: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.History
    },
    inputMode() {
      return this.$store.getters.HistoryInputMode
    },
    userList() {
      return this.$store.getters.UserList
    },

    // input validation
    historyProductLimitState() {
      return (
        parseInt(this.history.productsGood) + parseInt(this.history.productsError) == parseInt(this.history.productsAll)
      )
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.history = { ...value }
      this.setDefaultValue()
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.history = { ...this.infoData }
    this.$store.dispatch('actUserList')
    this.setDefaultValue()
  },
  methods: {
    checkInput() {
      const inputForm = this.history

      // date 확인
      if (inputForm.date == null) {
        alert('날짜는 필수로 입력해야 합니다.')
        this.$refs.date.focus()
        return false
      }

      // productsAll 확인
      else if (inputForm.productsAll == null) {
        alert('총 생산량은 필수로 입력해야 합니다.')
        this.$refs.productsAll.focus()
        return false
      }

      // productsGood 확인
      else if (inputForm.productsGood == null) {
        alert('양품 수량은 필수로 입력해야 합니다.')
        this.$refs.productsGood.focus()
        return false
      }

      // productsError 확인
      else if (inputForm.productsError == null) {
        alert('불량품 수량은 필수로 입력해야 합니다.')
        this.$refs.productsError.focus()
        return false
      }

      // startAt 확인
      else if (inputForm.startAt == null) {
        alert('가동 시작 시간은 필수로 입력해야 합니다.')
        this.$refs.startAt.focus()
        return false
      }

      // userId 확인
      else if (inputForm.userId == null) {
        alert('담당자를 필수로 지정해야 합니다.')
        return false
      }

      // endAt 확인
      else if (inputForm.endAt == null) {
        alert('가동 종료 시간은 필수로 입력해야 합니다.')
        this.$refs.endAt.focus()
        return false
      } else {
        return true
      }
    },

    setDefaultValue() {
      this.history.userId = ''
    },

    onSubmit() {
      if (this.checkInput() === false) {
        return false
      } else {
        // 1. 등록인 경우
        if (this.inputMode === 'insert') {
          this.$store.dispatch('actHistoryInsert', this.history) // 입력 실행
        }

        // 2. 수정인 경우
        if (this.inputMode === 'update') {
          this.$store.dispatch('actHistoryModify', this.history) // 수정 실행
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#modal-history-inform {
  margin-top: -300px;
  margin-left: -200px;
  width: 400px;
  height: 600px;
  h1 {
    font-size: 1.6em;
    padding: 20px;
  }
  input {
    margin-top: 20px;
  }

  select,
  textarea {
    margin-top: 12px;
    height: 30px;
    width: 80%;
    border: 1px solid $main;
    border-radius: 20px;
    padding-left: 10px;
  }
  textarea {
    height: 80px;
  }
  p {
    padding: 10px 0 0;
  }
}
.box {
  display: flex;
  justify-content: center;
  justify-items: center;
  div {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .explanation {
      font-size: 0.8em;
      width: 80%;
    }
    p {
      margin-bottom: -10px;
      margin-top: 20px;
    }
  }
}
.xbtn {
  position: absolute;
  right: -230px;
  top: 10px;
}
</style>
