export function getPicks (state) {
  return state.picks
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
