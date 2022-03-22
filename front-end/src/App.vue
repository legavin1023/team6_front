<template>
  <div>
    <div id="app">
      <!-- <edukit /> -->
    </div>
    <router-view />
  </div>
</template>

<script>
import header from './components/header.vue'
export default {
  name: 'App',
  components: {
    Header: header
  }
}
</script>
