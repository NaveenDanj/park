import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    currentUser : {
      userObj : null,
      userid : '',
      access_level : ''
    }

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
