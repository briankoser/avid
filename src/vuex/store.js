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
    league: {
      draftOrderType: 'ser',
      keepers: true,
      positions: [
        { key: 'QB', min: 2, max: 3 },
        { key: 'RB', min: 2, max: 6 },
        { key: 'WR', min: 2, max: 6 },
        { key: 'TE', min: 1, max: 6 },
        { key: 'PK', min: 1, max: 3 },
        { key: 'Def', min: 1, max: 3 }
      ],
      rosterSize: 16,
      secondsPerPick: 0,
      teams: [
        { name: 'Force the Door', owner: 'Nathan Reimers', draftOrder: 1, keeper: '13113' },
        { name: 'Tim Team', owner: 'Tim Binzel', draftOrder: 2, keeper: '5848' },
        { name: 'Melody Team', owner: 'Melody Tijerina', draftOrder: 3, keeper: '11679' },
        { name: 'Mom’s Marauders', owner: 'Sue Koser', draftOrder: 4, keeper: '13132' },
        { name: 'Ya Ertz Me? Foles Reals', owner: 'Matt Koser', draftOrder: 5, keeper: '13604' },
        { name: 'Sith Knights', owner: 'Zach Koser', draftOrder: 6, keeper: '7836' },
        { name: 'Insert Pun Here', owner: 'Brian Koser', draftOrder: 7, keeper: '9988', isUser: true },
        { name: 'Kung Fu Manda', owner: 'Amanda Koser', draftOrder: 8, keeper: '11232' },
        { name: 'Queens of the Forest', owner: 'Megan Hutt', draftOrder: 9, keeper: '12171' },
        { name: 'Pensacola Pandas', owner: 'Josh Hutt', draftOrder: 10, keeper: '12150' },
        { name: 'Melissa Team', owner: 'Melissa Koser', draftOrder: 11, keeper: '12625' },
        { name: 'PApa Phillyman', owner: 'Don Koser', draftOrder: 12, keeper: '11192' }
      ]
    },
    team: {
      idealSize: [
        { positionKey: 'QB', count: 3 },
        { positionKey: 'RB', count: 5 },
        { positionKey: 'WR', count: 5 },
        { positionKey: 'TE', count: 1 },
        { positionKey: 'PK', count: 1 },
        { positionKey: 'Def', count: 1 }
      ],
      rankings: [],
      tags: [
        { name: 'avoid', players: ['0515', '9448', '11671', '11657', '12620', '12634'] },
        { name: 'handcuff', players: ['10077', '10699', '11193', '11199', '11390', '13163', '13188', '13378', '13593', '13629'] },
        { name: 'injuryprone', players: ['10722', '13608'] },
        { name: 'overpriced', players: ['8670'] },
        { name: 'target', players: ['8247', '9250', '9525', '9831', '9918', '10077', '10276', '10312', '10389', '10527', '10708', '10973', '11228', '11406', '11705', '11812', '11925', '12152', '12175', '12181', '12205', '12618', '12647', '12665', '13136', '13153', '13164', '13290', '13364', '13492', '13617', '13622', '13630', '13635', '13636', '13672'] }
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
    /*
      CTS settings
    */
    // league: {
    //   draftOrderType: 'ser',
    //   keepers: false,
    //   positions: [
    //     { key: 'QB', min: 1, max: 6 },
    //     { key: 'RB', min: 2, max: 6 },
    //     { key: 'WR', min: 2, max: 6 },
    //     { key: 'TE', min: 1, max: 6 },
    //     { key: 'PK', min: 1, max: 5 },
    //     { key: 'Def', min: 1, max: 5 }
    //   ],
    //   rosterSize: 14,
    //   secondsPerPick: 60,
    //   teams: [
    //     { name: 'Chase', owner: 'Chase Oubre', draftOrder: 1 },
    //     { name: 'Slow White Bronco', owner: 'Luke Smith', draftOrder: 2 },
    //     { name: 'Scott', owner: 'Scott Hartwell', draftOrder: 3 },
    //     { name: 'Kristymacs', owner: 'Kristy King', draftOrder: 4 },
    //     { name: 'yerfdogt', owner: 'Tim Godfrey', draftOrder: 5 },
    //     { name: 'tclinkscales', owner: 'Travis Clinkscales', draftOrder: 6 },
    //     { name: 'My Team Suxx', owner: 'Steven Grimes', draftOrder: 7 },
    //     { name: 'Pun Goes Here', owner: 'Brian Koser', draftOrder: 8, isUser: true }
    //     // { name: 'Team 1', owner: '?', draftOrder: 1 },
    //     // { name: 'Team 2', owner: '?', draftOrder: 2, isUser: true },
    //     // { name: 'Team 3', owner: '?', draftOrder: 3 },
    //     // { name: 'Team 4', owner: '?', draftOrder: 4 },
    //     // { name: 'Team 5', owner: '?', draftOrder: 5 },
    //     // { name: 'Team 6', owner: '?', draftOrder: 6 },
    //     // { name: 'Team 7', owner: '?', draftOrder: 7 },
    //     // { name: 'Team 8', owner: '?', draftOrder: 8 }
    //   ]
    // },
    // team: {
    //   idealSize: [
    //     { positionKey: 'QB', count: 3 },
    //     { positionKey: 'RB', count: 4 },
    //     { positionKey: 'WR', count: 4 },
    //     { positionKey: 'TE', count: 1 },
    //     { positionKey: 'PK', count: 1 },
    //     { positionKey: 'Def', count: 1 }
    //   ],
    //   rankings: [],
    //   tags: [
    //     { name: 'avoid', players: ['2842', '6982', '7942', '9054', '9101', '9898', '10302', '10722', '11180', '11201', '11384', '11454', '11642', '11678', '11746', '12155', '13113', '13115', '13116', '13188'] },
    //     { name: 'handcuff', players: ['9087', '10300', '12626', '13138'] },
    //     { name: 'injuryprone', players: ['9054', '9693', '9823', '9902', '10695', '10722', '11248', '11670', '12151', '12186'] },
    //     { name: 'overpriced', players: ['8670', '9099', '9662', '9693', '9823', '11644'] },
    //     { name: 'target', players: ['0509', '0527', '7394', '7877', '8360', '8670', '8673', '9087', '9525', '9881', '9925', '10261', '10273', '10313', '10413', '10506', '10703', '10709', '11516', '11668', '11688', '11695', '12141', '12626', '13129'] }
    //   ],
    //   tiers: [
    //     { positionKey: 'QB', sizes: [3, 7, 3, 6, 6, 7] },
    //     { positionKey: 'RB', sizes: [] },
    //     { positionKey: 'WR', sizes: [] },
    //     { positionKey: 'TE', sizes: [1, 10] },
    //     { positionKey: 'PK', sizes: [] },
    //     { positionKey: 'Def', sizes: [4, 3] }
    //   ]
    // }

    /*
      Crossroads settings
    */
    // league: {
    //   draftOrderType: 'ser',
    //   positions: [
    //     { key: 'QB', min: 1, max: 4 },
    //     { key: 'RB', min: 1, max: 8 },
    //     { key: 'WR', min: 2, max: 8 },
    //     { key: 'TE', min: 1, max: 3 },
    //     { key: 'PK', min: 1, max: 3 },
    //     { key: 'Def', min: 1, max: 3 },
    //     { key: 'Coach', min: 1, max: 10 }
    //   ],
    //   rosterSize: 17,
    //   secondsPerPick: 60,
    //   teams: [
    //     { name: 'The Commish', owner: 'Aaron Smith', draftOrder: 12, keeper: '7836' },
    //     { name: '’Aints -', owner: 'Matt McLean' draftOrder: 11 },
    //     { name: 'Play It Again Sam', owner: 'Brian Koser', draftOrder: 10, isUser: true },
    //     { name: 'O. J.', owner: 'Tuck Chastain', draftOrder: 9 },
    //     { name: 'Buck stops here', owner: 'Terry Buckner', draftOrder: 8 },
    //     { name: 'Small Arms Dealer', owner: 'Scott Hopkins', draftOrder: 7 },
    //     { name: 'Fluoride Bandits', owner: 'Shane Herrington', draftOrder: 6 },
    //     { name: 'Brown Mikes DeadBeat Bums', owner: 'Brown Mike',  draftOrder: 5 },
    //     { name: 'Alabama Yard rats', owner: 'Philip Quinney', draftOrder: 4 },
    //     { name: 'Cam Burglar', owner: 'Justin Tolbert', draftOrder: 3 },
    //     { name: 'Amen Corner', owner: 'Ben Harris', draftOrder: 2 },
    //     { name: 'Crossroads Zealots', owner: 'Joe Chastain', draftOrder: 1 }
    //   ]
    // },
    // team: {
    //   idealSize: [
    //     { positionKey: 'QB', count: 2 },
    //     { positionKey: 'RB', count: 4 },
    //     { positionKey: 'WR', count: 5 },
    //     { positionKey: 'TE', count: 2 },
    //     { positionKey: 'PK', count: 1 },
    //     { positionKey: 'Def', count: 2 },
    //     { positionKey: 'Coach', count: 1 }
    //   ]
    // }
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
