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
  let pickGrids = getPositionsLeague(state)
    .filter(x => x !== 'Coach')
    .map(x => {
      return {
        position: x,
        pickGrid: []
      }
    })

  getRankings(state).forEach(ranking => {
    let status
    if (ranking.pick === undefined) {
      status = 'a' // available
    } else if (ranking.pick.team.user) {
      status = 'u' // user drafted
    } else {
      status = 'd' // drafted, not by user
    }

    let positionIndex = pickGrids.findIndex(x => x.position === ranking.position)
    if (positionIndex > -1) {
      pickGrids[positionIndex].pickGrid.push(status)
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

export function getPositionsLeague (state) {
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

export function getRankings (state) {
  return state.rankings.map(player => {
    player.pick = state.picks.find(pick => pick.player.id === player.id)
    return player
  })
}

export function getRoster (state) {
  return (teamName) => {
    let picks = state.picks.filter(x => x.team.name === teamName).map(x => {
      let ranking = state.rankings.find(ranking => ranking.id === x.player.id)
      return Object.assign(x, {
        pick: x,
        ranking: ranking.ranking,
        bye: ranking.bye
      })
    })

    let positions = getPositionsLeague(state)
    let roster = positions.map(x => {
      return {
        position: x,
        picks: picks.filter(y => y.player.position === x)
      }
    })

    return roster.map(x => {
      while (x.picks.length < state.settings.team.idealSize.filter(y => y.key === x.position)[0].count) {
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
  return state.settings.league.teams
}
