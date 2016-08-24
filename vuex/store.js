import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  history: [],
  picks: [], // pick: { numberOverall, numberRound, player, round, team }, player: { position, name, id, team }
  settings: {
    app: {
      draftOrderTypes: {
        'random': 'ran',
        'sequential': 'seq',
        'serpentine': 'ser'
      },
      positions: [
        { key: 'QB', name: 'QB', category: 'Offense', order: 1 },
        { key: 'RB', name: 'RB', category: 'Offense', order: 2 },
        { key: 'WR', name: 'WR', category: 'Offense', order: 3 },
        { key: 'TE', name: 'TE', category: 'Offense', order: 4 },
        { key: 'DE', name: 'Defensive End', category: 'Defense', order: 5 },
        { key: 'DT', name: 'Defensive Tackle', category: 'Defense', order: 6 },
        { key: 'LB', name: 'Linebacker', category: 'Defense', order: 7 },
        { key: 'CB', name: 'Cornerback', category: 'Defense', order: 8 },
        { key: 'S', name: 'Safety', category: 'Defense', order: 9 },
        { key: 'Off', name: 'Offense', category: 'Team', order: 10 },
        { key: 'Def', name: 'Defense/Special Teams', category: 'Team', order: 11 },
        { key: 'TMQB', name: 'Team QB', category: 'Team', order: 12 },
        { key: 'TMRB', name: 'Team RB', category: 'Team', order: 13 },
        { key: 'TMWR', name: 'Team WR', category: 'Team', order: 14 },
        { key: 'TMTE', name: 'Team TE', category: 'Team', order: 15 },
        { key: 'TMDL', name: 'Team Defensive Line', category: 'Team', order: 16 },
        { key: 'TMLB', name: 'Team Linebackers', category: 'Team', order: 17 },
        { key: 'TMDB', name: 'Team Defensive Backs', category: 'Team', order: 18 },
        { key: 'TMPK', name: 'Team Place Kicker', category: 'Team', order: 19 },
        { key: 'TMPN', name: 'Team Punter', category: 'Team', order: 20 },
        { key: 'ST', name: 'Special Teams', category: 'Other', order: 21 },
        { key: 'PK', name: 'Kicker', category: 'Other', order: 22 },
        { key: 'PN', name: 'Punter', category: 'Other', order: 23 },
        { key: 'Coach', name: 'Coach', category: 'Other', order: 24 },
        { key: 'XX', name: 'Unknown', order: 25 }
      ]
    },
    league: {
      draftOrderType: 'ser',
      positions: [
        { key: 'QB', min: 1, max: 2 },
        { key: 'RB', min: 1, max: 2 },
        { key: 'WR', min: 1, max: 2 },
        { key: 'TE', min: 1, max: 2 },
        { key: 'PK', min: 1, max: 1 },
        { key: 'Def', min: 1, max: 1 }
      ],
      rosterSize: 7,
      secondsPerPick: 60,
      teams: [
        { name: 'Papa Peyton’s', draftOrder: 1 },
        { name: 'Mark’s Team', draftOrder: 2 },
        { name: 'London Sillinannies', draftOrder: 3 },
        { name: '[BANDWAGON TEAM]', draftOrder: 4 },
        { name: 'tim’s Bold Team', draftOrder: 5 },
        { name: 'Luke’s Legit Team', draftOrder: 6 },
        { name: 'One and the Sam', draftOrder: 7 },
        { name: 'Christian’s Team', draftOrder: 8 },
        { name: 'My Team Sucks!', draftOrder: 9 },
        { name: 'Alderaan Explosions', draftOrder: 10 },
        { name: 'Scott H’s Swell Team', draftOrder: 11 }
      ]
    },
    team: {
      // team settings
    }
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
