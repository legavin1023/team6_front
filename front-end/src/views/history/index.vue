<template>
  <div>
    <h1>사용자 관리</h1>
    <div>
      <input v-model="search.name" type="text" placeholder="사용자 이름 검색" />
      <button variant="success" size="sm" @click="onClickAddNew">신규등록</button>
    </div>
    <table :items="deviceList" :fields="fields">
      <tr>
        <td>{{ row.item.createdAt.substring(0, 10) }}</td>
      </tr>
      <tr>
        <td>
          <button size="sm" variant="success" @click="onClickEdit(row.item.id)">수정</button>
        </td>
      </tr>
      <tr>
        <td>
          <button size="sm" variant="danger" @click="onClickDelete(row.item.id)">삭제</button>
        </td>
      </tr>
    </table>
    <inform />
  </div>
</template>

<script>
import inform from './inform.vue'

export default {
  components: {
    inform: inform
  },
  data() {
    return {
      fields: [
        { key: 'date', label: '날짜' },
        { key: 'products_all', label: '총 생산량' },
        { key: 'products_good', label: '양품 수량' },
        { key: 'products_error', label: '불량품 수량' },
        { key: 'start_at', label: '기기 가동 시작 시간' },
        { key: 'end_at', label: '기기 가동 종료 시간' },
        { key: 'manager', label: '담당자' },
        { key: 'remarks', label: '비고란' }
      ],
      search: {
        name: null
      }
    }
  },
  computed: {
    deviceList() {
      return this.$store.getters.DeviceList
    },
    insertedResult() {
      return this.$store.getters.DeviceInsertedResult
    },
    updatedResult() {
      return this.$store.getters.DeviceUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.DeviceDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      // 등록 후 처리

      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('등록 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchDeviceList()
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      // 수정 후 처리
      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchDeviceList()
        } else {
          // 수정이 실패한 경우
          this.$bvToast.toast('수정이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('삭제 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchDeviceList()
        } else {
          // 삭제가 실패한 경우
          this.$bvToast.toast('삭제가 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchDeviceList()
  },
  methods: {
    searchDeviceList() {
      this.$store.dispatch('actDeviceList', this.search)
    },
    onClickAddNew() {
      // 신규등록

      // 1. 입력모드 설정
      this.$store.dispatch('actDeviceInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actDeviceInit')

      // 3. 모달 출력
      this.$bvModal.show('modal-device-inform')
    },
    onClickEdit(id) {
      // (수정을 위한)상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actDeviceInputMode', 'update')

      // 2. 상세정보 호출
      this.$store.dispatch('actDeviceInfo', id)

      // 3. 모달 출력
      this.$bvModal.show('modal-device-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actDeviceDelete', id)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  border: 1px solid red;
}
</style>
