import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    currentUser : {
      username : '',
      login_time : null,
      logout_time : null
    }

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
