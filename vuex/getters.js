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

export function getPositionsLeague (state) {
  return state.settings.league.positions.map(x => x.key)
}

export function getPositionsTeamRemaining (state) {
  return (teamName) => {
    let positionsPicked = state.picks.filter(x => x.team.name === teamName).map(x => x.player.position)
    let positionsPickedCounts = new Map([...new Set(positionsPicked)].map(
      x => [x, positionsPicked.filter(y => y === x).length]
    ))

    return state.settings.league.positions.filter(league => (positionsPickedCounts.get(league.key) || 0) < league.max).map(x => x.key)
  }
}

export function getRoster (state) {
  return (teamName) => {
    let picks = state.picks.filter(x => x.team.name === teamName)
    if (picks.length === 0) {
      return []
    }

    let positions = getPositionsLeague(state)
    let roster = positions.map(x => { return { position: x, picks: picks.filter(y => y.player.position === x) } })

    return roster.map(x => {
      while (x.picks.length < state.settings.league.positions.filter(y => y.key === x.position)[0].max) {
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
