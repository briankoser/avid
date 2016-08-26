<template>
  <div class="rankings grid">
    <h2 class="delta col-3">Rankings</h2>
    <div class="col-2">
      <select v-model="teamSelected">
        <option>All</option>
        <option v-for="position in positions">{{ position }}</option>
      </select>
    </div>
    <div class="col-6" data-push-left="off-1">
      <table>
        <template v-for="player in rankedPlayers" track-by="id">
        <tr :class="{ 'unavailable': !player.available }">
          <td>{{ player.ranking }}</td>
          <td>{{ player.position }}</td>
          <td>{{ player.name }}</td>
        </tr>
        </template>
      </table>
    </div>
</template>

<script>
import { initializeRankings } from '../../vuex/actions'
import { getPicks, getPositionsLeague, getRankings } from '../../vuex/getters'

export default {
  created: function () {
    this.initializeRankings(this.players)
  },

  props: {
    players: {
      type: Array
    }
  },

  vuex: {
    getters: {
      picks: getPicks,
      positions: getPositionsLeague,
      rankings: getRankings
    },
    actions: {
      initializeRankings
    }
  },

  data () {
    return {
      teamSelected: 'All'
    }
  },

  computed: {
    rankedPlayers: function () {
      return this.rankings.map(player => {
        player.available = this.picks.findIndex(pick => pick.player.id === player.id) === -1
        return player
      })
    }
  }
}
</script>

<style scoped>
select,
table {
  margin-top: 10px;
}

select {
  width: 100%;
}

tr:nth-child(2n + 1) {
  background-color: #ececec;
}

td {
  padding-left: 20px;
}

td:first-child {
  text-align: right;
}

.unavailable {
  font-style: italic;
  opacity: .3;
}
</style>