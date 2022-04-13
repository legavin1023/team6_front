<template>
  <div>
    <div id="modal-history-inform" @ok="onSubmit">
      <div>
        <h1>{{ history.date }}</h1>
        <!-- <div v-if="inputMode === 'update'" label="id" label-for="id">
          <input id="id" v-model="history.id" />
        </div>
        <div label="날짜" label-for="date">
          <input id="date" v-model="history.date" />
        </div> -->
        <div label="총 생산량" label-for="products_all">
          <input id="products_all" v-model="history.products_all" />
        </div>
        <div label="양품 수량" label-for="products_good">
          <input id="products_good" v-model="history.products_good" />
        </div>
        <div label="불량품 수량" label-for="products_error">
          <input id="products_error" v-model="history.products_error" />
        </div>
        <div label="기기 가동 시작 시간" label-for="start_at">
          <input id="start_at" v-model="history.start_at" />
        </div>
        <div label="기기 가동 종료 시간" label-for="end_at">
          <input id="end_at" v-model="history.end_at" />
        </div>
        <div label="담당자" label-for="manager">
          <!-- <input id="manager" v-model="history.manager" /> -->
          <select id="manager" v-model="history.manager" name="manager">
            <option value="" disabled selected required>담당자를 선택해주세요.</option>
            <option v-for="(item, index) in historyManager.options" :key="index" :value="item.value">
              {{ item.text }}
            </option>
          </select>
        </div>
        <div label="비고란" label-for="remarks">
          <textarea id="remarks" v-model="history.remarks" />
        </div>
      </div>
      <button>{{ inputMode == 'insert' ? '등록하기' : '수정하기' }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: {
        id: null,
        name: null,
        products_all: null,
        products_good: null,
        Products_error: null,
        manager: null,
        start_at: null
      },
      historyManager: {
        default: 0,
        options: [
          { value: 1, text: '관리자' },
          { value: 0, text: '담당자' }
        ]
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.History
    },
    inputMode() {
      return this.$store.getters.HistoryInputMode
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.history = { ...value }
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.history = { ...this.infoData }
  },
  methods: {
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actHistoryInsert', this.history) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actHistoryUpdate', this.history) // 수정 실행
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
