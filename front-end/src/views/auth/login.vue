<template>
  <div>
    <h1>Hello Login</h1>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  data() {
    return {}
  },
  computed: {
    tokenUser() {
      return this.$store.getters.TokenUser
    },
    error() {
      return this.$store.getters.Error
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped></style>
