export default {
  methods: {
    setPositionRankings: (rankings) => {
      return rankings.map((player, i, arr) => {
        player.ranking.position = arr
            .filter(x => x.positionKey === player.positionKey)
            .findIndex(x => x.id === player.id) + 1
        return player
      })
    }
  }
}
