module.exports.StateEntry = StateEntry

var StateEntry = function (pickNumberOverall, pickNumberRound, pickSecondsLeft, round, teamIndex) {
  this.pickNumberOverall = pickNumberOverall
  this.pickNumberRound = pickNumberRound
  this.pickSecondsLeft = pickSecondsLeft
  this.round = round
  this.teamIndex = teamIndex
}