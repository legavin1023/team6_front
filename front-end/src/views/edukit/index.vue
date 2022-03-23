<template>
  <div>
    <helloEdukit />
  </div>
</template>

<script>
import helloEdukit from './edukit.vue'

export default {
  name: 'Edukit',
  components: {
    helloEdukit
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 100vw;
  height: 100vh;
  // overflow: hidden;
}
</style>
