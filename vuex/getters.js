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

export function getTeams (state) {
  return state.settings.teams
}
