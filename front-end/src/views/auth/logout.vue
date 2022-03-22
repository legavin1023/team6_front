<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('authLogout').then(this.$router.push('/auth/login').catch(() => true))
  }
}
</script>

<style lang="scss" scoped></style>
