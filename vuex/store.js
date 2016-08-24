import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  history: [],
  picks: [], // { numberOverall, numberRound, player, round, team }
  settings: {
    positions: {
      available: [
        { key: 'QB', name: 'QB', category: 'Offense' },
        { key: 'RB', name: 'RB', category: 'Offense' },
        { key: 'WR', name: 'WR', category: 'Offense' },
        { key: 'TE', name: 'TE', category: 'Offense' },
        { key: 'DE', name: 'Defensive End', category: 'Defense' },
        { key: 'DT', name: 'Defensive Tackle', category: 'Defense' },
        { key: 'LB', name: 'Linebacker', category: 'Defense' },
        { key: 'CB', name: 'Cornerback', category: 'Defense' },
        { key: 'S', name: 'Safety', category: 'Defense' },
        { key: 'Off', name: 'Offense', category: 'Team' },
        { key: 'Def', name: 'Defense/Special Teams', category: 'Team' },
        { key: 'TMQB', name: 'Team QB', category: 'Team' },
        { key: 'TMRB', name: 'Team RB', category: 'Team' },
        { key: 'TMWR', name: 'Team WR', category: 'Team' },
        { key: 'TMTE', name: 'Team TE', category: 'Team' },
        { key: 'TMDL', name: 'Team Defensive Line', category: 'Team' },
        { key: 'TMLB', name: 'Team Linebackers', category: 'Team' },
        { key: 'TMDB', name: 'Team Defensive Backs', category: 'Team' },
        { key: 'TMPK', name: 'Team Place Kicker', category: 'Team' },
        { key: 'TMPN', name: 'Team Punter', category: 'Team' },
        { key: 'ST', name: 'Special Teams', category: 'Other' },
        { key: 'PK', name: 'Kicker', category: 'Other' },
        { key: 'PN', name: 'Punter', category: 'Other' },
        { key: 'Coach', name: 'Coach', category: 'Other' },
        { key: 'XX', name: 'Unknown' }
      ],
      use: [
        { key: 'QB', min: 1, max: 2 },
        { key: 'RB', min: 1, max: 2 },
        { key: 'WR', min: 1, max: 2 },
        { key: 'TE', min: 1, max: 2 },
        { key: 'PK', min: 1, max: 1 },
        { key: 'Def', min: 1, max: 1 }
      ]
    },
    rosterSize: 7,
    teams: [
      'Papa Peyton’s',
      'Mark’s Team',
      'London Sillinannies',
      '[BANDWAGON TEAM]',
      'tim’s Bold Team',
      'Luke’s Legit Team',
      'One and the Sam',
      'Christian’s Team',
      'My Team Sucks!',
      'Alderaan Explosions',
      'Scott H’s Swell Team'
    ]
  }
}

const mutations = {
  ADDPICK (state, pick) {
    state.picks.push(pick)
  },
  ADDSTATEENTRY (state, entry) {
    state.history.push(entry)
  },
  UNDOLASTPICK (state) {
    state.picks.pop()
  },
  UNDOSTATEENTRY (state) {
    state.history.pop()
  }
}

export default new Vuex.Store({
  state,
  mutations
})
