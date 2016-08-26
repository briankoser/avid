import Vue from 'vue'

export default {
  fetchRankings (success, fail) {
    let pRankings = Vue.http.get('/static/adpRankings.json')
    let pPlayers = Vue.http.get('/static/players.json')

    Promise.all([pRankings, pPlayers]).then(values => {
      success(values)
    }, (response) => {
      console.log(response)
      fail()
    })
  }
}
