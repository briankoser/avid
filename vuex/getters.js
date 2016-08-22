export function getLastStateEntry (state) {
  return state.history.slice(-1)[0]
}

export function getPicks (state) {
  return state.picks
}

export function getPicksIDs (state) {
  return state.picks.map(x => x.player.id)
}

export function getPositionsAll (state) {
  return state.settings.positions.available
}

export function getPositionsLeague (state) {
  return state.settings.positions.use.map(x => x.key)
}

export function getPositionsTeamRemaining (state) {
  return (teamName) => {
    let positionsPicked = state.picks.filter(x => x.team === teamName).map(x => x.player.position)
    let positionsPickedCounts = new Map([...new Set(positionsPicked)].map(
      x => [x, positionsPicked.filter(y => y === x).length]
    ))

    return state.settings.positions.use.filter(league => (positionsPickedCounts.get(league.key) || 0) < league.max).map(x => x.key)
  }
}

export function getTeams (state) {
  return state.settings.teams
}
