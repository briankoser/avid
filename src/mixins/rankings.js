import math from 'mathjs'

export default {
  methods: {
    setPositionRankings: (rankings) => {
      return rankings.map((player, i, arr) => {
        player.ranking.position = arr
            .filter(x => x.positionKey === player.positionKey)
            .findIndex(x => x.id === player.id) + 1
        return player
      })
    },
    setUserRankings: (rankings) => {
      let players = JSON.parse(JSON.stringify(rankings))

      return players.map((player, i, arr) => {
        player.userRanking.overall = i + 1
        player.userRanking.position = arr
            .filter(x => x.positionKey === player.positionKey)
            .findIndex(x => x.id === player.id) + 1
        player.userRanking.stdDev = math.std(player.ranking.overall, player.userRanking.overall) // todo: fix std dev calculation
        return player
      })
    }
  }
}
