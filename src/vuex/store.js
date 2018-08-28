import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  history: [],
  picks: [],
  players: [],
  settings: {
    app: {
      domes: ['ARI', 'ATL', 'DAL', 'DET', 'HOU', 'IND', 'MIN', 'NOS'],
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
    /*
      Family settings
    */
    // league: {
    //   draftOrderType: 'ser',
    //   keepers: false, // issue #52
    //   positions: [
    //     { key: 'QB', min: 2, max: 3 },
    //     { key: 'RB', min: 2, max: 6 },
    //     { key: 'WR', min: 2, max: 6 },
    //     { key: 'TE', min: 1, max: 6 },
    //     { key: 'PK', min: 1, max: 3 },
    //     { key: 'Def', min: 1, max: 3 }
    //   ],
    //   rosterSize: 16,
    //   secondsPerPick: 60,
    //   teams: [
    //     { name: 'Force the Door', owner: 'Nathan Reimers', draftOrder: 12, keeper: '5848' },
    //     { name: 'Tim Team', owner: 'Tim Binzel', draftOrder: 11, keeper: '13129' },
    //     { name: 'Mile High Magic', owner: 'Melody Tijerina', draftOrder: 10, keeper: '13138' },
    //     { name: 'Mom’s Marauders', owner: 'Sue Koser', draftOrder: 9, keeper: '13132' },
    //     { name: 'Ya Ertz Me? Foles Reals', owner: 'Matt Koser', draftOrder: 8, keeper: '13604' },
    //     { name: `Zach's What I'm Tolkien About`, owner: 'Zach Koser', draftOrder: 7, keeper: '7836' },
    //     { name: 'I Say Kickaree Kee', owner: 'Brian Koser', draftOrder: 6, keeper: '9988', isUser: true },
    //     { name: 'Kung Fu Manda', owner: 'Amanda Koser', draftOrder: 5, keeper: '11232' },
    //     { name: 'Queens of the Forest', owner: 'Megan Hutt', draftOrder: 4, keeper: '12625' },
    //     { name: 'Pensacola Pandas', owner: 'Josh Hutt', draftOrder: 3, keeper: '12150' },
    //     { name: 'Melissa Team', owner: 'Melissa Koser', draftOrder: 2, keeper: '12171' },
    //     { name: 'PApa Phillyman', owner: 'Don Koser', draftOrder: 1, keeper: '11192' }
    //   ]
    // },
    // team: {
    //   idealSize: [
    //     { positionKey: 'QB', count: 3 },
    //     { positionKey: 'RB', count: 5 },
    //     { positionKey: 'WR', count: 5 },
    //     { positionKey: 'TE', count: 1 },
    //     { positionKey: 'PK', count: 1 },
    //     { positionKey: 'Def', count: 1 }
    //   ],
    //   rankings: [],
    //   tags: [
    //     { name: 'avoid', players: ['0515', '9448', '9898', '11188', '11671', '12620', '12634', '13606', '13612'] },
    //     { name: 'handcuff', players: ['10077', '10699', '11193', '11199', '11390', '13163', '13188', '13378', '13593', '13629'] },
    //     { name: 'injuryprone', players: ['10722', '13608'] },
    //     { name: 'overpriced', players: ['8670'] },
    //     { name: 'target', players: ['8247', '9250', '9525', '9831', '9918', '10077', '10276', '10312', '10389', '10708', '10723', '10960', '10973', '11228', '11239', '11406', '11657', '11680', '11705', '11812', '11925', '12152', '12175', '12181', '12205', '12465', '12618', '12647', '12665', '13136', '13153', '13164', '13277', '13290', '13364', '13492', '13617', '13630', '13635', '13636', '13672'] }
    //   ],
    //   tiers: [
    //     { positionKey: 'QB', sizes: [4, 5, 4, 5, 8, 6] },
    //     { positionKey: 'RB', sizes: [3, 3, 5, 3, 11, 6] },
    //     { positionKey: 'WR', sizes: [1, 7, 13, 8, 8, 7] },
    //     { positionKey: 'TE', sizes: [3, 6, 3] },
    //     { positionKey: 'PK', sizes: [] },
    //     { positionKey: 'Def', sizes: [4, 3] }
    //   ]
    // }
    /*
      CGI settings
    */
    league: {
      draftOrderType: 'ser',
      keepers: false,
      positions: [
        { key: 'QB', min: 1, max: 4 },
        { key: 'RB', min: 2, max: 6 },
        { key: 'WR', min: 2, max: 6 },
        { key: 'TE', min: 1, max: 2 },
        { key: 'PK', min: 1, max: 1 },
        { key: 'Def', min: 1, max: 1 }
      ],
      rosterSize: 14,
      secondsPerPick: 60,
      teams: [
        { name: `Tim's Mediocre Team`, owner: 'Tim Godfrey', draftOrder: 1 },
        { name: 'Suh-Tang Clan', owner: 'Luke Smith', draftOrder: 2 },
        { name: 'Wentz Upon a Time', owner: 'Brian Koser', draftOrder: 3, isUser: true },
        { name: 'Game of Jones', owner: 'Kristy King', draftOrder: 4 },
        { name: 'My Team Suxx!', owner: 'Steven Grimes', draftOrder: 5 },
        { name: 'Prestige Worldwide', owner: 'Scott Hartwell', draftOrder: 6 },
        { name: 'Dom', owner: 'Dom Reese', draftOrder: 7 },
        { name: 'Branden', owner: 'Branden Poe', draftOrder: 8 },
        { name: 'Josh', owner: 'Josh Wainwright', draftOrder: 9 },
        { name: 'Zac', owner: 'Zac Smith', draftOrder: 10 }
      ]
    },
    team: {
      idealSize: [
        { positionKey: 'QB', count: 3 },
        { positionKey: 'RB', count: 4 },
        { positionKey: 'WR', count: 4 },
        { positionKey: 'TE', count: 1 },
        { positionKey: 'PK', count: 1 },
        { positionKey: 'Def', count: 1 }
      ],
      rankings: [],
      tags: [
        { name: 'avoid', players: ['0515', '9448', '9898', '11188', '11671', '12620', '12634', '13606', '13612'] },
        { name: 'handcuff', players: ['10077', '10699', '11193', '11199', '11390', '13163', '13188', '13378', '13593', '13629'] },
        { name: 'injuryprone', players: ['10722', '13608'] },
        { name: 'overpriced', players: ['8670'] },
        { name: 'target', players: ['8247', '9250', '9525', '9831', '9918', '10077', '10276', '10312', '10389', '10708', '10723', '10960', '10973', '11228', '11239', '11406', '11657', '11680', '11705', '11812', '11925', '12152', '12175', '12181', '12205', '12465', '12618', '12647', '12665', '13136', '13153', '13164', '13277', '13290', '13364', '13492', '13617', '13630', '13635', '13636', '13672'] }
      ],
      tiers: [
        { positionKey: 'QB', sizes: [4, 5, 4, 5, 8, 6] },
        { positionKey: 'RB', sizes: [3, 3, 5, 3, 11, 6] },
        { positionKey: 'WR', sizes: [1, 7, 13, 8, 8, 7] },
        { positionKey: 'TE', sizes: [3, 6, 3] },
        { positionKey: 'PK', sizes: [] },
        { positionKey: 'Def', sizes: [4, 3] }
      ]
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
  SETPLAYERS (state, players) {
    state.players = players
  },
  SETTEAMRANKINGS (state, rankings) {
    state.settings.team.rankings = rankings
  },
  UNDOLASTPICK (state) {
    state.picks.pop()
  },
  UNDOSTATEENTRY (state) {
    state.history.pop()
  },
  UPDATEKEEPERS (state, keeperPicks) {
    state.picks = keeperPicks
  }
}

export default new Vuex.Store({
  state,
  mutations
})
