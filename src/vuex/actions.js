import fetchJson from '../services/fetchJson'
import math from 'mathjs'
import NflTeam from '../classes/nflTeam'
import Ranking from '../classes/ranking'
import Player from '../classes/player'

export const addPick = ({ dispatch, state }, pick) => dispatch('ADDPICK', pick)

export const addStateEntry = ({ dispatch, state }, entry) => dispatch('ADDSTATEENTRY', entry)

export const fetchPlayers = ({ dispatch, state }) => {
  return fetchJson.fetchPlayers(values => {
    let rankings = values[0].json().adp.player.map((item, index) => {
      return {
        playerID: item.id,
        overall: index + 1,
        stdDev: math.std(item.minPick, item.maxPick)
      }
    }) // minPick, maxPick, draftsSelectedIn, id, averagePick

    let players = values[1].json().players.player // id, position, name, team
    let byes = values[2].json() // team, bye

    let rankedPlayers = players.map(player => {
      let id = player.id
      let name = player.name
      let positionKey = player.position
      let nflTeam = new NflTeam(player.team, byes.find(bye => bye.team === player.team).bye)
      let adpRanking = rankings.find(ranking => ranking.playerID === player.id) || {}
      let ranking = new Ranking(adpRanking.overall, adpRanking.stdDev)

      return new Player(id, name, positionKey, nflTeam, ranking)
    })
    .filter(player => player.ranking.overall !== undefined)
    .sort((a, b) => a.ranking.overall - b.ranking.overall)

    rankedPlayers = rankedPlayers.map((player, i, arr) => {
      player.ranking.position = arr
        .filter(x => x.positionKey === player.positionKey)
        .findIndex(x => x.id === player.id) + 1
      return player
    })

    dispatch('SETPLAYERS', rankedPlayers)
  }, (response) => {
    console.log(response)
    dispatch('SETPLAYERS', [])
  })
}

export const setTeamRankings = ({ dispatch, state }, rankings) => dispatch('SETTEAMRANKINGS', rankings)

export const undoLastPick = ({ dispatch, state }) => dispatch('UNDOLASTPICK')

export const undoStateEntry = ({ dispatch, state }) => dispatch('UNDOSTATEENTRY')
