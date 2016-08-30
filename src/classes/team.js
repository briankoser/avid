module.exports.Team = Team

var Team = function (draftOrder, isUser, name, owner) {
  this.draftOrder = draftOrder
  this.isUser = isUser
  this.name = name
  this.owner = owner
}
