import rankingsMixin from '../mixins/rankings'

export function getDraftOrderTypes (state) {
  return state.settings.app.draftOrderTypes
}

export function getDraftOrderTypeLeague (state) {
  return state.settings.league.draftOrderType
}

export function getLastStateEntry (state) {
  return state.history.slice(-1)[0]
}

export function getPickCountRemaining (state) {
  return state.settings.league.teams.length * state.settings.league.rosterSize - state.picks.length
}

export function getPickGridData (state) {
  let pickGrids = getPositionKeysLeague(state)
    .filter(positionKey => positionKey !== 'Coach')
    .map(positionKey => {
      return {
        positionKey: positionKey,
        pickGrid: []
      }
    })

  getPlayers(state).forEach(player => {
    let positionIndex = pickGrids.findIndex(x => x.positionKey === player.positionKey)
    if (positionIndex > -1) {
      pickGrids[positionIndex].pickGrid.push(player.pickStatus)
    }
  })

  return pickGrids
}

export function getPicks (state) {
  return state.picks
}

export function getPicksIDs (state) {
  return state.picks.map(x => x.player.id)
}

export function getPositionsAll (state) {
  return state.settings.app.positions
}

export function getPositionKeysLeague (state) {
  return state.settings.league.positions.map(x => x.key)
}

export function getPositionsTeamRemaining (state) {
  return (teamName) => {
    let positionsPicked = state.picks.filter(x => x.team.name === teamName).map(x => x.player.position)
    let positionsPickedCounts = new Map([...new Set(positionsPicked)].map(
      x => [x, positionsPicked.filter(y => y === x).length]
    ))

    return state.settings.league.positions
      .filter(league => (positionsPickedCounts.get(league.key) || 0) < league.max)
      .map(x => x.key)
  }
}

export function getPlayer (state) {
  return (playerID) => {
    return state.players.find(x => x.id === playerID)
  }
}

export function getPlayers (state) {
  let players = state.players
    .filter(player => getPositionKeysLeague(state).includes(player.positionKey))
    .map(player => {
      let pick = state.picks.find(pick => pick.player.id === player.id)
      if (pick === undefined) {
        player.pickStatus = 'a' // available
      } else if (pick.team.isUser) {
        player.pickStatus = 'u' // user drafted
      } else {
        player.pickStatus = 'd' // drafted, not by user
      }

      return player
    })

  state.settings.team.rankings.forEach(newRanking => {
    let player = players.find(player => player.id === newRanking.id)

    if (player) {
      // players = players.map(x => {
      //   if (x.ranking.overall >= newRanking.ranking) {
      //     x.ranking.overall += 1
      //   }

      //   return x
      // })
      player.ranking.overall = newRanking.ranking
    }
  })

  // players = rankingsMixin.methods.setPositionRankings(players)

  return players
}

export function getRoster (state) {
  return (teamName) => {
    let picks = state.picks.filter(pick => pick.team.name === teamName)
    let positionKeys = getPositionKeysLeague(state)
    let roster = positionKeys.map(positionKey => {
      return {
        positionKey: positionKey,
        picks: picks.filter(pick => pick.player.positionKey === positionKey)
      }
    })

    return roster.map(x => {
      while (x.picks.length < state.settings.team.idealSize.find(y => y.positionKey === x.positionKey).count) {
        x.picks.push({})
      }
      return x
    })
  }
}

export function getSecondsPerPick (state) {
  return state.settings.league.secondsPerPick
}

export function getTeams (state) {
  return state.settings.league.teams.sort((a, b) => a.draftOrder - b.draftOrder)
}
