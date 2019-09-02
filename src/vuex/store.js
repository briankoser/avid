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
    //     { name: 'The Donald, Aaron Donald', owner: 'Mike Binzel', draftOrder: 12, keeper: '' },
    //     { name: 'MileHigh Magic', owner: 'Melody Tijerina', draftOrder: 11, keeper: '' },
    //     { name: 'The Thunder Thors', owner: 'Ian Bucy', draftOrder: 10, keeper: '' },
    //     { name: 'Settlers of Saquon', owner: 'Matt Koser', draftOrder: 9, keeper: '13604' },
    //     { name: 'Swing Low, Sweet Elliot', owner: 'Megan Hutt', draftOrder: 8, keeper: '' },
    //     { name: 'Kung Fu Manda', owner: 'Amanda Koser', draftOrder: 7, keeper: '11232' },
    //     { name: 'Honorable Shellback', owner: 'Tim Binzel', draftOrder: 6, keeper: '' },
    //     { name: 'Turkish Delight', owner: 'Micah Bucy', draftOrder: 5, keeper: '' },
    //     { name: 'PApa Phillyman', owner: 'Don Koser', draftOrder: 4, keeper: '' },
    //     { name: 'Rig a Dee Dee', owner: 'Brian Koser', draftOrder: 3, keeper: '13130', isUser: true },
    //     { name: `My Bois`, owner: 'Zach Koser', draftOrder: 2, keeper: '' },
    //     { name: 'The Sun’ll Come Out Kamara', owner: 'Sue Koser', draftOrder: 1, keeper: '13132' }
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
    //     { name: 'avoid', players: ['4925', '5848', '7391', '8062', '9064', '9075', '9448', '9925', '9988', '10261', '10703', '10722', '10948', '11192', '11247', '11670', '11680', '11695', '12150', '12151', '12175', '12181', '12626', '12676', '13129', '13146', '13153', '13192', '13277', '13299', '13591', '13629', '14057', '14058', '14059'] },
    //     { name: 'handcuff', players: ['11390', '12386', '13404', '13608', '14087', '14223'] },
    //     { name: 'injuryprone', players: ['11660', '11761'] },
    //     { name: 'overpriced', players: [''] },
    //     { name: 'target', players: ['7394', '9662', '9918', '10273', '10276', '10700', '10960', '11248', '11257', '11516', '11677', '11747', '11760', '11886', '12140', '12187', '12263', '12620', '12634', '12647', '12665', '12677', '13158', '13163', '13164', '13234', '13364', '13404', '13589', '13590', '13593', '13605', '13607', '13612', '13621', '13633', '13634', '13635', '13671', '13793', '14056', '14073', '14079'] }
    //   ],
    //   tiers: [
    //     { positionKey: 'QB', sizes: [4, 5, 4, 5, 8, 6] },
    //     { positionKey: 'RB', sizes: [4, 10, 10, 5, 5, 6, 6, 6, 7] },
    //     { positionKey: 'WR', sizes: [6, 4, 6, 4, 5, 7, 8] },
    //     { positionKey: 'TE', sizes: [1, 2, 2] },
    //     { positionKey: 'PK', sizes: [] },
    //     { positionKey: 'Def', sizes: [] }
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
        { name: 'Picked Last in Gym Class', owner: 'Jonathan Jurczak', draftOrder: 1 },
        { name: 'Some Injured Guys', owner: 'Zac Smith', draftOrder: 2 },
        { name: 'Prestige Worldwide', owner: 'Scott Hartwell', draftOrder: 3 },
        { name: `Tim's Mediocre Team`, owner: 'Tim Godfrey', draftOrder: 4 },
        { name: `Branden's Best Team`, owner: 'Branden Poe', draftOrder: 5 },
        { name: 'The Alabama Randoms', owner: 'Josh Wainwright', draftOrder: 6 },
        { name: 'Suh-Tang Clan', owner: 'Luke Smith', draftOrder: 7 },
        { name: 'Burton Goffster', owner: 'Brian Koser', draftOrder: 8, isUser: true }
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
        { name: 'avoid', players: ['4925', '5848', '7391', '8062', '9064', '9075', '9448', '9925', '9988', '10261', '10703', '10722', '10948', '11192', '11247', '11670', '11680', '11695', '12150', '12151', '12175', '12181', '12626', '12676', '13129', '13146', '13153', '13192', '13277', '13299', '13591', '13629', '14057', '14058', '14059'] },
        { name: 'handcuff', players: ['11390', '12386', '13404', '13608', '14087', '14223'] },
        { name: 'injuryprone', players: ['11660', '11761'] },
        { name: 'overpriced', players: [''] },
        { name: 'target', players: ['7394', '9662', '9918', '10273', '10276', '10700', '10960', '11248', '11257', '11516', '11677', '11747', '11760', '11886', '12140', '12187', '12263', '12620', '12634', '12647', '12665', '12677', '13158', '13163', '13164', '13234', '13364', '13404', '13589', '13590', '13593', '13605', '13607', '13612', '13621', '13633', '13634', '13635', '13671', '13793', '14056', '14073', '14079'] }
      ],
      tiers: [
        { positionKey: 'QB', sizes: [4, 5, 4, 5, 8, 6] },
        { positionKey: 'RB', sizes: [4, 10, 10, 5, 5, 6, 6, 6, 7] },
        { positionKey: 'WR', sizes: [6, 4, 6, 4, 5, 7, 8] },
        { positionKey: 'TE', sizes: [1, 2, 2] },
        { positionKey: 'PK', sizes: [] },
        { positionKey: 'Def', sizes: [] }
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
