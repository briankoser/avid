import Vue from 'vue'

export default {
  fetchPlayers (success, fail) {
    let rankings = Vue.http.get('/static/adpRankings-16-teams-2-qb-ppr.json')
    let players = Vue.http.get('/static/players.json')
    let byes = Vue.http.get('/static/byes.json')

    Promise.all([rankings, players, byes]).then(values => {
      success(values)
    }, (response) => {
      console.log(response)
      fail()
    })
  }
}
