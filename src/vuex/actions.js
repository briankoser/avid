import fetchJson from '../services/fetchJson'

export const addPick = ({ dispatch, state }, pick) => dispatch('ADDPICK', pick)

export const addStateEntry = ({ dispatch, state }, entry) => dispatch('ADDSTATEENTRY', entry)

export const fetchRankings = ({ dispatch, state }) => {
  return fetchJson.fetchRankings(values => {
    console.log('test')
    let rankings = values[0].json().adp.player.map((item, index) => { return { id: item.id, rank: index + 1 } })
    let players = values[1].json().players.player
    let rankedPlayers = players.map(x => {
      let player = Object.assign({}, x)
      let ranking = rankings.filter(y => y.id === player.id)[0]
      player.ranking = ranking === undefined ? '' : ranking.rank
      player.available = true
      return player
    })
    .filter(z => z.ranking !== '')
    .sort((a, b) => a.ranking - b.ranking)

    dispatch('SETRANKINGS', rankedPlayers)
  }, (response) => {
    console.log(response)
    dispatch('SETRANKINGS', [])
  })
}

export const undoLastPick = ({ dispatch, state }) => dispatch('UNDOLASTPICK')

export const undoStateEntry = ({ dispatch, state }) => dispatch('UNDOSTATEENTRY')
