import math from 'mathjs'
import NflTeam from '../classes/nflTeam'
import Ranking from '../classes/ranking'
import Player from '../classes/player'
import { getPositionKeysLeague } from './getters'
import rankingsMixin from '../mixins/rankings'
import fetchJson from '../services/fetchJson'

export const addPick = ({ dispatch, state }, pick) => dispatch('ADDPICK', pick)

export const addStateEntry = ({ dispatch, state }, entry) => dispatch('ADDSTATEENTRY', entry)

export const fetchPlayers = ({ dispatch, state }) => {
  return fetchJson.fetchPlayers(values => {
    let rankings = values[0].json().adp.player.map((item, index) => {
      let minPick = item.minPick
      let maxPick = item.maxPick

      if (minPick.indexOf('.') > -1) {
        let a = minPick.split('.')
        minPick = (a[0] - 1) * state.settings.league.teams.length + a[1]
      }

      if (maxPick.indexOf('.') > -1) {
        let a = maxPick.split('.')
        maxPick = (a[0] - 1) * state.settings.league.teams.length + a[1]
      }

      return {
        playerID: item.id,
        overall: index + 1,
        stdDev: math.std(minPick, maxPick)
      }
    }) // contains: minPick, maxPick, draftsSelectedIn, id, averagePick

    let players = values[1].json().players.player // contains: id, position, name, team
    let byes = values[2].json() // contains: team, bye

    let rankedPlayers = players.map(player => {
      let id = player.id
      let name = player.name
      let positionKey = player.position
      let nflTeam = new NflTeam(player.team, byes.find(bye => bye.team === player.team).bye)
      let adpRanking = rankings.find(ranking => ranking.playerID === player.id) || {}
      let ranking = new Ranking(adpRanking.overall, adpRanking.stdDev)
      let userRanking = new Ranking()

      return new Player(id, name, positionKey, nflTeam, ranking, userRanking)
    })
    .filter(player => getPositionKeysLeague(state).includes(player.positionKey))
    .filter(player => player.ranking.overall !== undefined)
    .sort((a, b) => a.ranking.overall - b.ranking.overall)

    rankedPlayers = rankingsMixin.methods.setPositionRankings(rankedPlayers)

    dispatch('SETPLAYERS', rankedPlayers)
  }, (response) => {
    console.log(response)
    dispatch('SETPLAYERS', [])
  })
}

export const setTeamRankings = ({ dispatch, state }, ext, rankings) => {
  if (ext === 'csv') {
    let teamRankings = rankings
      .split('\n')
      .map(line => {
        let fields = line.split('|')
        let playerName = fields[0].replace(/"/g, '')
        console.log(playerName)
        fields[0] = (state.players.find(player => player.name === playerName) || {id: playerName}).id
        return fields.join('|')
      })
      .join('\n')

    console.log(teamRankings)
  }

  if (ext === 'json') {
    dispatch('SETTEAMRANKINGS', rankings)
  }
}

export const undoLastPick = ({ dispatch, state }) => dispatch('UNDOLASTPICK')

export const undoStateEntry = ({ dispatch, state }) => dispatch('UNDOSTATEENTRY')

export const updateKeepers = ({ dispatch, state }, keeperPicks) => dispatch('UPDATEKEEPERS', keeperPicks)
