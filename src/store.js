import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    all: [],
    alert: {
      type: null,
      message: null
    },
    loginStatus: null,
    user: null
  },
  mutations: {
    setAll(state, data) {
      state.all = data
    },

    error(state, message) {
      state.alert.type = 'alert-danger'
      state.alert.message = message
    },
    setEptyErr(state) {
      state.alert.type = null
      state.alert.message = null
    },
    setStatus(state, data) {
      state.loginStatus = !!data
      state.user = data
    }

  },
  actions: {
    error({ commit }, message) {
      commit('error', message)
    },
    checkStatus({ commit }) {
      commit('setStatus', JSON.parse(localStorage.getItem('user')))
    },
    clearErr({ commit }) {
      commit('setEptyErr')
    }
  }
})
