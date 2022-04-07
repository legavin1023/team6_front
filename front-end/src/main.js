import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import store from './store'

// socket-io 모듈 import
// import io from 'socket.io-client'
// socket server url
// const socket = io('http://192.168.0.143:8282')
// const socket = io('http://localhost:3001')

// vue 인스턴스 변수로 등록
// Vue.prototype.$socket = socket

import VueSocketIO from 'vue-socket.io'

Vue.use(VueRouter)
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3001',
    extraHeaders: { 'Edukit-webSocket-header': 'hello websocket' },
    withCredentials: true
  })
)

Vue.config.productionTip = false

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
