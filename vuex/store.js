import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  picks: [],
  teams: [
    'Team A',
    'Team B',
    'Team C',
    'Team D',
    'Team E'
  ]
}

const mutations = {
  ADDPICK (state, pick) {
    state.picks.push(pick)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
