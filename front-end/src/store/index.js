import Vue from 'vue'
import Vuex from 'vuex'

// Store을 import합니다.
import Auth from './models/auth'
import User from './models/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    User
  }
})
