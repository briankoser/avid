import rankingsMixin from '../mixins/rankings'

export function getAreUsingKeepers (state) {
  return state.settings.league.keepers
}

export function getDomes (state) {
  return state.settings.app.domes
}

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

export function getPicks (state) {
  return state.picks
}

export function getPicksIDs (state) {
  return state.picks.map(x => x.player.id)
}

export function getPositionsAll (state) {
  return state.settings.app.positions
}

export function getPositionHeatMaps (state) {
  let positionHeatMaps = getPositionKeysLeague(state)
    .filter(positionKey => positionKey !== 'Coach')
    .map(positionKey => {
      return {
        positionKey: positionKey,
        heatMap: []
      }
    })

  getPlayers(state).forEach(player => {
    let positionIndex = positionHeatMaps.findIndex(x => x.positionKey === player.positionKey)
    if (positionIndex > -1) {
      positionHeatMaps[positionIndex].heatMap.push(player.pickStatus)
    }
  })

  return positionHeatMaps
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
  let players = state.players.map(player => {
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

  if (state.settings.team.rankings.length > 0) {
    players = players.map(player => {
      player.userRanking.overall = (state.settings.team.rankings.find(ranking => ranking.id === player.id) || {}).ranking

      return player
    })

    players.sort((a, b) => {
      let compare = (a.userRanking.overall || a.ranking.overall) - (b.userRanking.overall || b.ranking.overall)

      if (compare) {
        return compare
      }

      return (b.userRanking.overall || 0) - (a.userRanking.overall || 0)
    })
  }

  players = rankingsMixin.methods.setUserRankings(players)

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

export function getRosterMinimumSize (state) {
  return state.settings.league.rosterMinimumSize
}

export function getSecondsPerPick (state) {
  return state.settings.league.secondsPerPick
}

export function getTeams (state) {
  return state.settings.league.teams.sort((a, b) => a.draftOrder - b.draftOrder)
}

export function getTeamsCount (state) {
  return state.settings.league.teams.length
}

export function getTiers (state) {
  return state.settings.team.tiers
}
