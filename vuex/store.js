import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  kosers: 0,
  picks: [
    // { team: 'From Wentz it Came', player: 'Dawkins' }
  ],
  teams: [
    'Team A',
    'Team B',
    'Team C',
    'Team D',
    'Team E'
  ]
}

const mutations = {
  ADDKOSER (state, amount) {
    state.kosers += amount
  },
  ADDPICK (state, pick) {
    state.picks.push(pick)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
