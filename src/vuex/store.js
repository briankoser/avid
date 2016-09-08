import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  history: [],
  picks: [],
  players: [],
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
    /*
      CTS settings
    */
    league: {
      draftOrderType: 'ser',
      positions: [
        { key: 'QB', min: 1, max: 6 },
        { key: 'RB', min: 1, max: 6 },
        { key: 'WR', min: 1, max: 6 },
        { key: 'TE', min: 1, max: 6 },
        { key: 'PK', min: 1, max: 5 },
        { key: 'Def', min: 1, max: 5 }
      ],
      rosterSize: 11,
      secondsPerPick: 60,
      teams: [
        { name: 'Mark’s Team', owner: 'Mark Garrett', draftOrder: 1 },
        { name: 'Team Evan', owner: 'Evan Bernard', draftOrder: 2 },
        { name: 'From Wentz It Came', owner: 'Brian Koser', draftOrder: 3, isUser: true },
        { name: 'Sack Dak Quarterback', owner: 'Kristy King', draftOrder: 4 },
        { name: 'London Sillinannies', owner: 'Zach Brown', draftOrder: 5 },
        { name: 'Alderaan Explosions', owner: 'Brandon Ellison', draftOrder: 6 },
        { name: 'Christian’s Team', owner: 'Christian Boyer', draftOrder: 7 },
        { name: 'Don’t Stop Talibing', owner: 'James Hostick', draftOrder: 8 },
        { name: 'RIP Gronk’s Liver', owner: 'Ellis Hicks', draftOrder: 9 },
        { name: 'Timesheet Nazis', owner: 'Scott Hartwell', draftOrder: 10 },
        { name: 'tim’s Bold Team', owner: 'Tim Godfrey', draftOrder: 11 },
        { name: 'Harambe2016', owner: 'Luke Smith', draftOrder: 12 },
        { name: 'Team Dominique', owner: 'Dominique Reese', draftOrder: 13 },
        { name: 'My Team Sucks!', owner: 'Steven Grimes', draftOrder: 14 },
        { name: 'Breezy OnA SunnyDay', owner: 'Ashley Beard', draftOrder: 15 },
        { name: 'sirkingchase', owner: 'Chase Oubre', draftOrder: 16 }
      ]
    },
    team: {
      idealSize: [
        { positionKey: 'QB', count: 3 },
        { positionKey: 'RB', count: 2 },
        { positionKey: 'WR', count: 2 },
        { positionKey: 'TE', count: 1 },
        { positionKey: 'PK', count: 1 },
        { positionKey: 'Def', count: 1 }
      ],
      rankings: []
    }

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
    //     { name: 'The Commish', owner: 'Aaron Smith', draftOrder: 12 },
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
  }
}

export default new Vuex.Store({
  state,
  mutations
})
