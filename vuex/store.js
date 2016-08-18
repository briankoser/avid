import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  kosers: 0
}

const mutations = {
  ADDKOSER (state, amount) {
    state.kosers += amount
  }
}

export default new Vuex.Store({
  state,
  mutations
})
