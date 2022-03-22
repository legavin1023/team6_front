<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('authLogout')
    this.$router.push('/auth/login')
  }
}
</script>

<style lang="scss" scoped></style>
